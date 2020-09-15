package main

import (
	"fmt"
	"runtime"
)

func main() {
	go func(s string) {
		for i := 0; i < 2; i++ {
			fmt.Println(s)
		}
	}("world")

	//主线程
	for i := 0; i < 2; i++ {
		//切一下，再分配任务
		runtime.Gosched()
		fmt.Println("hello")
	}
}
