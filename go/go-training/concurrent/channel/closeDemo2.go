package main

import "fmt"

//输出源 的通道
func counter(out chan<- int) {
	for i := 0; i < 100; i++ {
		out <- i
	}
	close(out)
}
// 输出源 chan <-   输入源  <-chan
func squarer(out chan<- int, in <-chan int) {
	for i := range in {
		out <- i * i
	}
	close(out)
}

func main() {
	//普通数字
	ch1 := make(chan int)
	//存平方数
	ch2 := make(chan int)
	go counter(ch1)
	go squarer(ch2, ch1)
	for i := range ch2 {
		fmt.Println(i)
	}
}
