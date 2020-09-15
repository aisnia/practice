package main

import (
	"fmt"
	"runtime"
	"time"
)

func a() {
	for i := 0; i < 10; i++ {
		fmt.Println("A", i)
	}
}
func b() {
	for i := 0; i < 10; i++ {
		fmt.Println("B", i)
	}
}

func main() {
	//一个核
	runtime.GOMAXPROCS(2)
	go a()
	go b()
	time.Sleep(time.Second)
}
