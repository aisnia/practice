package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

var wg sync.WaitGroup

//初始例子
func worker(ctx context.Context) {
	go worker2(ctx)
LOOP:
	for {
		fmt.Println("worker")
		time.Sleep(time.Second)
		select {
		case <-ctx.Done(): //等待通知退出
			break LOOP
		default:
		}
	}
	wg.Done()
}
func worker2(ctx context.Context) {
LOOP:
	for {
		fmt.Println("worker2")
		time.Sleep(time.Second)
		select {
		case <-ctx.Done():
			break LOOP
		default:

		}
	}
	wg.Done()
}

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	wg.Add(1)
	go worker(ctx)
	//如何优雅的实现结束 子 goroutine
	//模仿主程序工作
	time.Sleep(3 * time.Second)
	cancel() // 通知子goroutine结束
	wg.Wait()
	fmt.Println("over")
}
