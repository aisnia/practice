package main

import "fmt"

func main() {
	//insert()
	//Select()
	//update()
}

//插入
func insert() {
	res, err := Db.Exec("insert into person(username,sex,email) values(?,?,?)", "小强", "男", "1350017101@qq.com")
	if err != nil {
		fmt.Println("exce  2 ", err)
		return
	}

	//插入的 返回的自增id
	id, err := res.LastInsertId()
	if err != nil {
		fmt.Println("exce failed 3", err)
		return
	}
	fmt.Println("insert sucess:", id)
}

//查找
func Select() {
	var person []Person
	err := Db.Select(&person, "select user_id, username, sex, email from person where user_id=?", 2)
	if err != nil {
		fmt.Println("select err", err)
		return
	}
	for _, p := range person {
		fmt.Println(p)
	}
}

func update() {
	res, err := Db.Exec("update person set username = ? where user_id = ?", "陈晓强", 2)
	if err != nil {
		fmt.Println("exec failed ", err)
		return
	}
	//影响的行数
	row, err := res.RowsAffected()
	if err != nil {
		fmt.Println("rows failed", err)
	}
	fmt.Println("update sucess:", row)

}
func delete() {
	res, err := Db.Exec("delete from person where user_id=?", 1)
	if err != nil {
		fmt.Println("exec failed, ", err)
		return
	}

	row, err := res.RowsAffected()
	if err != nil {
		fmt.Println("rows failed, ", err)
	}

	fmt.Println("delete succ: ", row)
}
