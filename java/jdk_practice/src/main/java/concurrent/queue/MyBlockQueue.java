package concurrent.queue;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * @author xiaoqiang
 * @date 2020/9/4-22:14
 */
public class MyBlockQueue {
    private List<Integer> container = new ArrayList<>();
    private volatile int size;
    private volatile int capacity;
    private Lock lock = new ReentrantLock();

    //Condition
    private final Condition isNull = lock.newCondition();
    private final Condition isFull = lock.newCondition();

    public MyBlockQueue(int capacity) {
        this.capacity = capacity;
    }

    /**
     * 添加方法
     */
    public void add(int data) {
        try {
            lock.lock();
            while (size >= capacity) {
                System.out.println("阻塞队列满了");
                isFull.await();
            }
            size++;
            container.add(data);
            isNull.signal();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }

    //取出元素
    public int take() {
        int res = -1;
        try {
            lock.lock();
            while (size <= 0) {
                System.out.println("阻塞队列空了");
                isNull.await();
            }
            size--;
            //移除队首
            res = container.remove(0);
            isFull.signal();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
        return res;
    }
}
