package main

import (
	"fmt"
	"time"
)

func main() {
	//创建管道
	out := make(chan string, 10)
	//子协程写数据
	go write(out)
	for s := range out {
		fmt.Println("res:", s)
		time.Sleep(time.Second)
	}
}

func write(ch chan string) {
	for {
		select {
		case ch <- "hello":
			fmt.Println("write hello")
		default:
			fmt.Println("channel full")
		}
		time.Sleep(time.Millisecond * 500)
	}
}
