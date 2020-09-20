package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
)

func main() {
	re()
}
func wr() {
	//参数2 打开的模式
	//参数3 权限的控制
	//w写 r读 x执行  w 2,  r 4   x 1
	file, err := os.OpenFile("xxx.txt", os.O_CREATE|os.O_WRONLY, 0666)
	if err != nil {
		return
	}
	defer file.Close()

	//获取write对象
	write := bufio.NewWriter(file)
	for i := 0; i < 5; i++ {
		write.WriteString("hello\n")
	}
	//刷新缓冲区
	write.Flush()
}
func re() {
	file, err := os.Open("./xxx.txt")
	if err != nil {
		fmt.Println("err", err)
		return
	}
	defer file.Close()
	reader := bufio.NewReader(file)
	for {
		line, _, err := reader.ReadLine()
		if err == io.EOF {
			fmt.Println("读取完毕")
			break
		}
		if err != nil {
			fmt.Println("read failed", err)
			break
		}
		fmt.Println(string(line))
	}
}
