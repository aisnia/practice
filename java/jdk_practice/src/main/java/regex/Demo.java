package regex;

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * @author xiaoqiang
 * @date 2020/8/8-18:50
 */
public class Demo {

    public void usePattern() {
        Pattern p = Pattern.compile("//w+");
        System.out.println(p);

        p = Pattern.compile("\\d+");
        String[] strs = p.split("我的QQ是:456456我的电话是:0532214我的邮箱是:aaa@aaa.com");
        System.out.println(Arrays.toString(strs));

        System.out.println(Pattern.matches("\\d+", "123"));
        System.out.println(Pattern.matches("\\d+", "123aa"));
        System.out.println(Pattern.matches("\\d+", "12aa3"));
    }

    private void useMatchers() {
        Pattern p = Pattern.compile("\\d+");
        Matcher m = p.matcher("22bb33");
        System.out.println(m.matches());

        Matcher m2 = p.matcher("2223");
        System.out.println(m2.matches());


        m = p.matcher("22bb33");
        System.out.println(m.lookingAt());
        m2 = p.matcher("aa2233");
        System.out.println(m2.lookingAt());


        m = p.matcher("22bb23");
        System.out.println(m.find());

        m2 = p.matcher("aa2223");
        System.out.println(m2.find());

        Matcher m3 = p.matcher("aa2223bb");
        m3.find();

        Matcher m4 = p.matcher("aabb");
        m4.find();//返回false


        m = p.matcher("aaa2223bb");
        m.find();//匹配2223
        m.start();//返回3


        m = p.matcher("aaa2223bb");
        m.find();//匹配2223
        m.end();//返回7,返回的是2223后的索引号


        m = p.matcher("aaa2223bb");
        m.find();//匹配2223
        m.group();//返回2223


        p = Pattern.compile("([a-z]+)(\\d+)"); //()表示分组，意义是括号内是一个整体
        m = p.matcher("aaa2223bb");
        m.find();   //匹配aaa2223
        m.groupCount();   //返回2,因为有2组
        m.start(1);   //返回0 返回第一组匹配到的子字符串在字符串中的索引号
        m.start(2);   //返回3
        m.end(1);   //返回3 返回第一组匹配到的子字符串的最后一个字符在字符串中的索引位置.
        m.end(2);   //返回7
        m.group(1);   //返回aaa,返回第一组匹配到的子字符串
        m.group(2);   //返回2223,返回第二组匹配到的子字符串
    }


}
