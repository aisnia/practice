package main

import "net/http"

func cors(f http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")                                                            // 允许访问所有域，可以换成具体url，注意仅具体url才能带cookie信息
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token") //header的类型
		w.Header().Add("Access-Control-Allow-Credentials", "true")                                                    //设置为true，允许ajax异步请求带cookie信息
		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")                             //允许请求方法
		w.Header().Set("content-type", "application/json;charset=UTF-8")                                              //返回数据格式是jsonif r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusNoContent)
		return
	}

}
func index(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello Golang"))
}
func main() {
	http.HandleFunc("/", cors(index))
	http.ListenAndServe(":8000", nil)
}
