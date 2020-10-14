class Student(object):
    # __init__ 是一个特殊方法用于在创建对象时进行初始化操作
    # 通过这个方法我们可以为学生绑定name和age两个属性
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def study(self, course_name):
        print('%s正在学习%s.' % (self.name, course_name))

    # PEP 8要求标识符的名字用全小写多个单词用下划线连接
    # 但是部分程序员和公司更倾向于使用驼峰命名法(驼峰标识)
    def watch_movie(self):
        if self.age < 18:
            print('%s只能看<<熊出没>>.' % self.name)
        else:
            print('%s可以看岛国大电影.' % self.name)


def main():
    # 创建对象
    stu1 = Student('xq', 18)
    # 给对象stu1发送study消息
    stu1.study("python")
    #发送watch
    stu1.watch_movie()
    stu2 = Student('xq2',15)
    stu2.study('Java')
    stu2.watch_movie()

if __name__ == "__main__":
    main()