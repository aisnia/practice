package facade

import "fmt"

func NewAPI() API {
	return &apiImpl{a: NewAModuleAPI(), b: NewBModuleAPI()}
}

//API is facade interface of facade package
//最顶层的接口
type API interface {
	Test() string
}

//facade implements
//顶层接口的实现，其实又是两个接口
type apiImpl struct {
	a AModuleAPI
	b BModuleAPI
}

func (a *apiImpl) Test() string {
	aRet := a.a.TestA()
	bRet := a.b.TestB()
	return fmt.Sprintf("%s\n%s", aRet, bRet)
}

//AModuleAPI ...
//门面顶级接口下面的两个接口
type AModuleAPI interface {
	TestA() string
}

//BModuleAPI ...
type BModuleAPI interface {
	TestB() string
}

//两个具体实现
type aModuleImpl struct{}

func (*aModuleImpl) TestA() string {
	return "A module running"
}

//NewAModuleAPI return new AModuleAPI
func NewAModuleAPI() AModuleAPI {
	return &aModuleImpl{}
}

type bModuleImpl struct{}

func (*bModuleImpl) TestB() string {
	return "B module running"
}

//NewBModuleAPI return new BModuleAPI
func NewBModuleAPI() BModuleAPI {
	return &bModuleImpl{}
}
