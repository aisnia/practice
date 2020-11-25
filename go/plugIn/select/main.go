package main

import "fmt"

//选项设计模式
//问题：有一个结构体，定义一个函数，给结构体初始化

//结构体
type Options struct {
	str1 string
	str2 string
	int1 int
	int2 int
	int3 int
}

func InitOptions(str1 string, str2 string, int1 int, int2 int) {
	options := Options{}
	options.str1 = str1
	options.str2 = str2
	options.int1 = int1
	options.int2 = int2
	fmt.Printf("options:%#v\n", options)
}
func main() {
	InitOptions("a", "b", 1, 2)
}

