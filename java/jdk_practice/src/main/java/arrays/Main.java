package arrays;

import java.util.Arrays;

/**
 * @author xiaoqiang
 * @date 2020/8/31-19:10
 */
public class Main {
    public static void main(String[] args) {
        System.out.println(new Main().deal(new int[]{12, 3, 45, 6}));
    }

    private String deal(int[] nums) {
        String[] res = new String[nums.length];
        for (int i = 0; i < nums.length; i++) {
            res[i] = "" + nums[i];
        }

        Arrays.sort(res, (String s1, String s2) -> (s1.compareTo(s2)));
        StringBuilder sb = new StringBuilder();
        for (String s : res) {
            sb.append(s);
        }
        return "" + sb;
    }

}
