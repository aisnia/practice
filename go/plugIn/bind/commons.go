// Package  implements functions to decode values of a html form.
package bind

import (
	"encoding"
	"encoding/json"
	"fmt"
	"net/url"
	"reflect"
	"strconv"
	"time"
)

//tag的名称
const tagName = "kuteng"

// pathMap holds the values of a map with its key and values correspondent
// pathMap 保存键和值
type pathMap struct {
	ma    reflect.Value
	key   string
	value reflect.Value

	path string
}

// pathMaps holds the values for each key
// pathMaps 则是保存所有的键值
type pathMaps []*pathMap

// find finds and gets the value by the given key
//才能够pathMaps 根据 id 和 key找到 pathMap
func (m pathMaps) find(id reflect.Value, key string) *pathMap {
	for i := range m {
		if m[i].ma == id && m[i].key == key {
			return m[i]
		}
	}
	return nil
}

//自定义错误类型
type Error struct {
	err error
}

func (s *Error) Error() string {
	return "kuteng: " + s.err.Error()
}

//将错误的格式 json解析为 字节切片
func (s Error) MarshalJSON() ([]byte, error) {
	return json.Marshal(s.err.Error())
}

// Cause implements the causer interface from github.com/pkg/errors.
// 错误的原因
func (s *Error) Cause() error {
	return s.err
}

func newError(err error) *Error { return &Error{err} }

// DecodeCustomTypeFunc is a function that indicate how should to decode a custom type
//DecodeCustomTypeFunc是一个函数，指示应如何解码自定义类型
type DecodeCustomTypeFunc func([]string) (interface{}, error)

// DecodeCustomTypeField is a function registered for a specific field of the struct passed to the Decoder
//DecodeCustomTypeField是为传递给Decoder的结构的特定字段注册的函数 就是为 field 注册 fun函数去解码
type DecodeCustomTypeField struct {
	field reflect.Value
	fun   DecodeCustomTypeFunc
}

// DecodeCustomType fields for custom types
//解码自定义类型的自定义类型字段  用fun 去解码 DecodeCustomTypeField
type DecodeCustomType struct {
	fun    DecodeCustomTypeFunc
	fields []*DecodeCustomTypeField
}

// Decoder the main to decode the values
type Decoder struct {
	main       reflect.Value
	formValues url.Values
	opts       *DecoderOptions

	curr   reflect.Value
	values []string

	path    string
	field   string
	bracket string
	//isKey   bool

	maps pathMaps

	//自定义的类型
	customTypes map[reflect.Type]*DecodeCustomType
}

// DecoderOptions options for decoding the values
type DecoderOptions struct {
	// TagName indicates the tag name for decoding a value by the tag
	//TagName指示用于通过标签解码值的标签名称
	TagName string
	// PrefUnmarshalText indicates if should to give preference to UnmarshalText over custom type registered
	//PrefUnmarshalText指示是否应优先于UnmarshalText而不是注册的自定义类型
	PrefUnmarshalText bool
	// IgnoreUnknownKeys controls the behaviour when the decoder encounters unknown keys in the map. If i is true and an unknown field is encountered, it is ignored. This is similar to how unknown keys are handled by encoding/json. If i is false then Decode will return an error. Note that any valid keys will still be decoded in to the target struct.
	// IgnoreUnknownKeys控制解码器在映射中遇到未知键时的行为。 如果我是真的且遇到未知字段，它将被忽略。 这类似于通过encoding / json处理未知键的方式。 如果我为假，则解码将返回错误。 请注意，任何有效的密钥仍将解码为目标结构。
	IgnoreUnknownKeys bool
}

// RegisterCustomType It is the method responsible for register functions for decoding custom types
//RegisterCustomType它是负责注册函数以解码自定义类型的方法
func (dec *Decoder) RegisterCustomType(fn DecodeCustomTypeFunc, types []interface{}, fields []interface{}) *Decoder {
	if dec.customTypes == nil {
		dec.customTypes = make(map[reflect.Type]*DecodeCustomType, 100)
	}
	lenFields := len(fields)
	//遍历每个类型
	for i := range types {
		typ := reflect.TypeOf(types[i])
		//解码器 没有对应类型的解码函数 则加入
		if dec.customTypes[typ] == nil {
			dec.customTypes[typ] = &DecodeCustomType{fun: fn, fields: make([]*DecodeCustomTypeField, 0, lenFields)}
		}
		//将这些field放入 解码器中
		if lenFields > 0 {
			for j := range fields {
				val := reflect.ValueOf(fields[j])
				field := &DecodeCustomTypeField{field: val, fun: fn}
				dec.customTypes[typ].fields = append(dec.customTypes[typ].fields, field)
			}
		}
	}
	return dec
}

