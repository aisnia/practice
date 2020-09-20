package main

import (
	"fmt"
	"log"
	"os"
)

func main() {

	f, err := os.OpenFile("./xx.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
	if err != nil {
		fmt.Println("err:", err)
		return
	}
	log.SetOutput(f)
	log.SetFlags(log.Llongfile | log.Ldate | log.Lmicroseconds)
	log.Println("一条普通的日志")
	log.SetPrefix("[xiaoqiang]")
	log.Println("这是加了前缀的日志")
}
