package main

import qrcode "github.com/skip2/go-qrcode"
import "fmt"

func main() {
	err := qrcode.WriteFile("陈晓强", qrcode.Medium, 256, "qr.png")
	if err != nil {
		fmt.Println("write error")
	}
}