// NewDecoder creates a new instance of Decoder
func NewDecoder(opts *DecoderOptions) *Decoder {
	dec := &Decoder{opts: opts}
	if dec.opts == nil {
		dec.opts = &DecoderOptions{}
	}
	if dec.opts.TagName == "" {
		dec.opts.TagName = tagName
	}
	return dec
}

// Decode decodes the url.Values into a element that must be a pointer to a type provided by argument
//解码将url.Values解码为一个元素，该元素必须是指向实参提供的类型的指针
func (dec Decoder) Decode(vs url.Values, dst interface{}) error {
	main := reflect.ValueOf(dst)
	if main.Kind() != reflect.Ptr {
		return newError(fmt.Errorf("the value passed for decode is not a pointer but a %v", main.Kind()))
	}
	dec.main = main.Elem()
	dec.formValues = vs
	return dec.init()
}

// Decode decodes the url.Values into a element that must be a pointer to a type provided by argument
func Decode(vs url.Values, dst interface{}) error {
	main := reflect.ValueOf(dst)
	if main.Kind() != reflect.Ptr {
		return newError(fmt.Errorf("the value passed for decode is not a pointer but a %v", main.Kind()))
	}
	dec := &Decoder{
		main:       main.Elem(),
		formValues: vs,
		opts: &DecoderOptions{
			TagName: tagName,
		},
	}
	return dec.init()
}

// init initializes the decoding
func (dec Decoder) init() error {
	// iterate over the form's values and decode it
	for k, v := range dec.formValues {
		dec.path = k
		dec.values = v
		dec.curr = dec.main
		if err := dec.analyzePath(); err != nil {
			if dec.curr.Kind() == reflect.Struct && dec.opts.IgnoreUnknownKeys {
				continue
			}
			return err
		}
	}
	// set values of maps
	for _, v := range dec.maps {
		key := v.ma.Type().Key()
		ptr := false
		// check if the key implements the UnmarshalText interface
		var val reflect.Value
		if key.Kind() == reflect.Ptr {
			ptr = true
			val = reflect.New(key.Elem())
		} else {
			val = reflect.New(key).Elem()
		}
		// decode key
		dec.path = v.path
		dec.field = v.path
		dec.values = []string{v.key}
		dec.curr = val
		//dec.isKey = true
		if err := dec.decode(); err != nil {
			return err
		}
		// check if the key is a pointer or not. And if it is, then get its address
		if ptr && dec.curr.Kind() != reflect.Ptr {
			dec.curr = dec.curr.Addr()
		}
		// set key with its value
		v.ma.SetMapIndex(dec.curr, v.value)
	}
	return nil
}

// analyzePath analyzes the current path to walk through it
func (dec *Decoder) analyzePath() (err error) {
	inBracket := false
	bracketClosed := false
	lastPos := 0
	endPos := 0

	// parse path
	fmt.Println(dec.path)
	for i, char := range []byte(dec.path) {

		if char == '[' && inBracket == false {
			// 找到一个左括号
			bracketClosed = false
			inBracket = true
			dec.field = dec.path[lastPos:i]
			lastPos = i + 1
			continue
		} else if inBracket {
			// 它在方括号内，因此获取其值
			if char == ']' {
				// 找到了一个右方括号，因此它将最近关闭，因此将方括号置为正确
				// and put as false inBracket and pass the value of bracket to dec.key
				inBracket = false
				bracketClosed = true
				dec.bracket = dec.path[lastPos:endPos]
				lastPos = i + 1
				if err = dec.traverse(); err != nil {
					return
				}
			} else {
				// still inside the bracket, so to save the end position
				endPos = i + 1
			}
			continue
		} else if !inBracket {
			// not found any bracket, so try found a field
			if char == '.' {
				// found a field, we need to know if the field is next of a closing bracket,
				// for example: [0].Field
				if bracketClosed {
					bracketClosed = false
					lastPos = i + 1
					continue
				}
				// found a field, but is not next of a closing bracket, for example: Field1.Field2
				dec.field = dec.path[lastPos:i]
				//dec.field = tmp[:i]
				lastPos = i + 1
				if err = dec.traverse(); err != nil {
					return
				}
			}
			continue
		}
	}
	// last field of path
	dec.field = dec.path[lastPos:]

	return dec.end()
}

