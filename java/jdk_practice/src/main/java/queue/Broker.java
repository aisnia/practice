package queue;

import java.util.concurrent.ArrayBlockingQueue;

/**
 * @author xiaoqiang
 * @date 2020/9/1-21:25
 */
public class Broker {
    //队列的最大容量
    public static final int MAX_SIZE = 3;

    //保存消息的容器
    private static ArrayBlockingQueue<String> messageQueue = new ArrayBlockingQueue<>(MAX_SIZE);

    //生产消息
    public static void produce(String msg) {
        if (messageQueue.offer(msg)) {
            System.out.println("投递消息:" + msg + "成功，当前暂存的消息数量是: " + messageQueue.size());
        } else {
            System.out.println("消息队列已达最大容量");
        }
    }

    public static String consume() {
        String msg = messageQueue.poll();
        if (msg != null) {
            System.out.println("消费成功:" + msg);
        } else {
            System.out.println("没有消息");
        }
        System.out.println("-----------------");
        return msg;
    }



}
