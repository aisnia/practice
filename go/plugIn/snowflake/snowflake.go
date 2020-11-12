package main

import (
	"errors"
	"fmt"
	"sync"
	"time"
)

const (
	//序列号 12bit 每毫秒可以产生 2的12次方 即4096个数
	numberBits uint8 = 12
	//工作集群序列 10bit 可以支持1024台机器
	workerBits uint8 = 10
	//最大的序列号值 0 向左移 numberBits位
	numberMax int64 = -1 ^ (-1 << numberBits)
	//最大的汲取序号
	wokrerMax int64 = -1 ^ (-1 << workerBits)
	//timeShift
	timeShift   uint8 = workerBits + numberBits
	workerShift uint8 = numberBits
	startTime   int64 = 1525705533000 // 如果在程序跑了一段时间修改了epoch这个值 可能会导致生成相同的ID
)

type Worker struct {
	mu        sync.Mutex
	timestamp int64
	workerId  int64
	number    int64
}

func NewWorker(wokerId int64) (*Worker, error) {
	if wokerId < 0 || wokerId > wokrerMax {
		return nil, errors.New("Worker ID excess of quantity")
	}
	//生成一个新的节点
	return &Worker{
		timestamp: 0,
		workerId:  wokerId,
		number:    0,
	}, nil
}

func (w *Worker) GetId() int64 {
	w.mu.Lock()
	defer w.mu.Unlock()
	//返回纳秒数
	now := time.Now().UnixNano() / 1e6

	//属于当前纳秒的里面的一起的 则序列号++, 超过了的话 则将 now 换成下一秒的 即阻塞在这里
	if w.timestamp == now {
		w.number++
		if w.number > numberMax {
			//当前的时间戳大于了最大的
			for now <= w.timestamp {
				now = time.Now().UnixNano() / 1e6
			}
		}
	} else {
		w.number = 0
		w.timestamp = now
	}
	//最高位整数符号位0  或   64位的时间左移 22 位  或   workerId    或 number
	ID := int64((now-startTime)<<timeShift | (w.workerId << workerShift) | (w.number))
	return ID
}
func main() {
	// 生成节点实例
	node, err := NewWorker(1)
	if err != nil {
		panic(err)
	}
	for {
		time.Sleep(time.Millisecond * 10)
		fmt.Println(node.GetId())
	}
}
