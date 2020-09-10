package main

import "fmt"

func foo2() (i int) {
	i = 0
	defer func() {
		fmt.Println(i)
	}()
	return 2
}
func main() {
	foo2()
}
