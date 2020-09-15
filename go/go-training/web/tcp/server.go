package main

import (
	"bufio"
	"fmt"
	"net"
	"strings"
)

func main() {
	/*listen, err := net.ListenTCP("tcp", &net.TCPAddr{
		IP:   net.IPv4(0, 0, 0, 0),
		Port: 30000,
	})*/
	listen, err := net.Listen("tcp", "127.0.0.1:20000")
	if err != nil {
		fmt.Println("Listen failed by port 20000", err)
		return
	}
	for {
		//循环中监听
		conn, err := listen.Accept()
		if err != nil {
			fmt.Println("get Connection failed", err)
			break
		}
		//启动一个新的协程处理
		go process(conn)
	}
}

func process(conn net.Conn) {
	defer conn.Close()
	for {
		//conn 是一个 IO的接口 获取reader
		reader := bufio.NewReader(conn)
		//发送的字节缓冲
		var buf [128]byte
		n, err := reader.Read(buf[:])
		if err != nil {
			fmt.Println("read from client failed, err:", err)
			break
		}
		//这里是读取了多少字节就取多少，否则会有后面 0 字节
		str := buf[:n]
		msg := strings.TrimSpace(string(str))
		fmt.Println("收到client的数据", msg)
		//发送回去
		ack := []byte(fmt.Sprintf("以收到 ack = %d", len(buf)))
		conn.Write(ack)
	}
}
