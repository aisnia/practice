package main

import (
	"fmt"
	"sync"
)

var x2 int64
var wg2 sync.WaitGroup
var lock sync.Mutex

func add() {
	defer lock.Unlock()
	defer wg2.Done()
	lock.Lock()
	for i := 0; i < 50000; i++ {
		x2++
	}
}

func main() {
	wg2.Add(2)
	go add()
	go add()
	wg2.Wait()
	fmt.Println(x2)
}


