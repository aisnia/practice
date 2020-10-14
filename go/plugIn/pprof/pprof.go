package main

import (
	"flag"
	"net/http"
	"log"
	"sync"
	"time"
	_ "net/http/pprof"
)

func Counter(wg *sync.WaitGroup) {
	time.Sleep(time.Second)
	var counter int
	for i := 0; i < 1000000; i++ {
		counter++
	}
	wg.Done()

}
func main() {
	//解析
	flag.Parse()
	//远程获取pprof的数据
	go func() {
		log.Println(http.ListenAndServe(":8080", nil))
	}()
	var wg sync.WaitGroup
	wg.Add(10)
	for i := 0; i < 10; i++ {
		go Counter(&wg)
	}
	wg.Wait()

	// sleep 10mins, 在程序退出之前可以查看性能参数.
	time.Sleep(60 * time.Second)
}
