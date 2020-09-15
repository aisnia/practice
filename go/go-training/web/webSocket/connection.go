package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

//一个用户的连接
//ws 是websocket的专有连接
//sc 传递的数据通道
//data Data 用于传输的数据
type connection struct {
	ws   *websocket.Conn
	sc   chan []byte
	data *Data
}

//wu 对于websocket的升级设置
var wu = &websocket.Upgrader{ReadBufferSize: 512,
	WriteBufferSize: 512, CheckOrigin: func(r *http.Request) bool { return true }}

//一个http请求过来做的操作
//一个http的HandlerFunc 通过wu对其升级
func myws(w http.ResponseWriter, r *http.Request) {
	//http升级为 websocket协议
	ws, err := wu.Upgrade(w, r, nil)
	if err != nil {
		return
	}
	//一个连接建立了
	c := &connection{
		sc:   make(chan []byte, 256),
		ws:   ws,
		data: &Data{}}
	//新来的连接放入 hub 的 r里面
	h.r <- c
	//监听 sc写回数据的通道，有则写回
	go c.writer()
	//读操作
	c.reader()
	defer func() {
		c.data.Type = "logout"
		user_list = del(user_list, c.data.User)
		c.data.UserList = user_list
		c.data.Content = c.data.User
		data_b, _ := json.Marshal(c.data)
		h.b <- data_b
		h.r <- c
	}()
}

//写操作，有数据就写回给客户端
func (c *connection) writer() {
	for message := range c.sc {
		c.ws.WriteMessage(websocket.TextMessage, message)
	}
	c.ws.Close()
}

var user_list = []string{}

func (c *connection) reader() {
	for {
		_, message, err := c.ws.ReadMessage()
		if err != nil {
			h.r <- c
			break
		}
		json.Unmarshal(message, &c.data)
		switch c.data.Type {  //登录操作 设置用户名等等，并且加入用户列表
		case "login":
			c.data.User = c.data.Content
			c.data.From = c.data.User
			user_list = append(user_list, c.data.User)
			c.data.UserList = user_list
			data_b, _ := json.Marshal(c.data)
			h.b <- data_b  //内容发送给公屏
		case "user":  //用户发送消息
			c.data.Type = "user"
			data_b, _ := json.Marshal(c.data)
			h.b <- data_b
		case "logout":  //退出
			c.data.Type = "logout"
			user_list = del(user_list, c.data.User)
			data_b, _ := json.Marshal(c.data)
			h.b <- data_b
			h.r <- c
		default:
			fmt.Print("========default================")
		}
	}
}

//从所有连接里，删除一个连接
func del(slice []string, user string) []string {
	count := len(slice)
	if count == 0 {
		return slice
	}
	if count == 1 && slice[0] == user {
		return []string{}
	}
	var n_slice = []string{}
	for i := range slice {
		//遍历删除
		if slice[i] == user && i == count {
			return slice[:count]
		} else if slice[i] == user {
			n_slice = append(slice[:i], slice[i+1:]...)
			break
		}
	}
	fmt.Println(n_slice)
	return n_slice
}
