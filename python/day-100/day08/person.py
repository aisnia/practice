    class Person(object):
        def __init__(self, name, age):
            self._name = name
            self._age = age

        # 访问器getter方法
        @property
        def name(self):
            return self._name
        # 访问器的setter方法

        @property
        def age(self):
            return self._age

        @age.setter
        def age(self, age):
            self._age = age

        def paly(self):
            if self._age <= 16:
                print('%s玩飞行棋' % self._name)
            else:
                print('%s玩斗地主' % self._name)

    def main():
        person = Person('小强', 16)
        person.paly()

        person._age = 20
        person.paly()

        # person.name = '晓强'    # AttributeError: can't set attribute
        

    if __name__ == "__main__":
        main()

