package design_pattern;

/**
 * @author xiaoqiang
 * @date 2020/8/27-10:48
 */
interface Operator {
    void SetA(int a);

    void SetB(int b);

    int Result();
}

interface OperactorFactory {
    Operator Create();
}

//基类抽象 实现 SetA，SetB的公共方法
abstract class BaseOperator implements Operator {
    int a;
    int b;

    @Override
    public void SetA(int a) {
        this.a = a;
    }

    @Override
    public void SetB(int b) {
        this.b = b;
    }
}

//加法
class PlusOperator extends BaseOperator {
    @Override
    public int Result() {
        return a + b;
    }
}

//工厂
class PlusOperatorFactory implements OperactorFactory {
    @Override
    public Operator Create() {
        return new PlusOperator();
    }
}

public class FactoryMethod {
    public static void main(String[] args) {
        //可以通过其他的加法之类的 根据策略模式返回对应的工厂
        OperactorFactory factory = new PlusOperatorFactory();
        Operator operator = factory.Create();
        operator.SetA(1);
        operator.SetB(2);
        System.out.println(operator.Result());
    }
}
