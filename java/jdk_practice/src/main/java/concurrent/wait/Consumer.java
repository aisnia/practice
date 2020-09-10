package concurrent.pool.wait;

/**
 * @author xiaoqiang
 * @date 2020/9/4-20:30
 */
public class Consumer implements  Runnable {
    private Goods goods;

    public Consumer(Goods goods) {
        this.goods = goods;
    }

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            goods.consume();
        }
    }

}
