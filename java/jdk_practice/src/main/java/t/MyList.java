package t;

import oop.Man;
import oop.Person;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xiaoqiang
 * @date 2020/8/8-18:15
 */
//泛型类 extends 可以放String，  下限 T是String或者String的子类
//泛型擦除 存的是 String
//List 存的是 Object对象
public class MyList<T extends String> {

    T t;

    public void setT(T t) {
        this.t = t;
    }

    //泛型方法, 与类的T 无关
    public <K> void func(K k) {
        System.out.println(k);
    }

    public void func() {
        System.out.println(t.toLowerCase());
    }


    public static void main(String[] args) {
        MyList<String> list = new MyList<>();
        String s = "Hello,World";
        list.func(s);

        list.setT(s);
        list.func();
    }
}
