package main

import (
	"fmt"
	"github.com/garyburd/redigo/redis"
)

func main() {
	c, err := redis.Dial("tcp", "localhost:6379")
	if err != nil {
		fmt.Println("conn redis falied,", err)
		return
	}
	//fmt.Println("redis conn success")
	//set(c, "abc", 1)
	fmt.Println(get(c, "abc"))
	defer c.Close()
}

func set(c redis.Conn, key string, val interface{}) {
	_, err := c.Do("Set", key, val)
	if err != nil {
		fmt.Println("err", err)
		return
	}
}
func get(c redis.Conn, key string) interface{} {
	r, err := redis.Int(c.Do("Get", key))

	if err != nil {
		fmt.Println("err,", err)
		return nil
	}
	return r
}

func MsetAndget(c redis.Conn) {
	_, err := c.Do("MSet", "abc", 100, "efg", 300)
	if err != nil {
		fmt.Println(err)
		return
	}

	r, err := redis.Ints(c.Do("MGet", "abc", "efg"))
	if err != nil {
		fmt.Println("get abc failed,", err)
		return
	}

	for _, v := range r {
		fmt.Println(v)
	}
}

func expire(c redis.Conn) {
	_, err := c.Do("expire", "abc", 10)
	if err != nil {
		fmt.Println(err)
		return
	}
}
