#! /bin/bash

### FIRST 第一板块

# echo "set PATH" 设置脚本执行环境变量，文件位置，模组路径等

JF=${JF_INPUT:-/opt/software/jdk-8u161-linux-x64.tar.gz}
HF=${HF_INPUT:-/opt/software/hadoop-3.1.3.tar.gz}
MP=${MP_INPUT:-/opt/module}
PASSWORD=${password_INPUT:-123456}
NODE1IP=${NODE1IP_INPUT:-192.168.152.82}
NODE2IP=${NODE2IP_INPUT:-192.168.152.102}
NODE3IP=${NODE3IP_INPUT:-192.168.152.122}

echo "hadoop本地自动安装脚本 v0.1 ——by Goro"
sleep 1

# read -p "输入Java压缩包绝对路径（默认值$JF）：" JF_INPUT
# read -p "输入Hadoop压缩包绝对路径（默认值$HF）： " HF_INPUT
read -p "输入安装路径（默认值$MP）： " MP_INPUT
read -p "输入ssh密码（默认值$PASSWORD）： " PASSWORD_INPUT
read -p "输入master IP（默认值$NODE1IP）： " NODE1IP_INPUT
read -p "输入slave1 IP（默认值$NODE2IP）： " NODE2IP_INPUT
read -p "输入slave2 IP（默认值$NODE3IP）： " NODE3IP_INPUT

while true; do
    # 读取用户输入的关键词
    echo "请输入要查找的Java压缩包文件名："
    read JF_IN

    # 使用 find 命令查找文件，并将找到的第一个文件的路径保存到变量中
    JF_PATH=$(find $MP -type f -name "*$JF_IN*" -print | head -n 1)

    # 检查是否找到了文件
    if [ -z "$JF_PATH" ]; then
        echo "没有找到匹配的文件，请重新输入关键词。"
    else
        # 输出找到的文件的完整路径
        echo "找到的文件的完整路径："
        find . -type f -name "*$$JF_PATH*" -print

        # 输出保存到变量中的文件路径
        JF="$JF_PATH"
        echo "保存到变量中的文件路径：$JF"
        break
    fi
done

while true; do
    echo "请输入要查找的Hadoop压缩包文件名："
    read HF_IN
    HF_PATH=$(find $MP -type f -name "*$HF_IN*" -print | head -n 1)
    if [ -z "$HF_PATH" ]; then
        echo "没有找到匹配的文件，请重新输入关键词。"
    else
        echo "找到的文件的完整路径："
        find . -type f -name "*$$HF_PATH*" -print
        HF="$HF_PATH"
        echo "文件路径：$HF"
        break
    fi
done

# echo "set host 设置主机名以及配置host文件" 
hostnamectl set-hostname master

cat>>"/etc/hosts"<<EOF
$NODE1IP master
$NODE2IP slave1
$NODE3IP slave2
EOF

# echo "set ssh key 配置ssh key进行自动连接" 

ssh-keygen -t rsa -N '' -f /root/.ssh/id_rsa -q

ssh-copy-id master
ssh-copy-id slave1
ssh-copy-id slave2

# echo "set java && hadoop" 解压配置jdk以及hadoop

mkdir $MP
mkdir $MP/jdk
tar -xvzf $JF -C $MP/jdk --strip-components 1

mkdir $MP/hadoop
tar -xvzf $HF -C $MP/hadoop --strip-components 1

# echo "set PATH 设置jdk以及hadoop的环境变量" 

cat>>"/etc/profile"<<EOF
export JAVA_HOME=$MP/jdk
export PATH=\$JAVA_HOME/bin:\$PATH
export HADOOP_HOME=$MP/hadoop
export PATH=\$PATH:\$HADOOP_HOME/bin:\$HADOOP_HOME/sbin

export HDFS_DATANODE_USER=root
export HDFS_NAMENODE_USER=root
export HDFS_SECONDARYNAMENODE_USER=root
export YARN_RESOURCEMANAGER_USER=root
export YARN_NODEMANAGER_USER=root
EOF


# echo "check install 查看安装情况"

source /etc/profile
java -version
hadoop version

# echo "set slave 设置其他slave节点的主机配置文件" 

scp -r /etc/profile slave1:/etc/
scp -r /etc/profile slave2:/etc/
scp -r /etc/hosts slave1:/etc/
scp -r /etc/hosts slave2:/etc/

# echo "set ssh slave ssh连接设置其他节点"
  
ssh root@slave1 <<EOF
hostnamectl set-hostname slave1
mkdir $MP

ssh-keygen -t rsa -n '' -f  ~/.ssh/id_rsa
ssh-copy-id master
ssh-copy-id slave1
ssh-copy-id slave2
EOF

ssh root@slave2 <<EOF
hostnamectl set-hostname slave2
mkdir $MP

ssh-keygen -t rsa -n '' -f  ~/.ssh/id_rsa
ssh-copy-id master
ssh-copy-id slave1
ssh-copy-id slave2
EOF

