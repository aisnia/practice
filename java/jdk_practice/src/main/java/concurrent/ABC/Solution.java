package concurrent.ABC;


public class Solution {
    public static void main(String[] args) {
        System.out.println(new Solution().getHouses(2, new int[]{-1, 4, 5, 2}));
    }
    /**
     * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
     * 返回能创建的房屋数
     *
     * @param t  int整型 要建的房屋面宽
     * @param xa int整型一维数组 已有房屋的值，其中 x0 a0 x1 a1 x2 a2 ... xi ai 就是所有房屋的坐标和房屋面宽。 其中坐标是有序的（由小到大）
     * @return int整型
     */
    public int getHouses(int t, int[] xa) {
        // write code here
        for (int i = 0; i < xa.length; i += 2) {
            int len = xa[i + 1];
            int p = xa[i];
            xa[i] = p - len / 2;
            xa[i + 1] = p + len / 2;
        }
        //左边和右边
        int res = 2;
        for (int i = 1; i < xa.length - 1; i += 2) {
            int len = xa[i + 1] - xa[i];
            res += len -  t + 1;
        }
        return res;
    }

}