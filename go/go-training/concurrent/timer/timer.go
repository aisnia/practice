package main

import (
	"fmt"
	"time"
)

func main() {
	//1 timer 的基本使用   两秒的定时器
	time1 := time.NewTimer(2 * time.Second)
	t1 := time.Now()
	fmt.Printf("t1: %v\n", t1)
	t2 := <-time1.C
	fmt.Printf("t1: %v\n", t2)

	//2. 验证timer只能响应一次 因为时间通道为 1 只能存放一个时间
	time2 := time.NewTimer(time.Second)
	for {
		<-time2.C
		fmt.Println("时间到")
		break
	}

	//3. timer 实现延迟的功能
	fmt.Println("延迟1秒")
	time.Sleep(time.Second)
	fmt.Println("1秒到")

	fmt.Println("延迟2秒")
	time3 := time.NewTimer(2 * time.Second)
	<-time3.C
	fmt.Println("2秒到")

	fmt.Println("延迟3秒")
	<-time.After(3 * time.Second)
	fmt.Println("3秒到")

	//停止定时器
	time4 := time.NewTimer(2 * time.Second)
	go func() {
		<-time4.C
		fmt.Println("定时器执行了")
	}()
	b := time4.Stop()
	if b {
		fmt.Println("time4关闭了")
	}

	//重置定时器
	time5 := time.NewTimer(3 * time.Second)
	time5.Reset(1 * time.Second)
	fmt.Println(time.Now())
	fmt.Println(<-time5.C)

	for {

	}
}
