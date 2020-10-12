package main

import (
	"encoding/json"
	"fmt"
)

type Person struct {
	//- 是忽略的意思
	Name string `json:"-"`
	Sex  string `json:"sex"`
	Age  int    `json:"age"`
}

func demo1() {
	p := Person{
		"小强",
		"男",
		20,
	}
	//编码json
	bytes, err := json.Marshal(p)
	if err != nil {
		fmt.Println("转json编码失败, err:", err)
		return
	}
	fmt.Println(string(bytes))
	//格式化的输出
	b, err := json.MarshalIndent(p, "", "    ")
	if err != nil {
		fmt.Println("json err ", err)
	}
	fmt.Println(string(b))
}
func demo2() {
	student := make(map[string]interface{})
	student["name"] = "小强"
	student["sex"] = "男"
	student["age"] = 20

	bytes, err := json.Marshal(student)
	if err != nil {
		fmt.Println("解码转json失败,err", err)
		return
	}
	fmt.Println(string((bytes)))
}
func demo3() {
	s := `{"age":18,"name":"小强","sex":"男"}`
	p := &Person{}
	err := json.Unmarshal([]byte(s), p)
	if err != nil {
		fmt.Println("解码失败,err", err)
		return
	}
	fmt.Println(p)
}
func demo4() {
	//int 类型都是 float
	s := `{"age":18,"name":"小强","sex":"男"}`
	b := []byte(s)

	//接口
	var i interface{}
	err := json.Unmarshal(b, &i)
	if err != nil {
		fmt.Println(err)
	}
	//自动转化为map
	fmt.Println(i)
	//可以判断类型
	m := i.(map[string]interface{})
	for k, v := range m {
		switch vv := v.(type) {
		case float64:
			fmt.Println(k, "是float64类型", vv)
		case string:
			fmt.Println(k, "是string类型", vv)
		case int:
			fmt.Println(k, "是 int 类型", vv)
		default:
			fmt.Println("其他")
		}
	}
}
func main() {
	//demo1()
	//demo2()
	//demo3()
	demo4()
}
