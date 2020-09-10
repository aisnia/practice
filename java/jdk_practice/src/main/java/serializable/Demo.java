package serializable;

import java.io.*;

/**
 * @author xiaoqiang
 * @date 2020/8/12-13:49
 */
public class Demo {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        User user = new User("xiaoqiang", 20);
        //序列化
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream(new File("D:\\Desktop\\user.txt")));
        objectOutputStream.writeObject(user);

        //反序列化
        ObjectInputStream objectInputStream = new ObjectInputStream(new FileInputStream("D:\\Desktop\\user.txt"));
        Object o = objectInputStream.readObject();
        System.out.println(o);
        System.out.println(o == user);  //false


    }
}
