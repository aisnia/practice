package main

import (
	"fmt"
	"reflect"
)

//反射获取interface的类型信息
func reflect_type(a interface{}) {
	t := reflect.TypeOf(a)
	fmt.Println("类型是：", t)
	//kind()获取具体的类型
	k := t.Kind()
	fmt.Println(k)

	switch k {
	case reflect.Float64:
		fmt.Printf("a is float54\n")
	case reflect.String:
		fmt.Println("string")
	}
}
func reflect_value(a interface{}) {
	v := reflect.ValueOf(a)
	fmt.Println("v的值是", v)
	k := v.Kind()
	fmt.Println(k)
	switch k {
	case reflect.Float64:
		fmt.Println("a 是", v.Float())
	}
}

//修改值
func reflect_set_value(a interface{}) {
	v := reflect.ValueOf(a)
	k := v.Kind()
	switch k {
	case reflect.Float64:
		//反射修改值
		v.SetFloat(6.9)
		fmt.Println("a is ", v.Float())
	case reflect.Ptr:
		//Elem() 获取地址的值
		v.Elem().SetFloat(7.9)
		fmt.Println("case:", v.Elem().Float())
		//地址
		fmt.Println(v.Pointer())
	}
}
func main() {
	var x float64 = 3.4
	reflect_type(x)
	reflect_value(x)
	reflect_set_value(&x)
}
