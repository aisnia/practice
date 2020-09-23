package fileUpload

import (
	"github.com/julienschmidt/httprouter"
	"io"
	"io/ioutil"
	"log"
	"net/http"
)

const (
	MAX_UPLOAD_SIZE = 1024 * 1024 * 20 //50MB
)

func main() {
	r := RegisterHandlers()
	http.ListenAndServe(":8080", r)

}

//注册路由处理器
func RegisterHandlers() *httprouter.Router {
	router := httprouter.New()

	router.POST("/upload", uploadHandler)
	return router
}
func uploadHandler(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	//设置最大传输的字节数
	r.Body = http.MaxBytesReader(w, r.Body, MAX_UPLOAD_SIZE)

	if err := r.ParseMultipartForm(MAX_UPLOAD_SIZE); err != nil {
		log.Print("File is too big")
		return
	}

	file, headers, err := r.FormFile("file")
	if err != nil {
		log.Printf("Error when try to get file: %v", err)
		return
	}
	//获取文件上传的类型
	if headers.Header.Get("Content-Type") != "image/png" {
		log.Printf("只允许上传图片")
		return
	}

	data, err := ioutil.ReadAll(file)

	if err != nil {
		log.Printf("Read  File error: %v", err)
	}
	fn := headers.Filename
	err = ioutil.WriteFile("./video/"+fn, data, 0666)
	if err != nil {
		log.Printf("Write file error: %v", err)
		return
	}
	w.WriteHeader(http.StatusCreated)
	io.WriteString(w, "Uploaded successfully")
}
