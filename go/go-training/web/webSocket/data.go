package main

//连接的描述信息
//IP
//User 用户名
//From 谁发的
//Type 类型
//Content 内容
//UserList 用户的列表
type Data struct {
	Ip       string   `json:"ip"`
	User     string   `json:"user"`
	From     string   `json:"from"`
	Type     string   `json:"type"`
	Content  string   `json:"content"`
	UserList []string `json:"user_list"`
}