import java.util.ArrayList;
import java.util.List;

class Solution {
    public int[][] findContinuousSequence(int target) {
        //滑动窗口
        int i = 1, j = 2;
        List<int[]> list = new ArrayList<>();
        int sum = i + j;
        while(j < target){
            if(sum > target){
                sum -= i;
                i++;
            }else if(sum < target){
                j++;
                sum += j;
            }else{
                int[] arr = new int[j - i + 1];
                int index = 0;
                for(int k = i; k <= j; k++){
                    arr[index] = k;
                }
                sum -= i;
                i++;
                j++;
                sum += j;
                list.add(arr);
            }
        }
        int[][] res = new int[list.size()][];
        for(i = 0; i < res.length; i++){
            res[i] = list.get(i);
        }
        return res;
    }
}