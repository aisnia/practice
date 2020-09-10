package concurrent.lock;

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

/**
 * @author xiaoqiang
 * @date 2020/9/4-20:35
 */
public class Goods {
    private int count;

    private ReentrantLock lock = new ReentrantLock();
    private Condition condition = lock.newCondition();

    private final int MAX_SIZE = 5;

    public void product() {
        try {
            lock.lock();
            if (count >= MAX_SIZE) {
                System.out.println("队列满了");
                try {
                    condition.await();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            condition.signalAll();
        } finally {
            lock.unlock();
        }
    }

    public void consume() {

        try {
            lock.lock();
            while (count <= 0) {
                System.out.println("队列没有了");
                try {
                    condition.await();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        } finally {
            lock.unlock();
        }
    }

}
