#!/bin/bash
echo "zookeeper本地安装脚本 v1.0 —— by Goro"
sleep 2

read -p "输入安装路径（默认值$MP）： " MP
MP=${MP:-/opt/module}
read -p "输入软件包路径（默认值$SP）： " SP
SP=${SP:-/opt/software}
while true; do
    echo "请输入要查找的Zookeeper压缩包文件名(默认$ZF_IN)："
    read ZF_IN
    ZF_IN=${ZF_IN:-zookeeper}
    ZF_PATH=$(find $SP -type f -name "*$ZF_IN*" -print | head -n 1)
    if [ -z "$ZF_PATH" ]; then
        echo "没有找到匹配的文件，请重新输入关键词。"
    else
        echo "找到的文件的完整路径："
        ZF="$ZF_PATH"
        echo "保存到变量中的文件路径：$ZF"
        read -p "文件路径是否正确？(Y/n) " yn
        yn=${yn:-y}
        case $yn in
            [Yy]* ) break;;
            [Nn]* ) continue;;
        esac
        break
    fi
done

mkdir $MP/zookeeper -p
tar -xvzf $ZF -C $MP/zookeeper --strip-components 1

cat>>"/etc/profile"<<EOF
export ZK_HOME=$MP/zookeeper
export PATH=\$ZK_HOME/bin:\$PATH
EOF
source /etc/profile
scp -r /etc/profile slave1:/etc/
scp -r /etc/profile slave2:/etc/

systemctl disable firewalld 
systemctl stop firewalld
systemctl status firewalld
cp $MP/zookeeper/conf/zoo_sample.cfg $MP/zookeeper/conf/zoo.cfg -f
sed -i '/dataDir=/cdataDir='$MP'/zookeeper/zkdata' $MP/zookeeper/conf/zoo.cfg
cat >>$MP/zookeeper/conf/zoo.cfg<<EOF
server.1=master:2888:3888
server.2=slave1:2888:3888
server.3=slave2:2888:3888
EOF
mkdir $MP/zookeeper/zkdata -p
echo "1" > $MP/zookeeper/zkdata/myid

scp -r $MP/zookeeper/ slave1:$MP/
scp -r $MP/zookeeper/ slave2:$MP/

ssh root@slave1 << EOF
systemctl disable firewalld 
systemctl stop firewalld
systemctl status firewalld
source /etc/profile
echo "2" > $MP/zookeeper/zkdata/myid
$MP/zookeeper/bin/zkServer.sh start
$MP/zookeeper/bin/zkServer.sh status
EOF

ssh root@slave2 << EOF
systemctl disable firewalld 
systemctl stop firewalld
systemctl status firewalld
source /etc/profile
echo "3" > $MP/zookeeper/zkdata/myid
$MP/zookeeper/bin/zkServer.sh start
$MP/zookeeper/bin/zkServer.sh status
EOF

zkServer.sh start
zkServer.sh status