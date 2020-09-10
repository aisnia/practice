package main

import (
	"flag"
	"fmt"
)

var (
	logLevel string
)

const (
	defaultLogLevel = "DEBUG"
	usage           = "set log level value"
)

func init() {
	flag.StringVar(&logLevel, "log_type", defaultLogLevel, usage)
	//短的方式
	flag.StringVar(&logLevel, "l", defaultLogLevel, usage+"(shorthand")

}
func main() {
	//解析,按顺序的会进行覆盖
	flag.Parse()
	fmt.Println("log level", logLevel)
}
