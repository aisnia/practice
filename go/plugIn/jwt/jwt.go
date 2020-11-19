package main

import (
	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"
	"io"
	"log"
	"net/http"
	"time"
)

const (
	//token 的秘钥
	APP_KEY = "www.topgoer.com"
)

func main() {
	//获取token的Handler
	http.HandleFunc("/token", TokenHandler)

	http.Handle("/", AuthMiddleware(http.HandlerFunc(ExampleHandler2)))
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}

func TokenHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	//解析表单
	r.ParseForm()

	//获取用户名和密码
	username := r.Form.Get("username")
	password := r.Form.Get("password")

	//进行验证， 一般与数据库交互呢
	if username != "xiaoqiang" || password != "123456" {
		//没有权限
		w.WriteHeader(http.StatusUnauthorized)
		io.WriteString(w, `{"error":"invalid_credentials"}`)
		return
	}

	//如果验证成功 则弄一个过期的时间, 并且针对这个用户生成一个特定的 token

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user": username,
		"exp":  time.Now().Add(time.Hour * time.Duration(1)).Unix(),
		"iat":  time.Now().Unix(),
	})
	tokenString, err := token.SignedString([]byte(APP_KEY))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		io.WriteString(w, `{"error":"token_generation_failed"}`)
		return
	}

	io.WriteString(w, `{"token":"`+tokenString+`"}`)
	return
}

//AuthMiddleware是我们用来检查令牌是否有效的中间件。如果返回401状态无效，则返回给客户。
func AuthMiddleware(next http.Handler) http.Handler {
	if len(APP_KEY) == 0 {
		log.Fatal("HTTP server unable to start, expected an APP_KEY for JWT auth")
	}
	jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			return []byte(APP_KEY), nil
		},
		SigningMethod: jwt.SigningMethodHS256,
	})
	return jwtMiddleware.Handler(next)
}

func ExampleHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	io.WriteString(w, `{"status":"ok"}`)
}
func ExampleHandler2(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	io.WriteString(w, `{"status":"ok22222"}`)
}
