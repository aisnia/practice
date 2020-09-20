package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	var (
		name    string
		age     int
		married bool
	)
	//fmt.Scan(&name,&age,&married)
	fmt.Printf("结果: name:%s age:%d marride:%t\n", name, age, married)

	//必须按照格式才能输入
	//fmt.Scanf("1:%s 2:%d 3:%t", &name, &age, &married)
	fmt.Printf("结果: name:%s age:%d marride:%t", name, age, married)

	//它在遇到换行时才停止扫描。
	//fmt.Scanln()

	//bufio.NewReader
	reader := bufio.NewReader(os.Stdin)
	str, _ := reader.ReadString('\n') // 读到换行
	str = strings.TrimSpace(str)
	fmt.Printf("%#v\n", str)

	var x int
	//Fscan系列
	fmt.Fscan(os.Stdin,&x)
	fmt.Println(x)
}