// walk traverses the current path until to the last field
func (dec *Decoder) traverse() error {
	// check if there is field, if is so, then it should be struct or map (access by .)
	if dec.field != "" {
		// check if is a struct or map
		switch dec.curr.Kind() {
		case reflect.Struct:
			if err := dec.findStructField(); err != nil {
				return err
			}
		case reflect.Map:
			dec.traverseInMap(true)
		}
		dec.field = ""
	}
	// check if is a interface and it is not nil. This mean that the interface
	// has a struct, map or slice as value
	if dec.curr.Kind() == reflect.Interface && !dec.curr.IsNil() {
		dec.curr = dec.curr.Elem()
	}
	// check if it is a pointer
	if dec.curr.Kind() == reflect.Ptr {
		if dec.curr.IsNil() {
			dec.curr.Set(reflect.New(dec.curr.Type().Elem()))
		}
		dec.curr = dec.curr.Elem()
	}
	// check if there is access to slice/array or map (access by [])
	if dec.bracket != "" {
		switch dec.curr.Kind() {
		case reflect.Array:
			index, err := strconv.Atoi(dec.bracket)
			if err != nil {
				return newError(fmt.Errorf("the index of array is not a number in the field \"%v\" of path \"%v\"", dec.field, dec.path))
			}
			dec.curr = dec.curr.Index(index)
		case reflect.Slice:
			index, err := strconv.Atoi(dec.bracket)
			if err != nil {
				return newError(fmt.Errorf("the index of slice is not a number in the field \"%v\" of path \"%v\"", dec.field, dec.path))
			}
			if dec.curr.Len() <= index {
				dec.expandSlice(index + 1)
			}
			dec.curr = dec.curr.Index(index)
		case reflect.Map:
			dec.traverseInMap(false)
		default:
			return newError(fmt.Errorf("the field \"%v\" in path \"%v\" has a index for array but it is a %v", dec.field, dec.path, dec.curr.Kind()))
		}
		dec.bracket = ""
	}
	return nil
}

// walkMap puts in d.curr the map concrete for decode the current value
func (dec *Decoder) traverseInMap(byField bool) {
	n := dec.curr.Type()
	makeAndAppend := func() {
		if dec.maps == nil {
			dec.maps = make(pathMaps, 0, 500)
		}
		m := reflect.New(n.Elem()).Elem()
		if byField {
			dec.maps = append(dec.maps, &pathMap{dec.curr, dec.field, m, dec.path})
		} else {
			dec.maps = append(dec.maps, &pathMap{dec.curr, dec.bracket, m, dec.path})
		}
		dec.curr = m
	}
	if dec.curr.IsNil() {
		// map is nil
		dec.curr.Set(reflect.MakeMap(n))
		makeAndAppend()
	} else {
		// map is not nil, so try find value by the key
		var a *pathMap
		if byField {
			a = dec.maps.find(dec.curr, dec.field)
		} else {
			a = dec.maps.find(dec.curr, dec.bracket)
		}
		if a == nil {
			// the key not exists
			makeAndAppend()
		} else {
			dec.curr = a.value
		}
	}
}

// end finds the last field for decode its value correspondent
func (dec *Decoder) end() error {
	switch dec.curr.Kind() {
	case reflect.Struct:
		if err := dec.findStructField(); err != nil {
			return err
		}
	case reflect.Map:
		// leave backward compatibility for access to maps by .
		dec.traverseInMap(true)
	}
	return dec.decode()
}

