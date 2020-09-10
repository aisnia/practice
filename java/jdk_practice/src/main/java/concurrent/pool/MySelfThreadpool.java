package concurrent.pool;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

/**
 * @author xiaoqiang
 * @date 2020/9/4-16:26
 */
public class MySelfThreadpool {
    //线程池默认线程数量
    private static final int WORK_NUM = 5;
    //默认处理的任务数量
    private static final int TASK_NUM = 100;

    //线程数量
    private int workNum;
    //任务数量
    private int taskNum;

    //保存线程的集合
    private final Set<WorkThread> workThreads;

    //阻塞有序队列存放任务
    private final BlockingQueue<Runnable> taskQueue;

    public MySelfThreadpool() {
        this(WORK_NUM, TASK_NUM);
    }

    public MySelfThreadpool(int workNum, int taskNum) {
        if (workNum <= 0) {
            workNum = WORK_NUM;
        }
        if (taskNum <= 0) {
            taskNum = TASK_NUM;
        }
        taskQueue = new ArrayBlockingQueue<>(taskNum);
        workThreads = new HashSet<>();
        this.workNum = workNum;
        this.taskNum = taskNum;
        //启动一定数量的线程数，从队列中获取任务处理
        for (int i = 0; i < workNum; i++) {
            WorkThread workThread = new WorkThread("thread_" + i);
            workThread.start();
            workThreads.add(workThread);
        }
    }

    public void execute(Runnable task) {
        try {
            taskQueue.put(task);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void destory() {
        System.out.println("ready close thread pool...");
        if (workThreads == null || workThreads.isEmpty()) {
            return;
        }
        for (WorkThread workThread : workThreads) {
            workThread.stopWork();
            workThread = null;
        }
        workThreads.clear();
    }

    /**
     * 线程池中的工作线程，直接从BlockingQueue中获取任务
     * 然后执行任务而已
     * blockQueue为阻塞队列
     */
    private class WorkThread extends Thread {
        public WorkThread(String name) {
            super(name);
        }

        @Override
        public void run() {
            //沒有被中断
            while (!interrupted()) {
                try {
                    Runnable runnable = taskQueue.take(); // 获取任务,没有则阻塞
                    if (runnable != null) {
                        System.out.println(getName() + "readly execute:" + runnable.toString());
                        runnable.run();
                    }
                } catch (InterruptedException e) {
                    //没有任务设置为中断的
                    interrupt();
                    e.printStackTrace();
                }

            }
        }

        public void stopWork() {
            interrupt();
        }
    }
}
