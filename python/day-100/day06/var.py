def foo():
    b = 'hello'
    global a
    a = 200
    # Python 中可以在函数的内部再定义函数
    def bar():
        c = True
        print(a)
        print(b)
        print(c)
    bar()


if __name__ == "__main__":
    a = 100
    foo()
    print(a)
