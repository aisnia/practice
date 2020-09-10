package regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author xiaoqiang
 * @date 2020/8/8-22:25
 */
public class Practice {

    public static void main(String[] args) {
        Practice p = new Practice();
        p.p1();
        p.p2();
    }


    private void p1() {
        System.out.println("---------------基本匹配---------------");
        //基本匹配
        //正则表达式`123`匹配字符串`123`。它逐个字符的与输入的正则表达式做比较。
        final String regex = "The";
        final String string = "The fat cat sat on the mat.";

        Pattern p = Pattern.compile(regex);
        Matcher matcher = p.matcher(string);

        printMatcher(matcher, regex, string);
    }

    private void printMatcher(Matcher matcher, String r1, String string) {
        System.out.println("regex: " + r1 + " String: " + string);
        //找到所有的匹配的
        while (matcher.find()) {
            System.out.println("Full match: " + matcher.group(0));
            for (int i = 1; i < matcher.groupCount(); i++) {
                System.out.println("Group " + i + ": " + matcher.group(i));
            }
        }
    }

    private void p2() {
        //点 .
        String r1 = ".ar";
        System.out.println("---------------点. 匹配任意字符---------------");
        String string = "The car parked in the garage.";
        Pattern p1 = Pattern.compile(r1);
        Matcher m1 = p1.matcher(string);
        printMatcher(m1, r1, string);

        //字符集[]  匹配[]里面的任意一个
        String r2 = "[Tt]he";
        Pattern p2 = Pattern.compile(r2);
        System.out.println("---------------[] 里面的任意一个 --------------");
        Matcher m2 = p2.matcher(r2);
        printMatcher(m2, r2, string);


        String r3 = "ar[.]"; //注意如果是点则这里匹配的是 . 而不是任意字符了
        System.out.println("-----------------[.] 匹配的是点----------------------");
        Pattern p3 = Pattern.compile(r3);
        Matcher m3 = p2.matcher("A garage is a good place to park a car");
        printMatcher(m3, r3, "A garage is a good place to park a car");

        //否定字符集  ^
        String r4 = "[^c]ar";
        System.out.println("-----------------否定字符集 ^ ----------------------");
        Pattern p4 = Pattern.compile(r4);
        Matcher m4 = p4.matcher(string);
        printMatcher(m4, r4, string);
    }
}
