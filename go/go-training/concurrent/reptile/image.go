package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"sync"
	"time"
)

func HandleError(err error, why string) {
	if err != nil {
		fmt.Println(why)
	}
}

//下载图片传入的链接 与 文件名称路径
func DownloadFile(url string, filename string) bool {
	resp, err := http.Get(url)
	HandleError(err, "http.Get")
	defer resp.Body.Close()

	bytes, err := ioutil.ReadAll(resp.Body)
	HandleError(err, "ioutil.ReadAll")

	filename = "D:/Desktop/img/" + filename
	//写出数据
	err = ioutil.WriteFile(filename, bytes, 0666)
	if err != nil {
		return false
	} else {
		return true
	}
}

// 并发爬思路：
// 1.初始化数据管道
// 2.爬虫写出：26个协程向管道中添加图片链接
// 3.任务统计协程：检查26个任务是否都完成，完成则关闭数据管道
// 4.下载协程：从管道里读取链接并下载

var (
	//存放图片链接的管道
	chanImageLinks chan string
	wg             sync.WaitGroup
	//用于监控协程
	chanTask chan string
	reImage  = `https?://[^"]+?(\.((jpg)|(png)|(jpeg)|(gif)|(bmp)))`
)

func main() {
	//1.初始化管道
	chanImageLinks = make(chan string, 1000000)
	chanTask = make(chan string, 26)
	//2. 爬虫协程
	for i := 0; i < 26; i++ {
		wg.Add(1)
		//26页
		go getImgUrls("https://www.bizhizu.cn/shouji/tag-%E5%8F%AF%E7%88%B1/" + strconv.Itoa(i) + ".html")
	}
	// 3.任务统计协程，统计26个任务是否都完成，完成则关闭管道
	wg.Add(1)
	go checkOk()

	//下载协程，从管道中获取 链接并且下载
	for i := 0; i < 5; i++ {
		wg.Add(1)
		go DownloadImg()
	}
	wg.Wait()
}

func DownloadImg() {
	for url := range chanImageLinks {
		filename := GetFilenameFromUrl(url)
		ok := DownloadFile(url, filename)
		if ok {
			fmt.Printf("%s 下载成功\n", filename)
		} else {
			fmt.Printf("%s 下载失败\n", filename)
		}
	}
}

func GetFilenameFromUrl(url string) (filename string) {
	// 返回最后一个/的位置
	lastIndex := strings.LastIndex(url, "/")
	// 切出来
	filename = url[lastIndex+1:]
	// 时间戳解决重名
	timePrefix := strconv.Itoa(int(time.Now().UnixNano()))
	filename = timePrefix + "_" + filename
	return
}
func checkOk() {
	var count int
	for {
		url := <-chanTask
		fmt.Printf("%s 完成了爬取的任务\n", url)
		count++
		if count == 26 {
			close(chanImageLinks)
			break
		}
	}
	wg.Done()
}
func getImgUrls(url string) {
	//获取所有 图片的连接
	urls := getImgs(url)

	for _, url := range urls {
		//放入图片连接的通道
		chanImageLinks <- url
	}
	// 标识当前协程完成
	// 每完成一个任务，写一条数据
	// 用于监控协程知道已经完成了几个任务
	chanTask <- url
	wg.Done()
}

func getImgs(url string) (urls []string) {
	pageStr := GetPage(url)
	re := regexp.MustCompile(reImage)
	results := re.FindAllStringSubmatch(pageStr, -1)
	fmt.Printf("共找到%d条结果\n", len(results))
	for _, res := range results {
		url := res[0]
		urls = append(urls, url)
	}
	return
}

func GetPage(url string) string {

	resp, err := http.Get(url)
	HandleError(err, "http.Get")
	defer resp.Body.Close()

	//读取页面内容
	bytes, err := ioutil.ReadAll(resp.Body)

	HandleError(err, "resp.Body")

	return string(bytes)

}
