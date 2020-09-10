package simple_factory

import "fmt"

//API is interface
type API interface {
	Say(name string) string
}

//NewAPI return API interface by type
func NewAPI(t int) API {
	if t == 1 {
		return &hiAPI{}
	} else if t == 2 {
		return &helloAPI{}
	}
	return nil
}

//API one of implement
type hiAPI struct {
}

func (h *hiAPI) Say(name string) string {
	return fmt.Sprint("Hi ", name)
}

type helloAPI struct {
}

func (h *helloAPI) Say(name string) string {
	return fmt.Sprint("Hello ", name)
}
