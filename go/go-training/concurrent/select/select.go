package main

import (
	"fmt"
	"time"
)

func test1(ch chan string) {
	time.Sleep(time.Second * 2)
	ch <- "test1"
}
func test2(ch chan string) {
	time.Sleep(time.Second)
	ch <- "test2"
}

func main() {
	//两个管道
	out1 := make(chan string)
	out2 := make(chan string)
	//跑两个子协程，写数据
	go test1(out1)
	go test2(out2)
	//用select 监控
	time.Sleep(time.Second * 3)
	select {
	case s1 := <-out1:
		fmt.Println("s1 = ", s1)
	case s2 := <-out2:
		fmt.Println("s2 = ", s2)
		//default:
		//	fmt.Println("default")
	}
	fmt.Println("main结束")
}
