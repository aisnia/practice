package main

import (
	"errors"
	"fmt"
	"golang.org/x/crypto/bcrypt"
)

//加密
func GeneratePassword(userPassword string) ([]byte, error) {
	return bcrypt.GenerateFromPassword([]byte(userPassword), bcrypt.DefaultCost)
}

//ValidatePassword 密码比对
func ValidatePassword(userPassword string, hashed string) (ok bool, err error) {
	if err = bcrypt.CompareHashAndPassword([]byte(hashed), []byte(userPassword)); err != nil {
		return false, errors.New("密码错误")
	}
	return true, nil
}
func main() {
	userPassword := "123456"
	passwordbyte, err := GeneratePassword(userPassword)
	if err != nil {
		fmt.Println("加密出错了")
	}
	fmt.Println(passwordbyte)
	fmt.Println(string(passwordbyte))

	//模拟这个字符串是从数据库读取出来的 值是12345678
	mysql_password := "$2a$10$I8WaWXgiBw8j/IBejb3t/.s5NoOYLvoQzL6mIM2g3TEu4z0HenzqK"
	isOk, _ := ValidatePassword(userPassword, mysql_password)
	if !isOk {
		fmt.Println("密码错误")
		return
	}
	fmt.Println(isOk)
}
