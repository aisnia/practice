package main

import (
	"fmt"
)

func main() {
	funcDemo()
	returnDemo()

	//闭包
}

func funcDemo() {
	fmt.Println("函数是第一类对象，可作为参数传递。建议将复杂签名定义为函数类型，以便于阅读。")
	s1 := test(func() int { return 100 }) //匿名函数作为参数 传递
	s2 := format(func(s string, x, y int) string {
		return fmt.Sprintf(s, x, y)
	}, "%d %d ", 10, 20)
	fmt.Println(s1, s2)
}

//将传进来的函数，调用后然后 返回
func test(fn func() int) int {
	return fn()
}

type FormatFunc func(s string, x, y int) string //定义函数类型。

//真正的方法
func format(fn FormatFunc, s string, x, y int) string {
	return fn(s, x, y)
}

func returnDemo() {
	fmt.Println("命名返回参数可看做与形参类似的局部变量，最后由 return 隐式返回。")
	fmt.Println("命名返回参数允许 defer 延迟调用通过闭包读取和修改。")
	fmt.Println(add(1, 2))
}

//命名返回参数可看做与形参类似的局部变量，最后由 return 隐式返回。
//命名返回参数允许 defer 延迟调用通过闭包读取和修改。
func add(x, y int) (z int) {
	//延迟函数
	defer func() {
		//可以对命名返回参数进行 修改
		z += 100
	}() //注意要被调用的
	z = x + y
	return
}
