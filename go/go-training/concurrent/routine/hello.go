package main

import (
	"fmt"
	"time"
)

func hello() {
	fmt.Println("hello")
}

func main() {
	go hello()
	//休眠一秒
	time.Sleep(time.Second)
}
