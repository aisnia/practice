package main

import (
	"fmt"
	"go/go-training/web/tcpSticky/proto"
	"net"
)

func main() {
	conn, err := net.Dial("tcp", "127.0.0.1:20000")
	if err != nil {
		fmt.Println("dial failed,err:", err)
		return
	}
	defer conn.Close()
	for i := 0; i < 20; i++ {
		msg := "Hello,Hello. Hpw are you?"
		//编码
		pkg, err := proto.Encode(msg)
		if err != nil {
			fmt.Println("encode failed, err:", err)
			return
		}
		conn.Write(pkg)
	}
}
