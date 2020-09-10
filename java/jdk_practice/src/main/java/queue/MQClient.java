package queue;

import java.io.*;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;

/**
 * @author xiaoqiang
 * @date 2020/9/1-21:40
 */
public class MQClient {
    public void produce(String message) throws IOException {
        Socket socket = new Socket(InetAddress.getLocalHost(), BrokerServer.SERVICE_PORT);

        PrintWriter out = new PrintWriter(new OutputStreamWriter(socket.getOutputStream()));
        out.println(message);
        out.flush();
    }

    //消费消息
    public String consume() throws IOException {
        Socket socket = new Socket(InetAddress.getLocalHost(), BrokerServer.SERVICE_PORT);
        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        PrintWriter out = new PrintWriter(socket.getOutputStream());

        //先向消息队列发送CONSUME表示消费
        out.println("CONSUME");
        out.flush();
        String msg = in.readLine();
        return msg;
    }
}
