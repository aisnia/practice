package main

import "log"

//ConnLimiter 定义一个结构体
type ConnLimiter struct {
	//当前的连接
	concurrentConn int
	//缓冲
	bucket chan int
}

//新建
func NewConnLimiter(cc int) *ConnLimiter {
	return &ConnLimiter{
		concurrentConn: cc,
		bucket:         make(chan int, cc),
	}
}

//获取通道里面的值
func (cl *ConnLimiter) GetConn() bool {
	//超出了则返回false
	if len(cl.bucket) >= cl.concurrentConn {
		log.Panicf("Reached the rate limitation.")
		return false
	}
	cl.bucket <- 1
	return true
}

//Release
func (cl *ConnLimiter) ReleaseConn() {
	c := <-cl.bucket
	log.Printf("New connction coming: %d", c)
}
