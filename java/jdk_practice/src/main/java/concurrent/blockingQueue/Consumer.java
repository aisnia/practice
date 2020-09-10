package concurrent.blockingQueue;

import java.util.concurrent.BlockingQueue;

/**
 * @author xiaoqiang
 * @date 2020/9/4-16:50
 */
public class Consumer implements Runnable {
    private final BlockingQueue sharedQueue;

    public Consumer(BlockingQueue sharedQueue) {
        this.sharedQueue = sharedQueue;
    }

    @Override
    public void run() {
        while (true) {
            try {
                System.out.println("Consumer:" + sharedQueue.take());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
