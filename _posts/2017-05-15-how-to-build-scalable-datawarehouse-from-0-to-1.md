---
layout: post
title: 如何给一个非技术解释大数据架构（Semi-Pitch) 
tags: 
  - Datawarehouse
  - Big Data
  - Hadoop
---

大数据科技发展至今，技术上不断涌现新的突破，层出不穷的时髦名词闪瞎人眼。几年前大家还把Hadoop挂在嘴边，代表着前沿，代表着逼格，但是现在Hadoop已经成为行业标配，几乎不会再有人用其来炫耀。互联网是孕育大数据，发扬大数据，大数据人才最为集中的行业。那么其他行业呢，所谓的传统行业、政府，民营企业呢？他们憧憬着一切媒体中鼓吹的大数据的好处，近乎着迷地想要获得大数据的魔力，我们如何从技术的角度以最非技术的方式讲述大数据的实践呢？

对于大多数大数据的未来参与者来说，他们对于其的理解更多停留在统计层面。实际开展行动前，他们渴望更多的是实实在在的干货，一个可以执行的方案。他们看到腾讯在微信上给用户推送广告的“精准”，却不完全理解精准不仅来自计算，更要依赖整个大数据系统在架构和技术上的支持。大多传统行业，例如消费品、制造业，大多生存在供应链这个价值通道上，管理好这条价值链每一环才能最大化公司利益，那么我们就用供应链作比，尝试讲述大数据架构。

![](/media/img/data_chain.png)

# 一，采购（数据采集）：
首先，如果把数据比作原材料，我们需要从供应商采集这些原材料，公司从供应商那里购买原材料，而数据收集则来自公司实际业务。就像生产要保证原材料的质量，数据自身的准确性也决定了最终数据产品的品质。数据的采集通常需要队列化，并且需要考虑权限和隐私等多方面问题。在这一环节工作的主要是程序员和系统管理员（SA），需要其业务过硬，直接在一线执行和监督数据的采集。

#### 数据源：
-- 传感器  
-- 客户端（例如，每个人的手机）  
-- 人工输入  

# 二，仓储（数据存储）：
有了原材料，我们就需要管理好这些原材料，把数据存在库存中，就像把原材料放在仓库中，这就有了数据库的概念。就像不同类型仓储有着不同的实践和落地方式，我们将一整套工具（包括数据库）和数据存储解决方案抽象成[数据仓库](http://t.cn/RaWF5Yu)这个概念，数据使用目的的不同，决定了所需要的相应满足要求的数据仓库。

## 关系型数据库
如果我们对数据的响应速度和稳定有较高的要求，例如，用户登录前输入账号密码后需要系统在后端快速查询数据库并作出判断。想象在一个上千甚至上万平方米的仓库快速定位和提取某一件特定货品，需要在设计上做到多么详细的分类，记录，那么一个有着类似高性能的数据仓库也是如此，不同数据之间的关系需要满足并且支持快速的检索。我们称这样的业务场景为OLTP(Online Transaction Processing)，通常以[关系型数据库](http://t.cn/RLZMkRg)作为基础进行此场景下的数据仓库开发：在数据库选择上有价格昂贵的企业级数据库Oracle，也有任何一种三方开源数据库解决方案，例如Mysql、Postgres等。

## 非关系型数据库
但是，从另外一个数据使用角度触发，我们更希望通过对数据进行挖掘、分析，发现其中隐藏的信息。这样数据应用称之为OLAP（Online Analytical Processing），在数据量不大，数据类型不多，以及对处理速度要求不高时，相应的产品也可以使用关系型数据库作为开发。随着公司发展总有一天现有的仓库不再能满足生产需求，但是公司的现有库存无法灵活扩展且维护费高，给公司成本产生巨大压力。面临同样压力的互联网企业，催生出了完全不同于关系型数据的一系列数据库解决方案：非关系型数据库（统称NoSQL)。其中最主要的就是参照谷歌Big Table开发的开源大数据框架Hadoop，其主要原理为将数据分布式地存储在成千甚至上万个**便宜且小型**的计算机（服务器）集群上，需要时利用互联网通信，获取并聚合存储在不同服务器上的数据，并进行分布式计算。这样的存储方式对单个服务器性能的要求低，且有效的降低了成本并提高了系统的可扩展性（如果存储空间不足，只需不断添加服务器）。

这一步需要技术功底过硬数据工程师，能够根据不同需求，搭建和维护这样的存储平台。  

# 三，生产（数据计算）：
有了原材料，并且存储在了仓库中，相当于到了供应链的下游，那么剩下来就是生产了。方式从纯手工生产到自动化生产，不一而足。同样得，使用数据产生结果的方式也是千差万别。俗话说，工欲善其事必先利其器，在不同场景下选择合适的计算方法和框架也至关重要。

如果我们只是想一次性的计算一个模型，那么可以直接对提取的数据进行计算，不论是用SQL、Python，还是R；
但是在企业级应用中，由于数据量太大、计算次数频繁、结果实时性要求高，以上的方法已不再适用，需要我们根据需求选择并搭建下列计算框架：

#### 常见计算框架：
-- 分布式计算框架：MapReduce （衍生品，Hive/Mahout）  
-- 实时计算框架：Storm  
-- 平行集群式计算框架：Spark 

最后数据结果产出依靠的人才不仅要有出色的算法能力，还必须会用数据讲故事，能够用数据推动业务。