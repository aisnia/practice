package arrays;

import java.util.*;


public class Solution {
    public static void main(String[] args) {
        System.out.println(new Solution().getMinScore(new int[]{0,1, 3, 5, 2}));
        //1 3 7
    }
    /**
     * 获取最小得分
     * @param gz int整型一维数组 瓜子堆的组成
     * @return int整型
     */
    public int getMinScore (int[] gz) {
        // write code here
        if(gz == null || gz.length == 0){
            return 0;
        }
        return getMinScore(gz,0,gz.length - 1);
    }
    
    private int getMinScore(int[] gz, int left,int right){
        //0个
        if(left > right){
            return 0;
        }
        //一个
        if(left == right){
            return gz[left];
        }
        //两个
        if(left == right - 1){
            return gz[left] + gz[right];
        }
        
        int mid = left + (right - left) / 2;
        int l = getMinScore(gz,left,mid);
        int r = getMinScore(gz,mid + 1,right);
        System.out.println(l + " " + r + " " + (l + r));
        return 2*(l + r);
    }
}