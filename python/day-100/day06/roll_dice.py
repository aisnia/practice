import random


def roll_dice(n=2):
    total = 0
    for i in range(2):
        total += random.randint(1, 6)
    return total


def add(a=0, b=0, c=0):
    return a + b + c


def addAny(*args):
    total = 0
    for val in args:
        total += val
    return total

def foo():
    print('hello, world!')


def foo():
    print('goodbye, world!')

if __name__ == "__main__":
    # 下面的代码会输出什么呢？
    foo()
    print(roll_dice())
    

    # 摇三颗色子
    print(roll_dice(3))

    print(add())
    print(add(1))
    print(add(1, 2))
    print(add(1, 2, 3))

    # 传递参数 指定参数名而可以不按照顺序
    print(add(c=50, a=100, b=50))

    print(addAny())
    print(addAny(1, 3, 5, 7, 9))
