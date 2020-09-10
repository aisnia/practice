package main

import (
	"fmt"
	"math/rand"
	"time"
)

//求元素的和
func sum(arr [10]int) int {
	var sum int = 0
	for i := 0; i < len(arr); i++ {
		sum += arr[i]
	}
	return sum
}

func main() {
	//若想真正做一个随机数，要种子
	//seed() 种子默认是1
	//rand.seed(1)
	rand.Seed(time.Now().UnixNano())

	var b [10]int
	for i := 0; i < len(b); i++ {
		//产生一个 0 到 1000的随机数
		b[i] = rand.Intn(1000)
		fmt.Printf("%d ", b[i])
	}
	sum := sum(b)
	fmt.Println("\nsum =", sum)
}
