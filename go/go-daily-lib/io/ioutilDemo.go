package main

import (
	"fmt"
	"io/ioutil"
)

func main() {
	//w()
	r()
}

func w() {
	//其实也是封装的一些工具而已
	err := ioutil.WriteFile("./yyy.txt", []byte("小强真帅"), 0666)
	if err != nil {
		fmt.Println("write file err", err)
		return
	}
}

func r() {
	buf, err := ioutil.ReadFile("./yyy.txt")
	if err != nil {
		fmt.Println("read file err", err)
		return
	}
	fmt.Println(string(buf))
}
