package arrays;

import java.util.HashMap;

/**
 * @author xiaoqiang
 * @date 2020/9/1-22:45
 */
public class Demo {
    public static void main(String[] args) {
        String s = new String("hello");
        String s1 = new String("hello");
        System.out.println(s.hashCode() == s1.hashCode());
    }
}
