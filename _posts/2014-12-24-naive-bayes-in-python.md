---
layout: post
title: 朴素贝叶斯的概率理解
tags: 
  - Naive Bayes
  - Bayes Theorem
  - Algorithm
  - Machine Learning
---

朴素贝叶斯可以说是机器学习算法里面最简单的一个了。然而简单并不代表它不强大，相反确是在业界最被广泛应用的算法之一，包括Google这样的巨头。朴素贝叶斯所建立的基础是最基本的[贝叶斯定理](http://www.baidu.com/link?url=C64sesUA_dic89qYUZqFhoenz07Ft5x7jOS7-Lw_rENZDUCbW8rf5rR88WSj5oi6nPetchWOg2D1RaZh5dXKNa)，通过将复杂的实际场景转变为可计算的算法。

除了表示实现简单，朴素两字包涵了另外一层意思：想法简单，因为算法本身“天真”地假设各个变量间的独立性。如果详细考究算法的明细，理解Bayesian  Networks是必不可少的。接下来对Bayes Networks做下一简单介绍：

贝叶斯网络是对多事件发生条件概率进行建模，又称为Belief Networks。就像人形成对某事的看法是建立在重重假设和条件的基础上，整理事件的概率将其按照**[条件独立](http://en.wikipedia.org/wiki/Conditional_independence)**依赖顺序透过有向网络表达出来。如下图两种情况：左边的事件C条件独立于A、B，而右边的则不是。

![](/media/img/bn1.png)

由事件A、B、C构成的如上贝叶斯网络，三个事件同时发生的概率，分别为：  
左：__P(A,B,C)=P(A)×P(B|A)×P(C|B)__  
右：__P(A,B,C)=P(A)×P(B|A)×P(C|A,B)__  

来个更具体的例子：某公司筹拍[“星际迷航”](http://movie.douban.com/subject/1889243/)，在电影公映前对其票房做预测，即  
_结论_事件X：全美票房是否超10亿美金？，其他_条件_事件分别为：

A：科幻类题材影片  
B：电影长度超过两小时  
C：导演克里斯托弗·诺兰  
D：女主角安妮·海瑟薇 
...  

一般说来结论事件和条件事件（A,B,C..）之间的条件独立关系并不确定，但是在朴素贝叶斯模型中一律假设条件独立性。
![](/media/img/bn2.png)

预测票房，需要计算：  
P(结论事件=票房超1B|A=科幻,B=长度>2hrs,C=克里斯托弗·诺兰,D=安妮·海瑟薇,...)    
但是根据贝叶斯定律，并运用朴素贝叶斯算法，等同于优化求解：  
P(X,A,B,C,D...)=P(X|A)×P(X|B)×P(X|C)×P(X|D)...