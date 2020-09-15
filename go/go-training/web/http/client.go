package main

import (
	"fmt"
	"io"
	"net/http"
)

func main() {
	resp,err := http.Get("http://www.baidu.com")
	if err != nil{
		fmt.Println("err:",err)
	}
	fmt.Println(resp)
	resp, err = http.Get("http://127.0.0.1:8000/go")
	if err != nil {
		fmt.Println("get err:", err)
		return
	}
	defer resp.Body.Close()
	//200 OK
	fmt.Println(resp.Status)
	fmt.Println(resp.Header)

	buf := make([]byte, 1024)

	for {

		//接受服务器的消息
		n, err := resp.Body.Read(buf)
		if err != nil && err != io.EOF {
			fmt.Println(err)
			return
		} else {
			fmt.Println("读取完毕")
			res := string(buf[:n])
			fmt.Println(res)
			break
		}
	}
}
