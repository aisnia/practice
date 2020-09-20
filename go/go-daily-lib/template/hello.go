package main

import (
	"fmt"
	"html/template"
	"net/http"
)

type User struct {
	Name string
	Sex  string
	Age  int
}

func user(w http.ResponseWriter, r *http.Request) {
	//解析
	temp, err := template.ParseFiles("./user.html")
	if err != nil {
		fmt.Println("parseFile failed err", err)
		return
	}
	user := User{
		Name: "小强",
		Age:  18,
		Sex:  "男",
	}
	temp.Execute(w, user)
}
func hello(w http.ResponseWriter, r *http.Request) {
	//解析指定的文件生成的模板对象
	tem, err := template.ParseFiles("./hello.html")
	if err != nil {
		fmt.Println("parseFile failed err,", err)
		return
	}
	//利用给定的数据渲染模板，并将结果写入w
	tem.Execute(w, "xiaoqiang")

}

func main() {
	http.HandleFunc("/hello", hello)
	http.HandleFunc("/user", user)
	err := http.ListenAndServe(":8080", http.DefaultServeMux)
	if err != nil {
		fmt.Println("HTTP Server failed,err", err)
		return
	}
}
