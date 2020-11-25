package main

import "fmt"

// 选项设计模式
// 问题：有一个结构体，定义一个函数，给结构体初始化

// 结构体
type Options struct {
	str1 string
	str2 string
	int1 int
	int2 int
}

// 声明一个函数类型的变量，用于传参
type Option func(opts *Options)

func InitOptions(opts ...Option) {
	options := &Options{}
	for _, opt := range opts {
		opt(options)
	}
	fmt.Printf("options:%#v\n", options)
}
//返回一个 Option 闭包 用来传参设值的方法
func WithStringOption1(str string) Option {
	return func(opts *Options) {
		opts.str1 = str
	}
}

func WithStringOption2(str string) Option {
	return func(opts *Options) {
		opts.str2 = str
	}
}
func WithStringOption3(int1 int) Option {
	return func(opts *Options) {
		opts.int1 = int1
	}
}
func WithStringOption4(int1 int) Option {
	return func(opts *Options) {
		opts.int2 = int1
	}
}
func main() {
	InitOptions(WithStringOption1("5lmh.com"), WithStringOption2("topgoer.com"), WithStringOption3(5), WithStringOption4(6))
}