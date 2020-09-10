package main

import (
	"flag"
	"fmt"
	"time"
)

var (
	//文案
	str string
	//周期
	period time.Duration
)

func init() {
	flag.StringVar(&str, "str", "hello world", "文案")
	flag.DurationVar(&period, "period", 1*time.Second, "周期时间")
}
func main() {
	flag.Parse()
	for {
		select {
		case <-time.After(period):
			fmt.Println(str)
		}
	}
}