// decode sets the value in the field
func (dec *Decoder) decode() error {
	// check if has UnmarshalText method or a custom function to decode it
	if dec.opts.PrefUnmarshalText {
		if ok, err := dec.isUnmarshalText(dec.curr); ok || err != nil {
			return err
		}
		if ok, err := dec.isCustomType(); ok || err != nil {
			return err
		}
	} else {
		if ok, err := dec.isCustomType(); ok || err != nil {
			return err
		}
		if ok, err := dec.isUnmarshalText(dec.curr); ok || err != nil {
			return err
		}
	}

	switch dec.curr.Kind() {
	case reflect.Array:
		if dec.bracket == "" {
			// not has index, so to decode all values in the slice
			if err := dec.setValues(); err != nil {
				return err
			}
		} else {
			// has index, so to decode value by index indicated
			index, err := strconv.Atoi(dec.bracket)
			if err != nil {
				return newError(fmt.Errorf("the index of array is not a number in the field \"%v\" of path \"%v\"", dec.field, dec.path))
			}
			dec.curr = dec.curr.Index(index)
			return dec.decode()
		}
	case reflect.Slice:
		if dec.bracket == "" {
			// not has index, so to decode all values in the slice
			// only for slices
			dec.expandSlice(len(dec.values))
			if err := dec.setValues(); err != nil {
				return err
			}
		} else {
			// has index, so to decode value by index indicated
			index, err := strconv.Atoi(dec.bracket)
			if err != nil {
				return newError(fmt.Errorf("the index of slice is not a number in the field \"%v\" of path \"%v\"", dec.field, dec.path))
			}
			// only for slices
			if dec.curr.Len() <= index {
				dec.expandSlice(index + 1)
			}
			dec.curr = dec.curr.Index(index)
			return dec.decode()
		}
	case reflect.String:
		dec.curr.SetString(dec.values[0])
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		if num, err := strconv.ParseInt(dec.values[0], 10, 64); err != nil {
			return newError(fmt.Errorf("the value of field \"%v\" in path \"%v\" should be a valid signed integer number", dec.field, dec.path))
		} else {
			dec.curr.SetInt(num)
		}
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64, reflect.Uintptr:
		if num, err := strconv.ParseUint(dec.values[0], 10, 64); err != nil {
			return newError(fmt.Errorf("the value of field \"%v\" in path \"%v\" should be a valid unsigned integer number", dec.field, dec.path))
		} else {
			dec.curr.SetUint(num)
		}
	case reflect.Float32, reflect.Float64:
		if num, err := strconv.ParseFloat(dec.values[0], dec.curr.Type().Bits()); err != nil {
			return newError(fmt.Errorf("the value of field \"%v\" in path \"%v\" should be a valid float number", dec.field, dec.path))
		} else {
			dec.curr.SetFloat(num)
		}
	case reflect.Bool:
		switch dec.values[0] {
		case "true", "on", "1", "checked":
			dec.curr.SetBool(true)
		default:
			dec.curr.SetBool(false)
			return nil
		}
	case reflect.Interface:
		dec.curr.Set(reflect.ValueOf(dec.values[0]))
	case reflect.Ptr:
		n := reflect.New(dec.curr.Type().Elem())
		if dec.curr.CanSet() {
			dec.curr.Set(n)
		} else {
			dec.curr.Elem().Set(n.Elem())
		}
		dec.curr = dec.curr.Elem()
		return dec.decode()
	case reflect.Struct:
		switch dec.curr.Interface().(type) {
		case time.Time:
			var t time.Time
			// if the value is empty then no to try to parse it and leave "t" as a zero value to set it in the field
			if dec.values[0] != "" {
				var err error
				t, err = time.Parse("2006-01-02", dec.values[0])
				if err != nil {
					return newError(fmt.Errorf("the value of field \"%v\" in path \"%v\" is not a valid datetime", dec.field, dec.path))
				}
			}
			dec.curr.Set(reflect.ValueOf(t))
		case url.URL:
			u, err := url.Parse(dec.values[0])
			if err != nil {
				return newError(fmt.Errorf("the value of field \"%v\" in path \"%v\" is not a valid url", dec.field, dec.path))
			}
			dec.curr.Set(reflect.ValueOf(*u))
		default:
			if dec.opts.IgnoreUnknownKeys {
				return nil
			}
			num := dec.curr.NumField()
			for i := 0; i < num; i++ {
				field := dec.curr.Type().Field(i)
				tag := field.Tag.Get(dec.opts.TagName)
				if tag == "-" {
					// skip this field
					return nil
				}
			}
			return newError(fmt.Errorf("not supported type for field \"%v\" in path \"%v\". Maybe you should to include it the UnmarshalText interface or register it using custom type?", dec.field, dec.path))
		}
	default:
		if dec.opts.IgnoreUnknownKeys {
			return nil
		}

		return newError(fmt.Errorf("not supported type for field \"%v\" in path \"%v\"", dec.field, dec.path))
	}

	return nil
}

