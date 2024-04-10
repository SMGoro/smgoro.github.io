#!/bin/bash
echo "hadoop本地安装脚本 v1.0 —— by Goro"
sleep 2

read -p "输入安装路径（默认值$MP）： " MP
MP=${MP:-/opt/module}
read -p "输入软件包路径（默认值$SP）： " SP
SP=${SP:-/opt/software}
while true; do
    echo "请输入要查找的hadoop压缩包文件名(默认$HF_IN)："
    read HF_IN
    HF_IN=${HF_IN:-hadoop-3}
    HF_PATH=$(find $SP -type f -name "*$HF_IN*" -print | head -n 1)
    if [ -z "$HF_PATH" ]; then
        echo "没有找到匹配的文件，请重新输入关键词。"
    else
        echo "找到的文件的完整路径："
        HF="$HF_PATH"
        echo "保存到变量中的文件路径：$HF"
        read -p "文件路径是否正确？(Y/n) " yn
        yn=${yn:-y}
        case $yn in
            [Yy]* ) break;;
            [Nn]* ) continue;;
        esac
    fi
done
mkdir $MP/hadoop -p
tar -xvzf $HF -C $MP/hadoop --strip-components 1

cat>>"/etc/profile"<<EOF
export HADOOP_HOME=$MP/hadoop
export PATH=\$PATH:\$HADOOP_HOME/bin:\$HADOOP_HOME/sbin
export HDFS_DATANODE_USER=root
export HDFS_NAMENODE_USER=root
export HDFS_SECONDARYNAMENODE_USER=root
export YARN_RESOURCEMANAGER_USER=root
export YARN_NODEMANAGER_USER=root
EOF

source /etc/profile
scp -r /etc/profile slave1:/etc/
scp -r /etc/profile slave2:/etc/

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

scp -r $MP/hadoop/ slave1:$MP/
scp -r $MP/hadoop/ slave2:$MP/
hdfs namenode -format
$MP/hadoop/sbin/stop-dfs.sh
$MP/hadoop/sbin/stop-yarn.sh
$MP/hadoop/sbin/start-dfs.sh
$MP/hadoop/sbin/start-yarn.sh

hostnamectl
jps

ssh root@slave1 "source /etc/profile && hostnamectl && jps"
ssh root@slave2 "source /etc/profile && hostnamectl && jps"