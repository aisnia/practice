package main

import (
	"bytes"
	"fmt"
	"github.com/PuerkitoBio/goquery"
	"io"
	"io/ioutil"
	"net/http"
	"net/url"
	"strconv"
	"strings"
)

var dataStr string

func checkRedirect(req *http.Request, via []*http.Request) error {
	return http.ErrUseLastResponse
}
func getJSESSIONID(resp *http.Response) (cookie *http.Cookie) {
	for _, c := range resp.Cookies() {
		if c.Name == "JSESSIONID" {
			cookie = &http.Cookie{Name: c.Name, Value: c.Value}
			//fmt.Println(cookie)
			break
		}
	}
	return
}

//输入账号密码，返回encode
func input() (userAccount, userPassword, semester string) {
	fmt.Println("请输入你的账号")
	fmt.Scanln(&userAccount)
	fmt.Println("请输入你的密码")
	fmt.Scanln(&userPassword)

	fmt.Println("请输入你想要查询的学期：如2019-2020")
	fmt.Scanln(&semester)
	return
}

func getDataStr() (string, string, *http.Cookie) {
	//第一步 login 获取加密的字符串
	resp, err := http.PostForm("http://xk.csust.edu.cn/Logon.do?method=logon&flag=sess", nil)
	if err != nil {
		panic(err)
	}
	b, _ := ioutil.ReadAll(resp.Body)
	dataStr := string(b) //"X20l86562r0e0D2S27wnXd3i1Z06ArN4t5n231e#11113111213233313323"
	scode := strings.Split(dataStr, "#")[0]
	sxh := strings.Split(dataStr, "#")[1]
	return scode, sxh, getJSESSIONID(resp)
}

func getSecret(userAccount, userPassword, scode, sxh string) string {
	var encode bytes.Buffer
	code := userAccount + "%%%" + userPassword
	for i := 0; i < len(code); i++ {
		if i < 20 {
			r, _ := strconv.Atoi(sxh[i : i+1])
			encode.WriteString(code[i:i+1] + scode[0:r])
			scode = scode[r:]
		} else {
			encode.WriteString(code[i:])
			i = len(code)
		}
	}
	return encode.String()
}
func login(userAccount, encode string, cookie *http.Cookie) (URL *url.URL, cookie2, cookie3 *http.Cookie) {
	//登录请求
	params := url.Values{}
	params.Set("userAccount", userAccount)
	params.Set("userPassword", "")
	params.Set("encoded", encode)
	client := &http.Client{
		CheckRedirect: checkRedirect,
	}
	req, _ := http.NewRequest("POST", "http://xk.csust.edu.cn/Logon.do?method=logon", strings.NewReader(params.Encode()))
	req.AddCookie(cookie)
	req.Header.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9;charset=UTF-8")
	req.Header.Set("Accept-Encoding", "gzip, deflate")
	req.Header.Set("Cache-Control", "max-age=0")
	req.Header.Set("Connection", "keep-alive")
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Referer", "http://xk.csust.edu.cn/Logon.do?method=logon")
	req.Header.Set("Origin", "http://xk.csust.edu.cn")
	req.Header.Set("Upgrade-Insecure-Requests", "1")
	req.Header.Set("Host", "xk.csust.edu.cn")
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36")
	resp, err := client.Do(req)
	//resp, err = http.Post("http://10.255.252.1:80/Logon.do?method=logon", "application/x-www-form-urlencoded", strings.NewReader(params.Encode()))
	if err != nil {
		fmt.Println("Logon failed")
		panic(err)
	}
	//fmt.Println(resp.StatusCode)
	//fmt.Println(resp.Header)
	//fmt.Println(resp.Body)
	//if resp.StatusCode != http.StatusFound {
	//	b, _ := ioutil.ReadAll(resp.Body)
	//	err = ioutil.WriteFile("./501.html", b, 0666)
	//	fmt.Println("over", string(b))
	//	return
	//}
	URL, err = resp.Location()
	cookie2 = getJSESSIONID(resp)
	//fmt.Println(URL)
	if err != nil {
		fmt.Println("账号或者密码错误")
		panic(err)
	}
	//主页
	//resp, err = http.Get(url.String())
	req, _ = http.NewRequest("GET", URL.String(), nil)
	req.AddCookie(cookie2)
	resp, err = client.Do(req)
	//fmt.Println(resp.StatusCode)
	//fmt.Println(resp.Header)
	//fmt.Println(resp.Body)
	if err != nil {
		fmt.Println("location failed")
		panic(err)
	}
	URL, err = resp.Location()
	cookie3 = getJSESSIONID(resp)
	req, _ = http.NewRequest("GET", URL.String(), nil)
	req.AddCookie(cookie3)
	resp, err = client.Do(req)
	//fmt.Println(resp.StatusCode)
	//fmt.Println(resp.Header)
	//fmt.Println(resp.Body)
	//b, _ = ioutil.ReadAll(resp.Body)
	//ioutil.WriteFile("./index.html",b,0666)
	//
	//if err != nil {
	//	fmt.Println(err)
	//}
	//fmt.Println(string(b))
	return URL, cookie2, cookie3

}

