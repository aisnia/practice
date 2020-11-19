package impl

import (
	"errors"
	"sync"
	"github.com/gorilla/websocket"
)

type Connection struct {
	//WebSocket的连接
	wsConn *websocket.Conn
	//读取 websocket的channel
	inChan chan []byte
	//给websocket写东西的channel
	outChan chan []byte
	//结束的信号
	closeChan chan byte
	//锁,保证并发
	mutex sync.Mutex
	//是否为Close状态
	isClosed bool
}

//读取websocket信息
func (c *Connection) ReadMessage() (data []byte, err error) {
	select {
	case data = <-c.inChan:
	case <-c.closeChan:
		err = errors.New("connection is closed")
	}
	return
}

//写入websocket的信息
func (c *Connection) WriteMessage(data []byte) (err error) {
	select {
	case c.outChan <- data:
	case <-c.closeChan:
		err = errors.New("connection is closed")
	}
	return
}
func (c *Connection) Close() (err error) {
	//线程安全的Close,可重入
	c.wsConn.Close()
	defer c.mutex.Unlock()

	//只执行一次
	c.mutex.Lock()
	if !c.isClosed {
		close(c.closeChan)
		c.isClosed = true
	}
	return
}

//初始化websocket的长连接
func InitConnection(wsConn *websocket.Conn) (conn *Connection, err error) {
	conn = &Connection{
		wsConn:    wsConn,
		inChan:    make(chan []byte, 1000),
		outChan:   make(chan []byte, 1000),
		closeChan: make(chan byte, 1),
	}
	//启动读协程
	go conn.readLoop()
	//启动写协程
	go conn.writeLoop()
	return
}

func (c *Connection) readLoop() {
	var (
		data []byte
		err  error
	)
	for {
		//出现错误则Close
		if _, data, err = c.wsConn.ReadMessage(); err != nil {
			goto ERR
		}
		//如果数据量过大阻塞在这里,等待inChan有空闲的位置！
		select {
		case c.inChan <- data:
		case <-c.closeChan:
			//关闭的时候
			goto ERR
		}
	}
ERR:
	c.Close()
}

func (c *Connection) writeLoop() {
	var (
		data []byte
		err  error
	)
	for {
		//将我们要读的数据 放入 data 然后写入到websocket中
		select {
		case data = <-c.outChan:
		case <-c.closeChan:
			goto ERR

		}
		if err = c.wsConn.WriteMessage(websocket.TextMessage, data); err != nil {
			goto ERR
		}
	}
ERR:
	c.Close()
}
