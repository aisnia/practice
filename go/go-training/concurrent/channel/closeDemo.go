package main

import "fmt"

func main() {
	ch1 := make(chan int)
	ch2 := make(chan int)
	//开启 goroutine 将 0~100 发送到ch1中
	go func() {
		for i := 1; i < 100; i++ {
			ch1 <- i
		}
		close(ch1)
	}()

	// 开启goroutine从ch1中接收值，并将该值的平方发送到ch2中
	go func() {
		for {
			i, ok := <-ch1
			if !ok{
				break
			}
			ch2 <- i * i
		}
		close(ch2)
	}()

	// 在主goroutine中从ch2中接收值打印
	for i := range ch2 { // 通道关闭后会退出for range循环
		fmt.Println(i)
	}

}
