package factory_method

//工厂方法模式使用子类的方式延迟生成对象到子类中实现。
//Go中不存在继承 所以使用匿名组合来实现

//Operator 是被封装的实际类接口
type Operator interface {
	SetA(int)
	SetB(int)
	Result() int
}

//OperatorFactory 是工厂接口
type OperatorFactory interface {
	//创建一个
	Create() Operator
}

//OperatorBase 是Operator 接口实现的基类，封装公用方法 Set
type OperatorBase struct {
	a, b int
}

func (o *OperatorBase) SetA(a int) {
	o.a = a
}
func (o *OperatorBase) SetB(b int) {
	o.b = b
}

//加法, 匿名字段继承
type PlusOperator struct {
	*OperatorBase
}

func (p *PlusOperator) Result() int {
	return p.a + p.b
}

//PlusOperatorFactory 是 PlusOperator 的工厂类
type PlusOperatorFactory struct{}

//创建自己的一个复制
func (PlusOperatorFactory) Create() Operator {
	return &PlusOperator{
		OperatorBase: &OperatorBase{},
	}
}

type MinusOperator struct {
	*OperatorBase
}

//创建

//获取结果
func (m *MinusOperator) Result() int {
	//获取结果减法
	return m.a - m.b
}

type MinusOperatorFactory struct {
}

func (m MinusOperatorFactory) Create() Operator {
	return &MinusOperator{}
}
