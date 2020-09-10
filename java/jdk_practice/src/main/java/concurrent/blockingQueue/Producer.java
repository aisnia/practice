package concurrent.blockingQueue;

import java.util.concurrent.BlockingQueue;

/**
 * @author xiaoqiang
 * @date 2020/9/4-16:50
 */
public class Producer implements Runnable {
    private final BlockingQueue sharedQueue;

    public Producer(BlockingQueue sharedQueue) {
        this.sharedQueue = sharedQueue;
    }

    @Override
    public void run() {
        try {
            for (int i = 0; i < 10; i++) {
                System.out.println("Producer 生产" + i);
                sharedQueue.put(i);
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }
}
