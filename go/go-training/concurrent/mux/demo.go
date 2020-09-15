package main

import (
	"fmt"
	"sync"
)

var x int64
var wg sync.WaitGroup

func Add() {
	for i := 0; i < 50000; i++ {
		x++
	}
	wg.Done()
}
func main() {
	wg.Add(2)
	go Add()
	go Add()
	wg.Wait()
	fmt.Println(x)
}
