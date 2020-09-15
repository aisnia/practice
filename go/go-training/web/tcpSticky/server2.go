package main

import (
	"bufio"
	"fmt"
	"go/go-training/web/tcpSticky/proto"
	"io"
	"net"
)

func main() {
	listen, err := net.Listen("tcp", "127.0.0.1:20000")
	if err != nil {
		fmt.Println("listen failed,err :", err)
		return
	}
	defer listen.Close()
	for {
		conn, err := listen.Accept()
		if err != nil {
			fmt.Println("accept failed,err:", err)
			continue
		}
		go process2(conn)
	}

}

func process2(conn net.Conn) {
	defer conn.Close()
	reader := bufio.NewReader(conn)
	for {
		//解析
		msg, err := proto.Decode(reader)
		if err == io.EOF {
			return
		}
		if err != nil {
			fmt.Println("decode msg failed, err:", err)
			return
		}
		fmt.Println("收到的client数据:", msg)
	}
}
