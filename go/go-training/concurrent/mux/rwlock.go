package main

import (
	"fmt"
	"sync"
	"time"
)

var (
	n         int64
	workgroup sync.WaitGroup
	rwLock    sync.RWMutex
)

func read() {
	//加读锁
	rwLock.RLock()
	defer rwLock.RUnlock()
	defer workgroup.Done()

	//假设写耗时为 3 毫秒
	time.Sleep(time.Millisecond * 3)
	//fmt.Println(n)
}

func write() {
	//加写锁
	rwLock.Lock()
	defer rwLock.Unlock()
	defer workgroup.Done()

	//假设 写操作耗时10 毫秒
	time.Sleep(time.Millisecond * 10)
	n = n + 1
	//fmt.Println(n)
}
func main() {
	start := time.Now()
	for i := 0; i < 10; i++ {
		workgroup.Add(1)
		go write()
	}
	for i := 0; i < 1000; i++ {
		workgroup.Add(1)
		go read()
	}

	workgroup.Wait()
	end := time.Now()
	fmt.Println(end.Sub(start))
	fmt.Println(n)
}
