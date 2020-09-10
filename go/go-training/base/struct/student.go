package main

import "fmt"

type student struct {
	name string
	age  int
}

func main() {
	m := make(map[string]*student)
	stus := []student{
		{name: "pprof.cn", age: 18},
		{name: "测试", age: 23},
		{name: "博客", age: 28},
	}

	fmt.Printf("%#v\n",stus)
	fmt.Printf("%#v, %p\n",&stus,&stus)
	for _, stu := range stus {
		//注意这里的stu是一个拷贝， 新建立了一个内存空间 地址是 0xc000004600 并且一直是复用的
		//所以 map[]的value是 *student 指针，指向的都是 0xc000004600 故都是最好一个 博客了
		fmt.Printf("%#v, %p\n",&stu,&stu)
		//m[stu.name] = &stu
	}
	for k, v := range m {
		fmt.Println(k, "=>", v.name)
	}
}
