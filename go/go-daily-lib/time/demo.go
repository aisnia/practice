package main

import (
	"fmt"
	"time"
)

func main() {
	t := time.Now()
	fmt.Printf("cuurent time:%v\n", t)

	year := t.Year()
	month := t.Month()
	day := t.Day()
	hour := t.Hour()
	minute := t.Minute()
	second := t.Second()
	fmt.Printf("%d-%02d-%02d %02d:%02d:%02d\n", year, month, day, hour, minute, second)

}
