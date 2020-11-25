package main

import (
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
)

func sayHello(w http.ResponseWriter,req *http.Request) {
	//解析url
	u,_ := url.Parse("http://127.0.0.1:9091/")
	//新建代理
	proxy := httputil.NewSingleHostReverseProxy(u)
	proxy.ServeHTTP(w,req)
}

func main() {
	http.HandleFunc("/topgoer",sayHello)
	err := http.ListenAndServe(":9090", nil)
	if err != nil {
		fmt.Println("HTTP server failed,err:", err)
		return
	}
}

