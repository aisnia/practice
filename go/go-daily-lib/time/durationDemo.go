package main

import (
	"fmt"
	"time"
)

func main() {
	now := time.Now()

	later := now.Add(time.Hour) // 当前时间加1小时后的时间
	fmt.Println(later)

	//求两个时间之间的差值： 通常用于 计算时间呢
	start := time.Now()
	for i := 0; i < 10000; i++ {

	}
	end := time.Now()
	fmt.Printf("时间,%d", end.Sub(start))


	//本方法和用t==u不同，这种方法还会比较地点和时区信息。
	later.Equal(end)

	//如果t代表的时间点在u之前，返回真；否则返回假。
	later.Before(end)  //false
	//如果t代表的时间点在u之后，返回真；否则返回假。
	later.After(end) //true
}
