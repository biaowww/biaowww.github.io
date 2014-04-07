---
layout: post
title: Hadoop on Mac OS X (<strike>pre-installed</strike>)
tags: 
  - Hadoop
---

Still not a big fan of Virtual Machine (VM), I was trying to set up Hadoop framework on my Mac OS X Mavericks. I chose not to touch [Hadoop distributions](https://www.youtube.com/watch?v=IvtyruO4dN4) to have some fun with installation in console. Instead of "playing hardcore",using package manager like [this](http://ragrawal.wordpress.com/2012/04/28/installing-hadoop-on-mac-osx-lion/) with homebrew is very much recommended.
 
1 . Add a new user account and enable remote login access for it, both can be done in System Preferences, and make sure you have the latest java version.  
2 . Switch to the new user, generate a key and pass it to authorized_keys

```shell
su - hadoop
ssh-keygen -t rsa -P ""
cd .ssh
cat $HOME/.ssh/id_rsa.pub >> $HOME/.ssh/authorized_keys

```

3 . `curl -o` to get the latest Hadoop .tar file from [Hadoop.apache.org](http://hadoop.apache.org/)  
4 . untar the file and change the ownership if necessary

Once these steps have been done, you can cd into the hadoop directory, and you will find the bin directory and all the executables inside it. This is a complete Hadoop cluster running on a single machine. 