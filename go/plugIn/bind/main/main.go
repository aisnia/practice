package main

import (
	"fmt"
	"go/plugIn/bind"
	"net/http"
	"net/url"
)

//Product Product定义一个结构体
type Product struct {
	ID           int64  `json:"id" sql:"id" kuteng:"id"`
	ProductClass string `json:"ProductClass" sql:"ProductClass" kuteng:"ProductClass"`
	ProductName  string `json:"ProductName" sql:"productName" kuteng:"productName"`
	ProductNum   int64  `json:"ProductNum" sql:"productNum" kuteng:"productNum"`
	ProductImage string `json:"ProductImage" sql:"productImage" kuteng:"productImage"`
	ProductURL   string `json:"ProductUrl" sql:"productUrl"  kuteng:"productUrl"`
}

func hello(w http.ResponseWriter, r *http.Request) {
}

func main() {
	product := &Product{}
	//这块是表单提交的数据

	values := url.Values{}
	values.Set("id", "1")
	values.Set("ProductClass", "blog")
	values.Set("productName", "5lmh.com")
	values.Set("productNum", "40")
	values.Set("productImage", "http://www.5lmh.com/")
	values.Set("productUrl", "http://www.5lmh.com/")

	dec := bind.NewDecoder(&bind.DecoderOptions{TagName: "kuteng"})
	if err := dec.Decode(values, product); err != nil {
		fmt.Println("绑定失败")
	}
	fmt.Println(product)
}
