package main

import (
	"log"
	"net/smtp"

	"github.com/jordan-wright/email"
)

func main() {
	e := email.NewEmail()
	//设置发送方的邮箱
	e.From = "1350017101@qq.com"
	// 设置接收方的邮箱
	e.To = []string{"xiaoqiang20000523@163.com"}
	//设置主题
	e.Subject = "这是主题"
	//设置文件发送的内容
	e.HTML = []byte(`
    <h1><a href="http://www.topgoer.com/">go语言中文网站</a></h1>    
    `)
	//设置服务器相关信息
	err := e.Send("smtp.qq.com:25", smtp.PlainAuth("", "1350017101@qq.com", "kvrabzhbeirpfijc", "smtp.qq.com"))
	if err != nil {
		log.Fatal(err)
	}
}