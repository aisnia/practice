package common

import "net/http"

//声明一个新的数据类型 (函数类型)
type FilterHandle func(rw http.ResponseWriter, req *http.Request) error

//拦截器的数据结构
type Filter struct {
	//用来存储需要拦截的URL
	filterMap map[string]FilterHandle
}

//Filter的New函数
func NewFilter() *Filter {
	return &Filter{filterMap: make(map[string]FilterHandle)}
}

//注册拦截器
func (f *Filter) RegisterFilterUri(uri string, handler FilterHandle) {
	f.filterMap[uri] = handler
}

//根据uri获取拦截器
func (f *Filter) GetFilterHandle(uri string) FilterHandle {
	return f.filterMap[uri]
}

//声明新的函数类型
type WebHandler func(rw http.ResponseWriter, req *http.Request)

//执行拦截器，返回函数的类型  即一个闭包
func (f *Filter) Handle(web WebHandler) func(rw http.ResponseWriter, req *http.Request) {
	return func(rw http.ResponseWriter, req *http.Request) {
		for path, handle := range f.filterMap {
			if path == req.RequestURI {
				//执行拦截器的逻辑
				err := handle(rw, req)
				if err != nil {
					rw.Write([]byte(err.Error()))
					return
				}
			}
		}
		//拦截后执行正常的 业务逻辑
		web(rw, req)
	}
}

func main() {
}
