package code.main828;

import com.sun.org.apache.xpath.internal.operations.String;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author xiaoqiang
 * @date 2020/8/28-16:31
 */
public class Main {
    public static void main(String[] args) {
        int[] arr = new int[]{1, 3, 5, 7, 9, 2, 4, 6, 8, 10};
        Main main = new Main();
        main.temp = new int[arr.length];
        main.mergeSort(arr, 0, arr.length - 1);
        System.out.println(Arrays.toString(arr));
    }

    private int[] temp;

    private void mergeSort(int[] arr, int left, int right) {
        //两个数则
        if (left >= right) {
            return;
        }
        List<Integer> res = new ArrayList<>();


        //分别对左右两边进行排序
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }

    private void merge(int[] arr, int left, int mid, int right) {
        //相当于两个数组，范围如下 都是闭的
        //left ~ mid
        //mid + 1 ~ right
        int i = left, j = mid + 1;
        int index = left;
        while (i <= mid || j <= right) {
            if (i > mid) {
                temp[index] = arr[j++];
            } else if (j > right) {
                temp[index] = arr[i++];
            } else if (arr[i] > arr[j]) {
                temp[index] = arr[j++];
            } else {
                temp[index] = arr[i++];
            }
            index++;
        }
        //temp 是临时的数组,然后放入真实数组里面
        for (i = left; i <= right; i++) {
            arr[i] = temp[i];
        }
    }
}
