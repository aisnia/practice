package main

import (
	"bufio"
	"flag"
	"fmt"
	"io"
	"os"
)

func main() {
	flag.Parse()
	if flag.NArg() == 0 {
		//没有则是标准输入
		cat(bufio.NewReader(os.Stdin))
	} else {
		for i := 0; i < flag.NArg(); i++ {
			f, err := os.Open(flag.Arg(i))
			if err != nil {
				fmt.Printf("reading from %s failed, err:%v\n", flag.Arg(i), err)
				continue
			}
			cat(bufio.NewReader(f))
		}
	}

}

func cat(reader *bufio.Reader) {
	for {
		buf, err := reader.ReadBytes('\n')
		if err == io.EOF {
			break
		}
		if err != nil {
			fmt.Println("read file err", err)
			return
		}
		fmt.Fprint(os.Stdout, buf)
	}
}