// findStructField finds a field by its name, if it is not found,
// then retry the search examining the tag "formam" of every field of struct
func (dec *Decoder) findStructField() error {
	var anon reflect.Value

	num := dec.curr.NumField()
	for i := 0; i < num; i++ {
		field := dec.curr.Type().Field(i)

		if field.Name == dec.field {
			tag := field.Tag.Get(dec.opts.TagName)
			if tag == "-" {
				// skip this field
				return nil
			}
			// check if the field's name is equal
			dec.curr = dec.curr.Field(i)
			return nil
		} else if field.Anonymous {
			// if the field is a anonymous struct, then iterate over its fields
			tmp := dec.curr
			dec.curr = dec.curr.FieldByIndex(field.Index)
			if dec.curr.Kind() == reflect.Ptr {
				if dec.curr.IsNil() {
					dec.curr.Set(reflect.New(dec.curr.Type().Elem()))
				}
				dec.curr = dec.curr.Elem()
			}
			if err := dec.findStructField(); err != nil {
				dec.curr = tmp
				continue
			}
			// field in anonymous struct is found,
			// but first it should found the field in the rest of struct
			// (a field with same name in the current struct should have preference over anonymous struct)
			anon = dec.curr
			dec.curr = tmp
		} else if dec.field == field.Tag.Get(dec.opts.TagName) {
			// is not found yet, then retry by its tag name "formam"
			dec.curr = dec.curr.Field(i)
			return nil
		}
	}
	if anon.IsValid() {
		dec.curr = anon
		return nil
	}

	if dec.opts.IgnoreUnknownKeys {
		return nil
	}
	return newError(fmt.Errorf("not found the field \"%v\" in the path \"%v\"", dec.field, dec.path))
}

// expandSlice expands the length and capacity of the current slice
func (dec *Decoder) expandSlice(length int) {
	n := reflect.MakeSlice(dec.curr.Type(), length, length)
	reflect.Copy(n, dec.curr)
	dec.curr.Set(n)
}

// setValues set the values in current slice/array
func (dec *Decoder) setValues() error {
	tmp := dec.curr // hold current field
	for i, v := range dec.values {
		dec.curr = tmp.Index(i)
		dec.values[0] = v
		if err := dec.decode(); err != nil {
			return err
		}
	}
	return nil
}

// isCustomType checks if the field's type to decode has a custom type registered
func (dec *Decoder) isCustomType() (bool, error) {
	if dec.customTypes == nil {
		return false, nil
	}
	if v, ok := dec.customTypes[dec.curr.Type()]; ok {
		if len(v.fields) > 0 {
			for i := range v.fields {
				// check if the current field is registered
				// in the fields of the custom type
				if v.fields[i].field.Elem() == dec.curr {
					va, err := v.fields[i].fun(dec.values)
					if err != nil {
						return true, err
					}
					dec.curr.Set(reflect.ValueOf(va))
					return true, nil
				}
			}
		}
		// check if the default function exists for fields not specific
		if v.fun != nil {
			va, err := v.fun(dec.values)
			if err != nil {
				return true, err
			}
			dec.curr.Set(reflect.ValueOf(va))
			return true, nil
		}
	}
	return false, nil
}

var (
	typeTime    = reflect.TypeOf(time.Time{})
	typeTimePtr = reflect.TypeOf(&time.Time{})
)

// isUnmarshalText returns a boolean and error. The boolean is true if the
// field's type implements TextUnmarshaler, and false if not.
func (dec *Decoder) isUnmarshalText(v reflect.Value) (bool, error) {
	// check if implements the interface
	m, ok := v.Interface().(encoding.TextUnmarshaler)
	addr := v.CanAddr()
	if !ok && !addr {
		return false, nil
	} else if addr {
		return dec.isUnmarshalText(v.Addr())
	}
	// skip if the type is time.Time
	n := v.Type()
	if n.ConvertibleTo(typeTime) || n.ConvertibleTo(typeTimePtr) {
		return false, nil
	}
	// return result
	return true, m.UnmarshalText([]byte(dec.values[0]))
}
