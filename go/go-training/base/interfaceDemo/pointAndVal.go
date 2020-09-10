package main

import "fmt"

type People interface {
	Speak(string) string
}

type Student struct {
}

func (s *Student) Speak(think string) (talk string) {
	if think == "sb" {
		talk = "你是个大帅逼"
	} else {
		talk = "你好"
	}
	return
}

func main() {
	//var p People = Student{} 错误
	var p People = &Student{}
	think := "sb"
	fmt.Println(p.Speak(think))
}
