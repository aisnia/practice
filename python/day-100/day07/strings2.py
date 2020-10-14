if __name__ == "__main__":
    str1 = 'hello,world'
    # 长度
    print(len(str1))
    # 首字母大写的拷贝
    print(str1.capitalize())
    # 每个单词首字母大写
    print(str1.title())
    # 全部大写
    print(str1.upper())
    # 子串的所在位置 find
    print(str1.find('or'))  # 8
    print(str1.find('shit'))  # -1
    # 与find类似但找不到子串时会引发异常
    # print(str1.index('or'))
    # print(str1.index('shit'))

    # 检查字符串是否以指定的字符串开头
    print(str1.startswith('He'))  # False
    print(str1.startswith('hel'))  # True
    # 检查字符串是否以指定的字符串结尾
    print(str1.endswith('!'))  # True
