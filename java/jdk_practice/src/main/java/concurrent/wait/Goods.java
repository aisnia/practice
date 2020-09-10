package concurrent.pool.wait;

/**
 * @author xiaoqiang
 * @date 2020/9/4-20:24
 */
public class Goods {
    public static void main(String[] args) {
        Goods goods = new Goods();
        Thread proThread = new Thread(new Producer(goods));
        Thread consThread = new Thread(new Consumer(goods));
        proThread.start();
        consThread.start();
    }
    private volatile int count;

    //最大
    private final int MAX_SIZE = 5;
    //生产
    public synchronized void product(){
        while(count > 5){
            System.out.println("产品满了");
            try {
                this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        count++;
        System.out.println(Thread.currentThread().getName() + ":"+ count);
        this.notifyAll();
    }

    public synchronized void consume(){
        while(count <= 0){
            System.out.println("产品没有了");
            try {
                this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        count--;
        System.out.println(Thread.currentThread().getName() + ":" + count);
    }
}
