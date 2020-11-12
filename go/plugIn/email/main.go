package main

import (
	"github.com/jordan-wright/email"
	"log"
	"net/smtp"
)

func main() {
	e := email.NewEmail()
	//设置发送方的邮箱 1713892953@qq.com
	e.From = "1350017101@qq.com"

	//设置接收方的邮箱
	e.To = []string{"xiaoqiang20000523@163.com"}

	//设置主题
	e.Subject = "Test"

	//内容
	e.Text = []byte("你真帅!")

	//设置服务器相关信息
	err := e.Send("smtp.qq.com:25", smtp.PlainAuth("", "1350017101@qq.com", "kvrabzhbeirpfijc", "smtp.qq.com"))
	if err != nil {
		log.Fatal(err)
	}

}
