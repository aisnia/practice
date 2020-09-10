import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

import static com.sun.deploy.perf.DeployPerfUtil.put;

/**
 * @author xiaoqiang
 * @date 2020/8/12-22:23
 */
public class Main {


    public static void main(String[] args) {

    }


    public static int getAndRemoveLast(Stack<Integer> stack) {
        int res = stack.pop();
        if (stack.isEmpty()) {
            return res;
        } else {
            int last = getAndRemoveLast(stack);
            stack.push(res);
            return last;
        }
    }

    private static void reverse(Stack<Integer> stack) {
        if (stack.isEmpty()) {
            return;
        }
        //获取
        int i = getAndRemoveLast(stack);
        reverse(stack);
        stack.push(i);
    }
}
