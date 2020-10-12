def fac(num):
    res = 1
    for i in range(1, num + 1):
        res *= i
    return res


if __name__ == "__main__":
    # x1 + x2 + x3 + x4 = 8 有多少种方案
    # 实际上就是 将8个苹果分成四组每组至少一个苹果有多少种方案 概率论的问题了
    # 因为苹果没有区别,就看作组合 有七个空,插入三块“挡板”就可分成四组,于是... C7 取 3
    # 即 Cm 取 n =  M! / N!(M - N)!
    m = int(input('m = '))
    n = int(input('n = '))
    fm = fac(m)
    fn = fac(n)
    fm_n = fac(m - n)
    print(fm // fn // fm_n)
