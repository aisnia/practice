package main

import (
	"fmt"
	"github.com/vmihailenco/msgpack"
	"io/ioutil"
	"math/rand"
)

type Person struct {
	Name string
	Age  int
	Sex  string
}

//二进制写入
func writeJson(fileName string) (err error) {
	var persons []*Person
	//数据
	for i := 0; i < 10; i++ {
		p := &Person{
			Name: fmt.Sprintf("name%d", i),
			Age:  rand.Intn(100),
			Sex:  "male",
		}
		persons = append(persons, p)
	}
	// 二进制json序列化
	data, err := msgpack.Marshal(persons)
	if err != nil {
		fmt.Println(err)
		return
	}
	err = ioutil.WriteFile(fileName, data, 0666)
	if err != nil {
		fmt.Println(err)
		return
	}
	return
}

//二进制读取
func readJson(fileName string) (err error) {
	var persons []*Person
	//读文件
	data, err := ioutil.ReadFile(fileName)
	if err != nil {
		fmt.Println(err)
		return
	}
	//反序列化
	err = msgpack.Unmarshal(data, &persons)
	if err != nil {
		fmt.Println(err)
		return
	}
	for _, v := range persons {
		fmt.Printf("%#v\n", v)
	}
	return
}
func main() {
	//err := writeJson("./person.dat")
	//if err != nil {
	//	fmt.Println(err)
	//	return
	//}
	err := readJson("./person.dat")
	if err != nil {
		fmt.Println(err)
		return
	}
}
