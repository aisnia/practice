package main

import (
	"flag"
	"fmt"
)

func main() {
	args := []string{"-intflag", "12", "-stringflag", "test"}

	var intflag int
	var boolflag bool
	var stringflag string

	//返回的是一个FlagSet对象
	fs := flag.NewFlagSet("MyFlagSet", flag.ContinueOnError)
	fs.IntVar(&intflag, "intflag", 0, "int flag value")
	fs.BoolVar(&boolflag, "boolflag", false, "bool flag value")
	fs.StringVar(&stringflag, "stringflag", "default", "string flag value")

	//命令行的模式 flag 为我们进行了包装的 CommandLine.Parse(os.Args[1:])
	//var CommandLine = NewFlagSet(os.Args[0], ExitOnError)
	flag.Parse()
	//解析 自己的字符串数组
	fs.Parse(args)
	fmt.Println("int flag:", intflag)
	fmt.Println("bool flag:", boolflag)
	fmt.Println("string flag:", stringflag)

}
