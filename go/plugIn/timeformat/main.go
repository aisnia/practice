package main

import (
	"fmt"
	"time"
)

func main() {
	//试图解析使用和格式化的日期
	myDateString := "2020-01-08 04:35"
	fmt.Println("My Starting Date:\t", myDateString)

	//将日期字符串解析为 Go 的time对象
	//第一个参数指定格式，第二参数是日期字符串
	myDate, err := time.Parse("2006-01-02 15:04", myDateString)
	if err != nil {
		panic(err)
	}
	//myDate 是 Time对象


	// Format使用与parse相同的格式样式，或者我们可以使用预先生成的常量
	fmt.Println("My Date Reformatted:\t", myDate.Format(time.RFC822))

	// In Y-m-d
	fmt.Println("Just The Date:\t\t", myDate.Format("2006-01-02"))
}
