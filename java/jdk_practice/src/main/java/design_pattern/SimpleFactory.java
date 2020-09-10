package design_pattern;

/**
 * @author xiaoqiang
 * @date 2020/8/27-10:22
 */
interface API {
    String say(String name);
}

class HiAPI implements API {
    @Override
    public String say(String name) {
        return "hi " + name;
    }
}

class HelloAPI implements API {
    @Override
    public String say(String name) {
        return "Hello " + name;
    }
}

public class SimpleFactory {

    public static API getAPI(int type) {
        if (type == 1) {
            return new HiAPI();
        } else if (type == 2) {
            return new HelloAPI();
        } else {
            return null;
        }
    }

    public static void main(String[] args) {
        System.out.println(SimpleFactory.getAPI(1).say("Tom"));
        System.out.println(SimpleFactory.getAPI(2).say("Tom"));
    }
}
