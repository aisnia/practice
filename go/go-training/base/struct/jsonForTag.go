package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID     int    `json:"id"` //通过指定tag实现json序列化该字段时的key
	Gender string //json序列化是默认使用字段名作为key
	name   string //私有不能被json包访问
}

func main() {
	u1 := User{
		ID:     1,
		Gender: "女",
		name:   "小雨",
	}
	str, err := json.Marshal(u1)
	if err != nil {
		fmt.Println("json Marshal failed")
		return
	}
	fmt.Printf("json : %s", str)

}
