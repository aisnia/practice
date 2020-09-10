package main

import (
	"fmt"
)

func main() {
	arr1 := [3]int{1, 2, 3}
	arr2 := [3]int{1, 2, 3}
	fmt.Printf("%p \n", &arr1) //0xc00000e420
	fmt.Printf("%p \n", &arr2) //0xc00000e440
	//比较的是里面的元素哦
	fmt.Println(arr1 == arr2) //true
}

type Sum struct {
	a int
	b int
}
