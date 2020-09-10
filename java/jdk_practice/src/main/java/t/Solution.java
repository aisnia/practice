package t;

import java.util.*;


public class Solution {
    public static void main(String[] args) {
        System.out.println(new Solution().getMinLen("abcabcabc"));
    }

    /**
     * 计算t的最小长度
     *
     * @param str string字符串 输入的字符串
     * @return int整型
     */
    public int getMinLen(String str) {
        // write code here
        //找到循环的子串
        int len = 0;
        int i = str.length() - 1;
        for (; i >= 0; i--) {
            len = isok(str, i);
            if (len != -1) {
                break;
            }
        }
        return len - (str.length() - i);
    }

    private int isok(String str, int len) {
        if (len <= 1) {
            return len;
        }
        int mid = len / 2;
        if (str.substring(0, mid).equals(str.substring(mid, len))) {
            int x = isok(str.substring(0, mid), str.substring(0, mid).length());
            return x == -1 ? str.substring(0, mid).length() : x;
        }
        return -1;
    }
}