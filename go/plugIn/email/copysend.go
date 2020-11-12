package main

import (
	"github.com/jordan-wright/email"
	"log"
	"net/smtp"
)

func main() {
	e := email.NewEmail()

	e.From = "1350017101@qq.com"
	e.To = []string{"1713892953@qq.com"}
	//抄送
	e.Cc = []string{"xiaoqiang20000523@163.com"}
	//设置秘密抄送
	e.Bcc = []string{"xiaoqiang20000523@163.com"}

	//设置主题
	e.Subject = "抄送"
	e.Text = []byte("还不错")
	//服务器相关配置
	err := e.Send("smtp.qq.com:25", smtp.PlainAuth("", "1350017101@qq.com", "kvrabzhbeirpfijc", "smtp.qq.com"))
	if err != nil {
		log.Fatal(err)
	}
}
