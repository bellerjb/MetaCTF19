#!/usr/bin/env python

def tribonacci(n):
    if n == 1:
        return 1
    if n == 2:
        return 1
    if n == 3:
        return 2
    return (tribonacci(n - 3) + tribonacci(n - 2) + tribonacci(n - 1))

print(tribonacci(int(input())))
