package main

import (
	"github.com/gorilla/websocket"
	"go/plugIn/websocket/impl"
	"net/http"
	"time"
)

var (
	upgrade = websocket.Upgrader{
		//设置允许跨域
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
)

func wsHandler(w http.ResponseWriter, r *http.Request) {
	var (
		//websocket长连接
		wsConn *websocket.Conn
		err    error
		conn   *impl.Connection
		data   []byte
	)
	//header 中添加我们的Upgrade:websocket
	//进行协议的升级
	if wsConn, err = upgrade.Upgrade(w, r, nil); err != nil {
		return
	}
	//将wsConn进行封装 成我的 Connection
	if conn, err = impl.InitConnection(wsConn); err != nil {
		goto ERR
	}

	//心跳检测
	go func() {
		var (
			err error
		)
		for {
			if err = conn.WriteMessage([]byte("heartbeat")); err != nil {
				return
			}
			//每隔1s
			time.Sleep(time.Second * 1)
		}
	}()

	//请求一直去读写信息
	for {
		if data, err = conn.ReadMessage(); err != nil {
			goto ERR
		}
		if err = conn.WriteMessage(data); err != nil {
			goto ERR
		}

	}
ERR:
	conn.Close()

}
func main() {
	//http标准库
	http.HandleFunc("/ws", wsHandler)
	http.ListenAndServe(":5555", nil)
}
