package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

var wg sync.WaitGroup

func worker3(ctx context.Context) {
	wg.Add(1)
LOOP:
	for {
		fmt.Println("db connection ...")
		time.Sleep(time.Millisecond * 1000) // 假设正常连接数据库耗时10毫秒

		select {
		case <-ctx.Done(): //50 毫秒后自动调用
			break LOOP
		default:

		}
	}
	fmt.Println("worker done!")
	fmt.Println(ctx.Err())
	wg.Done()
}

func main() {
	//设置一个 50 毫秒的超时
	ctx, cancel := context.WithTimeout(context.Background(), time.Millisecond*5)

	go worker3(ctx)

	time.Sleep(5 * time.Millisecond)
	//通知子 goroutine结束

	cancel()
	wg.Wait()
	fmt.Println("over")
}
