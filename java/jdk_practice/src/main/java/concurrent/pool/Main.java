package concurrent.pool;

/**
 * @author xiaoqiang
 * @date 2020/9/4-16:40
 */
public class Main {
    public static void main(String[] args) {
        MySelfThreadpool pool = new MySelfThreadpool(3,2);
        pool.execute(() -> {
           for(int i = 0; i < 100; i++){
               System.out.print(i + " ");
           }
        });
        System.out.println();
        pool.execute(() -> {
            for(int i = 0; i < 100; i++){
                System.out.print(i + " ");
            }
        });
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        pool.destory();
    }
}
