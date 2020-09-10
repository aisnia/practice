package arrays;

import java.util.Arrays;

/**
 * @author xiaoqiang
 * @date 2020/8/8-17:42
 * Arrays 常用方法
 */
public class ArraysDemo {
    public static void main(String[] args) {
        ArraysDemo ad = new ArraysDemo();
        ad.fill();
        ad.sort();
        ad.copy();
    }

    //填充fill
    private void fill() {
        int[] arr = new int[10];
        Arrays.fill(arr, 10);
        System.out.println(Arrays.toString(arr));
    }

    //排序sort, 并行排序parallelSort
    private void sort() {
        Integer[] arr = new Integer[]{1, 3, 5, 7, 9, 2, 4, 6, 8, 0};
        //默认是 升序，这里用比较器 降序
        Arrays.sort(arr, (i, j) -> (j - i));
        System.out.println(Arrays.toString(arr));
        Arrays.parallelSort(arr);
        System.out.println(Arrays.toString(arr));
    }

    private void copy(){
        int[] arr = new int[]{1,2,3,4,5};
        int[] copy = Arrays.copyOf(arr,arr.length);
        System.out.println(Arrays.toString(copy));

        //起始与结束位置， 左闭右开 3,4,5
        int[] copy2 = Arrays.copyOfRange(arr,2,arr.length);
        System.out.println(Arrays.toString(copy2));
    }
}