### SECOND 第二板块

# hadoop settings file 设置hadoop配置文件

# 替换 hadoop-env.sh 中的JAVA_HOME PATH文件
sed -i '/export JAVA_HOME=/cexport JAVA_HOME='$MP'/jdk' $MP/hadoop/etc/hadoop/hadoop-env.sh

# 配置 core-site.xml 文件
cat > $MP/hadoop/etc/hadoop/core-site.xml <<EOF
<configuration>
     <property>
         <name>fs.defaultFS</name>
            <value>hdfs://master:9000</value>
     </property>
      <property>
         <name>hadoop.tmp.dir</name>
            <value>/opt/module/hadoop/tmp</value>
     </property>
</configuration>
EOF

# 配置 hdfs-site.xml 文件
cat > $MP/hadoop/etc/hadoop/hdfs-site.xml <<EOF
<configuration>
    <property>
         <name>dfs.replication</name>
            <value>3</value>
     </property>
     <property>
         <name>dfs.namenode.secondary.http-address</name>
            <value>slave1:50090</value>
     </property>
</configuration>
EOF

# 配置 mapred-site.xml 文件
cp $MP/hadoop/etc/hadoop/mapred-site.xml.template $MP/hadoop/etc/hadoop/mapred-site.xml
cat > $MP/hadoop/etc/hadoop/mapred-site.xml<<EOF
<configuration>
    <property>
         <name>mapreduce.framework.name</name>
            <value>yarn</value>
     </property>
</configuration>
EOF

# 配置 yarn-site.xml 文件
cat > $MP/hadoop/etc/hadoop/yarn-site.xml<<EOF
<configuration>
<!-- Site specific YARN configuration properties -->
     <property>
         <name>yarn.resourcemanager.hostname</name>
            <value>master</value>
     </property>
       <property>
         <name>yarn.nodemanager.aux-services</name>
            <value>mapreduce_shuffle</value>
     </property>
</configuration>
EOF

# 配置 slaves 文件 hadoop-2.7.7
cat > $MP/hadoop/etc/hadoop/slaves<<EOF
master
slave1
slave2
EOF

# 配置workers wenjian hadoop-3.3.0
cat > $MP/hadoop/etc/hadoop/workers<<EOF
master
slave1
slave2
EOF

# hadoop-3.3.0 need to add PATH for start&stop shell hadoop-3.3.0需要添加PATH变量到启动/关闭脚本中

# sed -i "2i HDFS_DATANODE_USER=root" $MP/hadoop/sbin/start-dfs.sh
# sed -i "2i HADOOP_SECURE_DN_USER=hdfs" $MP/hadoop/sbin/start-dfs.sh
# sed -i "2i HDFS_NAMENODE_USER=root" $MP/hadoop/sbin/start-dfs.sh
# sed -i "2i HDFS_SECONDARYNAMENODE_USER=root" $MP/hadoop/sbin/start-dfs.sh

# sed -i "2i HDFS_DATANODE_USER=root" $MP/hadoop/sbin/stop-dfs.sh
# sed -i "2i HADOOP_SECURE_DN_USER=hdfs" $MP/hadoop/sbin/stop-dfs.sh
# sed -i "2i HDFS_NAMENODE_USER=root" $MP/hadoop/sbin/stop-dfs.sh
# sed -i "2i HDFS_SECONDARYNAMENODE_USER=root" $MP/hadoop/sbin/stop-dfs.sh

# sed -i "2i YARN_RESOURCEMANAGER_USER=root" $MP/hadoop/sbin/start-yarn.sh
# sed -i "2i HADOOP_SECURE_DN_USER=yarn" $MP/hadoop/sbin/start-yarn.sh
# sed -i "2i YARN_NODEMANAGER_USER=root" $MP/hadoop/sbin/start-yarn.sh

# sed -i "2i YARN_RESOURCEMANAGER_USER=root" $MP/hadoop/sbin/stop-yarn.sh
# sed -i "2i HADOOP_SECURE_DN_USER=yarn" $MP/hadoop/sbin/stop-yarn.sh
# sed -i "2i YARN_NODEMANAGER_USER=root" $MP/hadoop/sbin/stop-yarn.sh

### THIRD 第三板块

# trasnfer module 将配置好的模组路径下的所有文件传输到其他节点
scp -r $MP slave1:/opt
scp -r $MP slave2:/opt

# check hadoop start 启动hadoop
hdfs namenode -format
$MP/hadoop/sbin/stop-dfs.sh
$MP/hadoop/sbin/stop-yarn.sh
$MP/hadoop/sbin/start-dfs.sh
$MP/hadoop/sbin/start-yarn.sh

# 检查启动情况
hostnamectl
jps

ssh root@slave1 "source /etc/profile && hostnamectl && jps"
ssh root@slave2 "source /etc/profile && hostnamectl && jps"
