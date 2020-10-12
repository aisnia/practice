package main

import (
	"encoding/xml"
	"fmt"
	"io/ioutil"
)

type Server struct {
	ServerName string `json:"serverName"`
	ServerIP   string `json:"serverIP"`
}

type Servers struct {
	Name    xml.Name `xml:"servers"`
	Version int      `xml:"version"`
	Server  []Server `xml:"server"`
}

func main() {
	data, err := ioutil.ReadFile("./my.xml")
	if err != nil {
		fmt.Println("read file failed, err", err)
		return
	}
	var servers Servers
	err = xml.Unmarshal(data, &servers)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("xml:%#v\n", servers)

}
