package queue;

import java.io.IOException;

/**
 * @author xiaoqiang
 * @date 2020/9/1-22:15
 */
public class ProduceClient {
    public static void main(String[] args) {
        MQClient client = new MQClient();
        try {
            client.produce("hello");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
