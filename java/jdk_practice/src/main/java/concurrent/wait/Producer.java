package concurrent.wait;

/**
 * @author xiaoqiang
 * @date 2020/9/4-20:20
 */
public class Producer implements Runnable {

    private Goods goods;

    public Producer(Goods goods) {
        this.goods = goods;
    }

    @Override
    public void run() {
        for (int i = 0; i < 10; i++) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            goods.product();
        }
    }
}
