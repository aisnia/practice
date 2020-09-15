package main

import (
	"fmt"
	"sync"
	"sync/atomic"
	"time"
)

var x int64

var lock sync.Mutex

var wg sync.WaitGroup

//普通加函数
func add() {
	defer wg.Done()
	x++
}
func mutexAdd() {
	lock.Lock()
	defer lock.Unlock()
	defer wg.Done()
	x++
}

func atomicAdd() {
	defer wg.Done()
	atomic.AddInt64(&x, 1)
}
func main() {
	start := time.Now()
	for i := 0; i < 10000; i++ {
		wg.Add(1)
		go add() //5.0019ms
		//go mutexAdd() //14.9335ms
		//go atomicAdd() //5.0557ms
	}
	wg.Wait()
	fmt.Println(x)
	end := time.Now()
	fmt.Println("耗时", end.Sub(start))
}
