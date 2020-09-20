package main

import (
	"fmt"
	"io"
	"os"
)

var filename = "./xxx.txt"

func main() {
	//open()
	//read()
	copy()
}
func open() {
	//创建文件
	file, err := os.Create(filename)
	if err != nil {
		fmt.Println("文件创建失败", err)
		return
	}
	defer file.Close()

	for i := 0; i < 5; i++ {
		file.WriteString("ab\n")
		file.Write([]byte("cd\n"))
	}
}
func read() {
	//只读的方式打开文件
	file, err := os.Open(filename)
	if err != nil {
		fmt.Printf("打开失败", err)
		return
	}

	defer file.Close()

	//定义接受数据的字节数组
	var buf [128]byte
	var content []byte
	for {
		n, err := file.Read(buf[:])
		if err == io.EOF {
			// 读取结束
			break
		}
		if err != nil {
			fmt.Println("read err", err)
			return
		}
		content = append(content, buf[:n]...)
	}
	fmt.Println(string(content))
}

func copy() {
	//打开源文件
	srcFile, err := os.Open(filename)
	if err != nil {
		fmt.Println("open file failed err:", err)
		return
	}
	//创建新的文件
	destFile, err := os.Create("./abc.txt")
	if err != nil {
		fmt.Println("create file err", err)
		return
	}
	//缓存读取
	buf := make([]byte, 1024)
	for {
		//从源文件读取数据
		n, err := srcFile.Read(buf)
		if err == io.EOF {
			fmt.Println("读取完毕")
			break
		}
		if err != nil {
			fmt.Println("read failed err,", err)
			break
		}
		//写的目标文件
		destFile.Write(buf[:n])
	}
	srcFile.Close()
	destFile.Close()
}
