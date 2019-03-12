#!/usr/bin/env python

import httplib
import re

class Tree(object):
    def __init__(self):
        self.children = []
        self.found = []
        self.data = None

def request(url):
    conn = httplib.HTTPConnection('localhost:8080')
    headers = {
        'host': 'localhost:8080',
        'upgrade-insecure-requests': '1'
        }
    conn.request('GET', url, headers=headers)
    response = conn.getresponse()
    return response

def build(url):
    req = request(url)
    reqs = req.status
    body = req.read()
    if reqs == 302:
        _, n = map(int, re.findall(r'\d+', body[0:26]))
        found = 1
        redirect = req.getheader('Location')
        tree = Tree()
        tree.data = body.decode('utf-8')
        tree.found.append(redirect)
        tree.children.append(build(redirect))
        while(found < n):
            req = request(url)
            redirect = req.getheader('Location')
            if redirect not in tree.found:
                tree.found.append(redirect)
                tree.children.append(build(redirect))
                found = found + 1
        return tree
    else:
        if reqs == 200:
            tree = Tree()
            tree.data = body.decode('utf-8')
            return tree

def read(tree):
    if tree.data != None and \
       tree.data != 'You\'ve reached the end of the world.' and \
       tree.data.find('Redirecting') == -1:
            print tree.data
    for child in tree.children:
        read(child)

root = build('/28158099611aecef2b4405dc75061cb6a217b5d4e25ad3ad256ae0f5e89cdac3')
read(root)
