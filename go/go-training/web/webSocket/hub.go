package main

import "encoding/json"

//初始化
var h = hub{
	c: make(map[*connection]bool),
	u: make(chan *connection),
	b: make(chan []byte),
	r: make(chan *connection),
}

//一个集合
//c 是否连接了
//u 在线的用户连接
//b 传输的数据
//r 将请求的连接
type hub struct {
	c map[*connection]bool
	b chan []byte
	r chan *connection
	u chan *connection
}

//启动
func (h *hub) run() {
	for {
		select {
		//回应新来的连接放入 hub 的 r里面
		//这里就会消耗了，设置为已连接，类型是握手
		case c := <-h.r:
			h.c[c] = true
			c.data.Ip = c.ws.RemoteAddr().String()
			c.data.Type = "handshake"
			c.data.UserList = user_list
			data_b, _ := json.Marshal(c.data)
			c.sc <- data_b
		case c := <-h.u:
			if _, ok := h.c[c]; ok {
				delete(h.c, c)
				close(c.sc)
			}
		case data := <-h.b:
			//遍历所有连接里面的数据
			for c := range h.c {
				select {
				case c.sc <- data:
				default:
					delete(h.c, c)
					close(c.sc)
				}
			}
		}
	}
}