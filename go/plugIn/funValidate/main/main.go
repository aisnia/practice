package main

import (
	"fmt"
	"net/http"
	"go/plugIn/funValidate"
)

//Auth 统一验证拦截器，每个接口都需要提前验证
func Auth(w http.ResponseWriter, req *http.Request) error {
	//这里添加的是你验证层的中间件，比如密码的验证
	fmt.Println("我是验证层面的信息")
	return nil
}


//Check 执行正常的业务逻辑
func Check(w http.ResponseWriter,req *http.Request){
	//正常的业务逻辑
	fmt.Println("执行check！")
}
func main() {
	//1、过滤器
	filter := common.NewFilter()
	//2、注册拦截器
	filter.RegisterFilterUri("/check",Auth)
	//3、启动服务
	http.HandleFunc("/check",filter.Handle(Check))

	//启动服务
	http.ListenAndServe(":8080",nil)
}
