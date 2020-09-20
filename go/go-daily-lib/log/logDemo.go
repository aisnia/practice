package main

import "log"

func main() {
	log.Println("日志")
	v := "普通的"
	log.Printf("这时一条%s的日志", v)
	//log.Fatalln("这是一条会触发fatal的日志。")
	//log.Panicln("这是一条会触发panic的日志。")

	log.SetFlags(log.Llongfile | log.Lmicroseconds | log.Ldate)
	log.Println("这是一条很普通的日志。")
}
