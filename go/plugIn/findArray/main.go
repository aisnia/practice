package main

import "fmt"

func main() {

	items := []string{"A", "1", "B", "2", "C", "3"}

	_, found := Find(items, "xq")
	if !found {
		fmt.Println("Value is nor in slice")
	}
	//Found Example
	k, found := Find(items, "B")
	if !found {
		fmt.Println("Value not found in slice")

	} else {
		fmt.Printf("B found at key: %d\n", k)
	}
}

func Find(slice []string, val string) (int, bool) {
	for i, item := range slice {
		if item == val {
			return i, true
		}
	}
	return -1, false
}
