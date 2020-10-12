package main

import (
	"encoding/base64"
	"fmt"
	"log"
	"strings"
)

func main() {
	str := "www.5lmh.com"
	fmt.Printf("string : %v\n", str)

	input := []byte(str)
	fmt.Printf("[]byte : %v\n", input)

	// 演示base64编码
	//标准的编码
	encodeString := base64.StdEncoding.EncodeToString(input)
	fmt.Printf("encode base64 :%v\n", encodeString)

	//对上面 编码结果进行base64 解码
	decodeBytes, err := base64.StdEncoding.DecodeString(encodeString)
	if err != nil {
		fmt.Println("解码失败")
		return
	}
	fmt.Printf("decode base64 : %v\n", string(decodeBytes))

	fmt.Println(strings.Repeat("-", 20))

	//URL编码
	urlencode := base64.URLEncoding.EncodeToString(input)
	fmt.Printf("urlencode : %v\n", urlencode)

	//URLEncoding
	urldecode, err := base64.URLEncoding.DecodeString(urlencode)
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Printf("urldecode : %v\n", string(urldecode))

}
