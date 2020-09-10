package main

import (
	"flag"
	"fmt"
)

var (
	intflag    *int
	boolflag   *bool
	stringflag *string
)

func init() {
	intflag = flag.Int("intflag", 0, "ini flag value")
	boolflag = flag.Bool("boolflag", false, "bool flag value")
	stringflag = flag.String("stringflag", "deault", "string flag value")
}
func main() {
	//解析 到具体的 变量中
	flag.Parse()

	fmt.Println("int flag:", *intflag)
	fmt.Println("bool flag:", *boolflag)
	fmt.Println("string flag:", *stringflag)
}
