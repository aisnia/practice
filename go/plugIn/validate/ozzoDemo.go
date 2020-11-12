package main

import (
	"fmt"
	"github.com/go-ozzo/ozzo-validation/v3"
	"github.com/go-ozzo/ozzo-validation/v3/is"
)

func main() {
	data := "exmaple"
	err := validation.Validate(data,
		validation.Required,   // not empty
		validation.Length(5, 100),  // length between 5 and 100
		is.URL)   // is a valid URL

	fmt.Println(err)
	//Output
	//must be a valid URL
}
