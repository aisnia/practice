package main

import (
	"fmt"
	"net"
)

func main() {
	conn, err := net.DialUDP("udp", nil, &net.UDPAddr{
		IP:   net.IPv4(0, 0, 0, 0),
		Port: 30000,
	})
	if err != nil {
		fmt.Println("dial failed", err)
		return
	}
	defer conn.Close()
	sendData := []byte("hello server")
	_, err = conn.Write(sendData)
	if err != nil {
		fmt.Println("send failed", err)
		return
	}
	data := make([]byte, 4096)
	n, remoteAddr, err := conn.ReadFromUDP(data)
	if err != nil{
		fmt.Println("read data failed")
		return
	}
	fmt.Printf("recv: %v, addr: %v, count: %v\n",string(data[:n]),remoteAddr,n)
}
