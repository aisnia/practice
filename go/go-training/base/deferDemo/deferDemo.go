package main

import (
	"errors"
	"fmt"
)

func main() {
	foo(2, 0)
}
func foo(a, b int) (i int, err error) {
	defer fmt.Printf("first defer err %v\n", err)
	defer func(err error) { fmt.Printf("second defer err %v\n", err) }(err)
	//defer  必须在闭包里面，才能获取得到
	defer func() { fmt.Printf("third defer err %v\n", err) }()

	if b == 0 {
		err = errors.New("divided by zero!")
		return
	}

	i = a / b
	return
}
