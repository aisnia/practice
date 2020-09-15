package main

import (
	"fmt"
	"math/rand"
)

//需求：
//计算一个数字的各个位数之和，例如数字123，结果为1+2+3=6
//随机生成数字进行计算

type Job struct {
	//job id
	Id int
	//计算的数字
	RandNum int
}
type Result struct {
	//任务
	Job *Job
	//结果sum
	Sum int
}

func main() {
	//两个通道，一个是存job，一个存结果
	jobChan := make(chan *Job, 128)
	resChan := make(chan *Result, 128)
	//创建工作池 workpool
	createPool(64, jobChan, resChan)

	//打印结果的协程
	go func(ch <-chan *Result) {
		for res := range ch {
			fmt.Printf("job id:%d randnum:%d reslut:%d\n", res.Job.Id, res.Job.RandNum, res.Sum)
		}
	}(resChan)

	//给输入添加 job
	var id int
	for {
		id++
		//生成随机数
		randNum := rand.Int()
		job := &Job{
			Id:      id,
			RandNum: randNum,
		}
		jobChan <- job
	}
}

func createPool(num int, jobChan <-chan *Job, resChan chan<- *Result) {
	//开启num 个协程
	for i := 0; i < num; i++ {
		go func(jobChan <-chan *Job, resChan chan<- *Result) {
			//遍历所有的任务
			for job := range jobChan {
				x := job.RandNum
				var sum int = 0
				for x != 0 {
					sum += x % 10
					x /= 10
				}
				//结果
				res := &Result{
					Job: job,
					Sum: sum,
				}
				resChan <- res
			}
		}(jobChan, resChan)
	}
}
