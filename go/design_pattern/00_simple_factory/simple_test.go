package simple_factory

import (
	"fmt"
	"testing"
)

func TestType1(t *testing.T) {
	api := NewAPI(1)
	s := api.Say("Tom")
	fmt.Println(s)
	if s != "Hi Tom" {
		t.Fatal("Type1 test fail")
	}
}

func TestType2(t *testing.T) {
	api := NewAPI(2)
	s := api.Say("Tom")
	fmt.Println(s)
	if s != "Hello Tom" {
		t.Fatal("Type2 test fail")
	}
}
