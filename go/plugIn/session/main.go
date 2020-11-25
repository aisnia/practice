package main

import (
	"fmt"
	"github.com/gorilla/sessions"
	"net/http"
)

//初始化一个 Cookie存储对象
// something-very-secret应该是一个你自己的密匙，只要不被别人知道就行
var store = sessions.NewCookieStore([]byte("something-very-secret"))

func main() {
	http.HandleFunc("/save", SaveSession)
	http.HandleFunc("/get", GetSession)

	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println(err)
	}
}

func GetSession(w http.ResponseWriter, req *http.Request) {
	session, err := store.Get(req, "session-name")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	foo := session.Values["foo"]
	fmt.Println(foo)
}

func SaveSession(w http.ResponseWriter, req *http.Request) {
	// Get a session. We're ignoring the error resulted from decoding an
	// existing session: Get() always returns a session, even if empty.

	//获取一个session对象
	session, err := store.Get(req, "session-name")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	//在session存储值
	session.Values["foo"] = "bar"
	session.Values[42] = 43
	//保存更改
	session.Save(req, w)
}
