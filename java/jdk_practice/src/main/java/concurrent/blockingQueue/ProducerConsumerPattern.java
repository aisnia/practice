package concurrent.pool.blockingQueue;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.LinkedBlockingQueue;

/**
 * @author xiaoqiang
 * @date 2020/9/4-16:50
 */
public class ProducerConsumerPattern {
    public static void main(String[] args) {
        //阻塞队列
        BlockingQueue sharedQueue = new LinkedBlockingQueue();

        //创建生产者与消费者线程
        Thread prodThread = new Thread(new Producer(sharedQueue));
        Thread consThread = new Thread(new Consumer(sharedQueue));

        //开启
        prodThread.start();
        consThread.start();
    }
}
