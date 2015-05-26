---
layout: post
title: 朴素贝叶斯的概率理解
tags: 
  - Classification
  - Naive Bayes
  - Bayes Theorem
---
朴素贝叶斯可以说是机器学习算法里面最简单的一个了。然而简单并不代表它不强大，相反确是在业界最被广泛应用的算法之一，包括Google这样的巨头。朴素贝叶斯所建立的基础是最基本的[贝叶斯定理](http://bit.ly/1LAKbph)，通过将复杂的实际场景转变为可计算的算法。

除了表示实现简单，朴素两字包涵了另外一层意思：想法简单，因为算法本身“天真”地假设各个变量间的独立性。如果详细考究算法的明细，理解Bayesian  Networks是必不可少的。接下来对Bayes Networks做下一简单介绍：

贝叶斯网络是对多事件发生条件概率进行建模，又称为Belief Networks。就像人形成对某事的看法是建立在重重假设和条件的基础上，整理事件的概率将其按照**[条件独立](http://en.wikipedia.org/wiki/Conditional_independence)**依赖顺序透过有向网络表达出来。如下图两种情况：左边的事件C条件独立于A、B，而右边的则不是。

![](/media/img/bn1.png)

由事件A、B、C构成的如上贝叶斯网络，三个事件同时发生的概率，分别为：  
左：__P(A,B,C)=P(A)×P(B|A)×P(C|B)__  
右：__P(A,B,C)=P(A)×P(B|A)×P(C|A,B)__  

来个更具体的例子：某公司筹拍[“星际迷航”](http://movie.douban.com/subject/1889243/)，在电影公映前对其票房做预测，即  
_结论_事件X：全美票房是否超10亿美金？，其他条件事件分别为：

A：科幻题材影片  
B：电影长度超过两小时  
C：导演:克里斯托弗·诺兰  
D：演员:安妮·海瑟薇 
...  

一般说来结论事件和条件事件（A,B,C..）之间的条件独立关系并不确定，但是在朴素贝叶斯模型中一律假设条件独立性。
![](/media/img/bn2.png)

预测票房，需要计算（优化）：  
P(票房|类型:科幻, 长度>2hrs, 导演:诺兰, 演员:海瑟薇,...)

假设将样本数据分为票房（或未）超过十亿美金两类。根据贝叶斯定律，求解：  
P(票房>=十亿, 类型:科幻, 长度>2hrs, 导演:诺兰, 演员:海瑟薇,...)  
p(票房<十亿, 类型:科幻, 长度>2hrs, 导演:诺兰, 演员:海瑟薇,...)

根据朴素贝叶斯假设，以及贝叶斯网络条件独立的性质，可以对分拆求解以上概率，概率高的即为相应类别。以下为使用Python实现的朴素贝叶斯算法，通过用户购买物品预测用户性别。  

```python
# encoding: GBK

import sys
import math
import random

from collections import defaultdict

random.seed(12345)

class nb_model:
    def __init__(self):
        self.product_name_dict = defaultdict(lambda: [1,1]) #counting data of the form  {'product_name1':[maleCounts,femaleCounts], ...}
        # take into account additive smoothing by adding an extra 1
        self.product_count = [0,0] #contains # of products for male and female
        self.train_data = []
        self.test_data = []
     
    def splitData(self, textFile):
        with open(textFile,'r') as f:
            data = f.read().split('\n')[:-1]
        with open(textFile,'r') as f:
            observation_count = sum(1 for _ in f ) #can't use len(f) as f is an iterator. _ is a special variable name for throwaway variables, see Underscore in Python. can use len(f.readlines()), but need memory for additional list.           
        random.shuffle(data)
        up = int(observation_count*.6) #60% data as training data
        self.train_data = data[up:]
        self.test_data = data[:up] 
    
    def trainNBClassifier(self): 
        for line in self.train_data:
            row = line.split()
            gender = int(row[1])
            product_list = row[2].split(',')[:-1]
            
            for product in product_list: 
                self.product_name_dict[product][gender] += 1
                self.product_count[gender] += 1 

        for product_name in self.product_name_dict:
            for i in range(0,2):
                if self.product_name_dict[product_name][i] != 1:
                    self.product_name_dict[product_name][i] = math.log(self.product_name_dict[product_name][i]/float(len(self.train_data) + self.product_count[i]))
                    
    def Classify(self, product_vector):
        prob_per_label = {'0':0, '1':0} # store the final probability for each class
        for label in range(0,2):
            log_prob = 0
            for product in product_vector:
                if product in self.product_name_dict:
                    log_prob += self.product_name_dict[product][label]
                else:
                    log_prob += math.log(1/float(len(self.train_data)+ self.product_count[label]))
            prob_per_label[str(label)] = log_prob
        return max(prob_per_label, key = lambda classLabel: prob_per_label[classLabel])
      
    def testClassifier(self):
        qualified = 0
        correct = 0
        for line in self.train_data:
            row = line.split()
            vector = row[2].split(',')[:-1]
            if len(vector) >= 0: #filter data
                qualified += 1
                #print "classifier: " + self.Classify(vector) + " given: " + row[1]
                if self.Classify(vector) == row[1]:
                    correct += 1
        print 'out of', qualified, 'qualified examples', correct, 'are correctly classified'
        print correct/float(qualified)

if __name__=="__main__":
    model= nb_model()
    model.splitData(sys.argv[1])
    model.trainNBClassifier()
    model.testClassifier()
```
