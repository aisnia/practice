package main

import (
	"bufio"
	"fmt"
	"io"
	"net"
)

func process(conn net.Conn) {
	defer conn.Close()
	reader := bufio.NewReader(conn)
	var buf [1024]byte
	for {
		n, err := reader.Read(buf[:])
		if err == io.EOF {
			//读取完了
			break
		}
		if err != nil {
			fmt.Println("read from client failed, err:", err)
			break
		}
		str := string(buf[:n])
		fmt.Println("收到client发来的信息:", str)
	}
}

func main() {
	listen, err := net.Listen("tcp", "127.0.0.1:20000")
	if err != nil {
		fmt.Println("listen failed", err)
		return
	}
	defer listen.Close()
	for {
		conn, err := listen.Accept()
		if err != nil {
			fmt.Printf("listen failed", err)
			continue
		}
		go process(conn)
	}

}