//登录后跳转到成绩查询
func cjcxList(URL *url.URL, cookie1, cookie2 *http.Cookie, semester string) (float64, float64) {
	client := &http.Client{
		CheckRedirect: checkRedirect,
	}
	//成绩查询
	params := url.Values{}
	params.Set("kksj", semester)
	params.Set("kcxz", "")
	params.Set("kcmc", "")
	params.Set("xsfs", "all")
	params.Set("fxkc", "2")
	req, _ := http.NewRequest("POST", "http://xk.csust.edu.cn/jsxsd/kscj/cjcx_list", strings.NewReader(params.Encode()))
	//fmt.Println(cookie1.Name, cookie1.Value)
	//fmt.Println(cookie2.Name, cookie2.Value)
	req.Header.Set("Cookie", cookie1.String()+";"+cookie2.String())
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	//fmt.Println(cookie2.String()+";"+cookie3.String())
	//req.AddCookie(cookie2)
	//req.AddCookie(cookie3)
	//fmt.Println(req.Cookies())
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("request failed")
		panic(err)
	}
	return parseHTML(resp.Body)
	//fmt.Println(resp.StatusCode)
	//fmt.Println(resp.Header)
	//fmt.Println(resp.Body)
	//b, _ = ioutil.ReadAll(resp.Body)
	//fmt.Println(string(b))
	//ioutil.WriteFile("./list.html", b, 0666)

}
var num = 1
func parseHTML(body io.ReadCloser) (float64, float64) {
	doc, err := goquery.NewDocumentFromReader(body)
	if err != nil {
		panic(err)
	}
	//for _, n := range doc.Nodes {
	//	fmt.Println(n.Type)
	//	fmt.Println(n.Data)
	//}
	// 成绩 * 学分之和
	var sum float64 = 0.0
	//// 学分之和
	var scope float64 = 0.0
	fmt.Printf("%s%15s%15s%15s%15s\n", "序号", "课程名称", "分数", "学分", "绩点")

	doc.Find("#dataList").Find("tr").Each(func(i int, s *goquery.Selection) {
		if i != 0 {

			//fmt.Println(i,s.Nodes)
			//fmt.Println(s.Text())
			//fmt.Println(i)

			//n := strings.TrimSpace(s.Find("td:nth-child(1)").Text()) //序号 1
			//fmt.Println("2", strings.TrimSpace(s.Find("td:nth-child(2)").Text()))        //学期
			//fmt.Println("3", strings.TrimSpace(s.Find("td:nth-child(3)").Text()))        //编号

			name := strings.TrimSpace(s.Find("td:nth-child(4)").Text()) //名称 4
			//fmt.Println("6", strings.TrimSpace(s.Find("td:nth-child(6)").Text()))

			//分数

			x, err := strconv.ParseFloat(strings.TrimSpace(s.Find("td:nth-child(6)").Text()), 64)
			if err != nil {
				panic(err)
			}

			//fmt.Println("成绩:", x) //成绩
			//fmt.Println("7", strings.TrimSpace(s.Find("td:nth-child(7)").Text()))
			//fmt.Println("8", strings.TrimSpace(s.Find("td:nth-child(8)").Text()))
			//fmt.Println("9", strings.TrimSpace(s.Find("td:nth-child(9)").Text()))

			//学分
			sc, err := strconv.ParseFloat(strings.TrimSpace(s.Find("td:nth-child(9)").Text()), 64)
			//fmt.Println("学分:", sc) //学分
			//fmt.Println("10", strings.TrimSpace(s.Find("td:nth-child(10)").Text()))        //学时

			//绩点
			point := strings.TrimSpace(s.Find("td:nth-child(11)").Text()) //绩点
			//s.Find("td").Each(func(i int, s2 *goquery.Selection){
			//	fmt.Println(s2.Text())
			fmt.Printf("%d%15s%15.2f%15.2f%15s\n", num, name, x, sc, point)
			num++
			//	//fmt.Printf("%s\t%s\t%s\t%s\n",s2.Get(0),s2.Get(1),s2.Get(3),s2.Get(5))
			//})
			sum += x * sc
			scope += sc
		}
	})
	return sum, scope
}
func main() {
	//第一步 login 获取加密的字符串
	scode, sxh, cookie1 := getDataStr()
	//第二步登录输入账号密码
	//账号密码
	//userAccount = "201716080311"
	//userPassword = "qq1350017101"
	userAccount, userPassword, semester := input()
	encode := getSecret(userAccount, userPassword, scode, sxh)
	URL, cookie2, cookie3 := login(userAccount, encode, cookie1)
	sum,scope := cjcxList(URL, cookie2, cookie3, semester+"-1")
	x,y := cjcxList(URL, cookie2, cookie3, semester+"-2")
	sum += x
	scope += y

	fmt.Printf("成绩:%.2f\n",sum)
	fmt.Printf("终合:%.2f\n终测(占70%%):%.2f\n",(sum/scope),(sum/scope) * 0.7)
}
