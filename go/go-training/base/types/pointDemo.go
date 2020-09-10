package main

import (
	"fmt"
	"unsafe"
)

func main() {
	fmt.Println("unsafe.Pointer 和任意类型指针间进行转换")
	PointerDemo()

	fmt.Println("将 Pointer 转换成 uintptr，可变相实现指针运算。")
	UintPtrDemo()
}

func PointerDemo() {
	//指针可以在 unsafe.Pointer 和任意类型指针间进行转换
	x := 0x12345678         //16进制
	fmt.Println(x)          //输出的是十进制 305419896
	p := unsafe.Pointer(&x) //*int 类型 变成   Pointer
	n := (*[4]byte)(p)      // Pointer -> *[4]byte
	for i := 0; i < len(n); i++ {
		fmt.Printf("%X ", n[i])
	}
	//输出 78 56 34 12  go
}
func UintPtrDemo() {
	//自定义一个结构体,并且初始化
	d := struct {
		s string
		x int
	}{"abc", 100}

	p := uintptr(unsafe.Pointer(&d)) // *struct -> Pointer -> uintptr

	p += unsafe.Offsetof(d.x) // uintptr + offset
	p2 := unsafe.Pointer(p)   // uintptr -> Pointer
	px := (*int)(p2)          // Pointer -> *int
	//* 取地址的值，进行修改
	// & 则是获取地址的 值 一个整数
	*px = 200 // d.x = 200
	fmt.Printf("%#v", d)

}
