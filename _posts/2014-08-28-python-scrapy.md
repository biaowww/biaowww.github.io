---
layout: post
title: Scrapy爬虫心得
tags: 
  - web crawler
  - Python
  - Scrapy
---

我主要想写一下使用Scrapy实际抓取中文网页中会遇到的问题，主要是针对像我这样第一次使用爬虫framework这样的菜鸟。

关于Scrapy的发展史和原理，在这里我就不做赘述，官方[docs](http://doc.scrapy.org/)以及网上资料已经讲得非常详细了。

首先，在抓取中文网站信息的时候最为棘手的就是[码制问题](http://stackoverflow.com/questions/643694/utf-8-vs-unicode)。互联网上公认的地址码制是utf-8，而中文网站上的数据会在Python中以unicode码制被抓取下来。

因此在传递中文参数，导出中文数据时都要十分小心，否则很容易被计算机“误解”。我发现最简单的一个方法就是在爬虫程序加上header，约定python的编码为utf-8。

解析网页 vs. 使用Rules。Scrapy提供了简单易用的方法[Rule](http://doc.scrapy.org/en/latest/topics/spiders.html?highlight=rule#scrapy.contrib.spiders.CrawlSpider.rules)。

只需要一行程序，省去了写复杂判断语句去动态解析网页的功夫，这大大提升了爬虫程序的速度和效率。例如：`Rule(LinkExtractor(restrict_xpaths=('//p[@class="pager_space"]'), unique=True), follow=True)`提取满足条件的HTML下的链接并跟随。

还有需要注意的，在配置爬虫[setting](http://doc.scrapy.org/en/latest/topics/api.html?highlight=setting#module-scrapy.settings)文件时需要设置好的两个参数，一个是抓取速度：DOWNLOAD_DELAY，和抓取随机量：RANDOMIZE_DOWNLOAD_DELAY。

最后留下我在写爬虫时必用到的两个链接：

1.  测试正则式：[http://regexpal.com/](http://regexpal.com/)
2.  中文-unicode在线转换：[http://javawind.net/tools/native2ascii.jsp?action=transform](http://javawind.net/tools/native2ascii.jsp?action=transform)


