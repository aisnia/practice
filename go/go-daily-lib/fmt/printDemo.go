package main

import (
	"fmt"
	"os"
)

func main() {
	//直接输出 Print
	fmt.Print("hello，")
	fmt.Printf("我是%s", "小强")
	fmt.Println("很高兴认识你呢!")

	//FPrint 输出到一个io.Writer接口类型的变量w中
	fmt.Fprintf(os.Stdout, "你好,%s", "小强")
	fmt.Println(os.Stdout, "me too")

	//SPrint
	s := fmt.Sprintf("您好呦! %s", "小强")
	fmt.Println(s)
	err := fmt.Errorf("这里有错误")
	fmt.Println(err)
}
