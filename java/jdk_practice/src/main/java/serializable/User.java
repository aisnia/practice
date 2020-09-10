package serializable;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

/**
 * @author xiaoqiang
 * @date 2020/8/12-13:49
 */
public class User implements Serializable {
    public String name;

    public int age;

    public User() {
    }

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    //自定义序列化方式
    private void writeObject(ObjectOutputStream out) throws IOException {
        out.writeInt(age);
    }

    private void readObject(ObjectInputStream in) throws IOException{
        age = in.readInt();
    }
}
