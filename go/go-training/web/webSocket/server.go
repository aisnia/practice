package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	//一个 ServeHTTP 扩展了一些正则路由的功能
	router := mux.NewRouter()
	go h.run()
	//绑定路由 127.0.0.1:8080/ws
	router.HandleFunc("/ws", myws)
	//监听，并且使用 router 这个handler
	if err := http.ListenAndServe("127.0.0.1:8080", router); err != nil {
		fmt.Println("err:", err)
	}
}