---
layout: post
title: Hadoop on Mac OS X (<strike>pre-installed</strike>)
tags: 
  - Hadoop
---

Still not a big fan of Virtual Machine (VM), I was trying to set up Hadoop framework on my Mac OS X Mavericks, so the cluster will be pseudo-distributed, single-node. I chose not to touch [Hadoop distributions](http://bit.ly/1erBmDT) to have some fun with installation in console. Instead of "playing hardcore", using package manager like [this](http://bit.ly/1EuteHH) with homebrew is very much recommended.
 
1 . Add a new user account (for security reason) and enable remote login access for it, both can be done in System Preferences, and make sure you have the latest java version.  
2 . Switch to the new user, generate a key and pass it to authorized_keys. This step sets up networking that enables SSH to localhost, and you can verify by typing `ssh localhost` in the terminal, which should return success.

```shell
su - hadoop
ssh-keygen -t rsa -P ""
cd .ssh
cat $HOME/.ssh/id_rsa.pub >> $HOME/.ssh/authorized_keys

```

3 . `curl -o` to get the latest Hadoop .tar file from [Hadoop.apache.org](http://hadoop.apache.org/)  
4 . Untar the file and change the ownership if necessary
5 . Edit hadoop configuration files (under etc/hadoop/): hadoop-env.sh, core-site.xml, hdfs-site.xml, mapred-site.xml, yarn-site.xml. Make what changes could be somewhat very tricky, and there are a hundred dozens of examples you can find online. If you happend to run into any trouble (like I did), please don't hesitate to reach out and I am willing to help.  
6 . <strike>Change hosts</strike> not necessary under this circumstance.

Once these steps have been done, you can `cd` into the hadoop directory, and you will find the bin/ directory and all the executables inside it. Start your cluster, and have fun.

This is a complete Hadoop cluster running on a single machine.