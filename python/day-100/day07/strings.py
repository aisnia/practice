if __name__ == "__main__":
    # 重复3次
    s1 = 'hello ' * 3
    print(s1)
    s2 = 'world'
    s1 += s2
    print(s1)
    # 判断是否存在
    print('ll' in s1)
    print('good' in s1)
    str2 = 'abc123456'
    # 从字符串中取出指定位置的字符
    print(str2[2])  # c
    # 字符串的切片,左闭右开
    print(str2[2:5]) # c12
    print(str2[2:]) # c123456
    print(str2[2::2]) # c246    步长为2的
    print(str2[::2]) # ac246
    # 倒序
    print(str2[::-1]) # 654321cba
    print(str2[-3 : -1])
