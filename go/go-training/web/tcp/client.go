package main

import (
	"bufio"
	"fmt"
	"net"
	"os"
	"strings"
)

func main() {
	conn, err := net.Dial("tcp", "127.0.0.1:20000")
	if err != nil {
		fmt.Println("err :", err)
		return
	}
	defer conn.Close()
	inputReader := bufio.NewReader(os.Stdin)
	for {
		//读取到 \n 就返回
		str, err := inputReader.ReadString('\n')
		if err != nil {
			fmt.Println("err:", err)
			break
		}
		info := strings.Trim(str, "\r\n")
		if strings.ToUpper(info) == "Q" {
			return
		}
		_, err = conn.Write([]byte(str))
		if err != nil {
			fmt.Println("发送失败", err)
			return
		}
		//字节数组来接受
		buf := [512]byte{}
		n, err := conn.Read(buf[:])
		if err != nil {
			fmt.Println("读取服务器数据失败", err)
			return
		}
		//注意这里接收了多少数据就是截取到哪，否则后面是 0
		ack := strings.TrimSpace(string(buf[:n]))
		fmt.Printf("读取到服务器 %d 字节数据：%s\n", n, ack)
	}
}
