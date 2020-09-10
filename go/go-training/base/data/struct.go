package main

import (
	"fmt"
)

type Sum struct {
	a int
	b int
}
type Three struct {
	sum Sum
	c   int
}

func main() {
	s1 := Sum{1, 2}
	s2 := Sum{1, 2}
	fmt.Printf("%p \n", &s1)
	fmt.Printf("%p \n", &s2)
	fmt.Println(s1 == s2)

	t1 := Three{s1, 3}
	t2 := Three{s2, 3}
	fmt.Printf("%p \n", &t1)
	fmt.Printf("%p \n", &t2)
	fmt.Println(t1 == t2)
}
