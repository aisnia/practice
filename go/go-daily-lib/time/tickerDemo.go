package main

import (
	"fmt"
	"time"
)

func main() {
	tick := time.Tick(time.Second) //定义一个1秒间隔的定时器  返回<-chan Time
	for i := range tick {
		fmt.Println(i) //每秒执行的任务
	}
}
