package main

import (
	"fmt"
	"strconv"
	"sync"
)

var m = sync.Map{}

func main() {
	wg := sync.WaitGroup{}
	for i := 0; i < 20; i++ {
		wg.Add(1)
		go func(n int) {
			defer wg.Done()
			key := strconv.Itoa(n)
			m.Store(key, n)
			val, _ := m.Load(key)
			fmt.Printf("k=:%v,v:=%v\n", key, val)
		}(i)
	}
	wg.Wait()
}
