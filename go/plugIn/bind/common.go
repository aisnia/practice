package bind

import (
	"errors"
	"fmt"
	"reflect"
	"strconv"
	"time"
)

//根据结构体中sql标签映射数据到结构体中并且转换类型
func DataToStructByTagSql(data map[string]string, obj interface{}) {
	//获取反射的value
	objVal := reflect.ValueOf(obj)
	//获取私有的属性
	objVal = objVal.Elem()
	fmt.Printf("%#v\n", objVal)
	fmt.Printf("%#v\n", data)
	//遍历所有的字段
	for i := 0; i < objVal.NumField(); i++ {
		//获取sql标签对应的值
		sql := objVal.Type().Field(i).Tag.Get("sql")
		//获取map里面的值
		value := data[sql]
		//获取字段对应的名称
		name := objVal.Type().Field(i).Name
		//获取字段对应的类型
		FiledType := objVal.Field(i).Type()
		//获取遍历的类型，也可以直接写string类型
		val := reflect.ValueOf(value) //string的类型
		fmt.Printf(" sql:%v value:%v name:%v, FiledType:%v\n", sql, value, name, FiledType)

		var err error
		if FiledType != val.Type() {
			//类型转换
			val, err = TypeConversion(value, FiledType.Name())
			if err != nil {
				fmt.Println("conversion failed")
			}
			fmt.Println(val)
		}
		objVal.FieldByName(name).Set(val)
	}
}

func TypeConversion(value string, ntype string) (reflect.Value, error) {
	if ntype == "string" {
		return reflect.ValueOf(value), nil
	} else if ntype == "time.Time" || ntype == "Time" {
		t, err := time.ParseInLocation("2006-01-02 15:04:05", value, time.Local)
		return reflect.ValueOf(t), err
	} else if ntype == "int" {
		n, err := strconv.Atoi(value)
		return reflect.ValueOf(n), err
	} else if ntype == "int8" {
		i, err := strconv.ParseInt(value, 10, 64)
		return reflect.ValueOf(int8(i)), err
	} else if ntype == "int32" {
		i, err := strconv.ParseInt(value, 10, 64)
		return reflect.ValueOf(int64(i)), err
	} else if ntype == "int64" {
		i, err := strconv.ParseInt(value, 10, 64)
		return reflect.ValueOf(i), err
	} else if ntype == "float32" {
		i, err := strconv.ParseFloat(value, 64)
		return reflect.ValueOf(float32(i)), err
	} else if ntype == "float64" {
		i, err := strconv.ParseFloat(value, 64)
		return reflect.ValueOf(i), err
	}
	//else if .......增加其他一些类型的转换

	return reflect.ValueOf(value), errors.New("未知的类型：" + ntype)
}

//Product Product定义一个结构体
type Product struct {
	ID           int64  `json:"id" sql:"id"`
	ProductClass string `json:"ProductClass" sql:"ProductClass"`
	ProductName  string `json:"ProductName" sql:"productName"`
	ProductNum   int64  `json:"ProductNum" sql:"productNum"`
	ProductImage string `json:"ProductImage" sql:"productImage"`
	ProductURL   string `json:"ProductUrl" sql:"productUrl" `
}

func main() {
	//这块是模拟mysql获取单条的数据反射到结构体
	data := map[string]string{"id": "1", "ProductClass": "blog", "productName": "5lmh.com", "productNum": "40", "productImage": "http://www.5lmh.com/", "productUrl": "http://www.5lmh.com/"}
	productResult := &Product{}
	DataToStructByTagSql(data, productResult)
	fmt.Println("----------------------------------")
	fmt.Println(*productResult)
	//这块是模拟mysql获取所有的数据反射到结构体
	Alldata := []map[string]string{
		{"id": "1", "ProductClass": "blog", "productName": "5lmh.com", "productNum": "40", "productImage": "http://www.5lmh.com/", "productUrl": "http://www.5lmh.com/"},
		{"id": "2", "ProductClass": "blog", "productName": "5lmh.com", "productNum": "40", "productImage": "http://www.5lmh.com/", "productUrl": "http://www.5lmh.com/"},
	}
	var productArray []*Product
	for _, v := range Alldata {
		Allproduct := &Product{}
		DataToStructByTagSql(v, Allproduct)
		productArray = append(productArray, Allproduct)
	}
	fmt.Println("----------------------------------")

	for _, vv := range productArray {
		fmt.Println(vv)
	}
}
