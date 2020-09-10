package oop;

/**
 * @author xiaoqiang
 * @date 2020/8/8-18:10
 */
public interface Interface {
    //接口，默认是 public的
    void func();

    //可以有默认的实现    不能用 static 修饰，但是可以使用static的变量
    default  void print() {
        System.out.println("hello" + s);
    }

    //默认是 static final 修饰的变量
    public static final String s = "world";
}
