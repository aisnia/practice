package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"regexp"
)

var (
	reQQEmail = `(\d+)@qq.com`
)

//爬取邮箱
func GetEmail() {
	//1. 去网站拿数据
	resp, err := http.Get("https://tieba.baidu.com/p/6051076813?red_tag=1573533731")
	HandleError(err, "http.Get url")
	defer resp.Body.Close()

	//2. 读取页面的内容
	bytes, err := ioutil.ReadAll(resp.Body)
	HandleError(err, " ioutil.ReadAll")

	//字节转字符串
	str := string(bytes)
	fmt.Println(str)

	//3. 过滤数据，过滤qq邮箱
	re := regexp.MustCompile(reQQEmail)
	// -1 代表取全部
	res := re.FindAllStringSubmatch(str, -1)
	fmt.Println(res)

	//遍历结果
	for _, r := range res {
		fmt.Println("email", r[0])
		fmt.Println("qq", r[1])
	}
}

func HandleError(err error, why string) {
	if err != nil {
		fmt.Println(why)
	}
}

func main() {
	GetEmail()
}
