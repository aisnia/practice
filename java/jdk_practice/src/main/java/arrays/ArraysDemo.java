import java.util.Arrays;

/**
 * @author xiaoqiang
 * @date 2020/8/8-17:42
 * Arrays 常用方法
 */
public class ArraysDemo {
    public static void main(String[] args) {
        ArraysDemo ad = new ArraysDemo();

    }

    //填充fill
    private void fill(){
        int[] arr = new int[10];
        Arrays.fill(arr,10);
        Arrays.toString(arr)
    }

    //排序sort
    private void sort(){
        int[] arr = new int[]{1,3,5,7,9,2,4,6,8,0};
        //默认是 升序，这里用比较器 降序
        Arrays.sort(arr,(Integer i,Integer j) -> (j - i))
    }
}
