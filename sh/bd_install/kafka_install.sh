#!/bin/bash
echo "kafka本地安装脚本 v1.0 —— by Goro"
sleep 2

read -p "输入安装路径（默认值$MP）： " MP
MP=${MP:-/opt/module}
read -p "输入软件包路径（默认值$SP）： " SP
SP=${SP:-/opt/software}
while true; do
    echo "请输入要查找的kafka压缩包文件名(默认$SF_IN)："
    read SF_IN
    SF_IN=${SF_IN:-kafka}
    SF_PATH=$(find $SP -type f -name "*$SF_IN*" -print | head -n 1)
    if [ -z "$SF_PATH" ]; then
        echo "没有找到匹配的文件，请重新输入关键词。"
    else
        echo "找到的文件的完整路径："
        SF="$SF_PATH"
        echo "保存到变量中的文件路径：$SF"
        read -p "文件路径是否正确？(Y/n) " yn
        yn=${yn:-y}
        case $yn in
            [Yy]* ) break;;
            [Nn]* ) continue;;
        esac
        break
    fi
done
mkdir $MP/kafka -p
tar -xvzf $SF -C $MP/kafka --strip-components 1

cat>> "/etc/profile" <<EOF
export KAFKA_HOME=$MP/kafka
export PATH=\$KAFKA_HOME/bin:\$PATH
EOF
source /etc/profile
scp -r /etc/profile slave1:/etc/
scp -r /etc/profile slave2:/etc/

sed -i '/clientPort=/cclientPort=2181' $MP/kafka/config/zookeeper.properties
sed -i '/dataDir=/cdataDir='$MP'/kafka/data' $MP/kafka/config/zookeeper.properties
cat>> $MP/kafka/config/zookeeper.properties <<EOF
server.1=master:2888:3888
server.2=slave1:2888:3888
server.3=slave2:2888:3888
EOF
mkdir $MP/kafka/data -p
echo "1" > $MP/kafka/data/myid
sed -i '/broker.id=/cbroker.id=0' $MP/kafka/config/server.properties
sed -i 's#^\#listeners=.*#listeners=PLAINTEXT://master:9092#g' $MP/kafka/config/server.properties
sed -i 's#^\#advertised.listeners=.*#advertised.listeners=PLAINTEXT://master:9092#g' $MP/kafka/config/server.properties
sed -i '/log.dirs=/clog.dirs='$MP'/kafka/data' $MP/kafka/config/server.properties
sed -i '/zookeeper.connect=/czookeeper.connect=master:2181,slave1:2181,slave2:2181' $MP/kafka/config/server.properties

scp -r $MP/kafka/ slave1:$MP/
scp -r $MP/kafka/ slave2:$MP/

ssh root@slave1 << EOF
echo "1" > $MP/kafka/data/myid
sed -i '/broker.id=/cbroker.id=1' $MP/kafka/config/server.properties
sed -i 's#^\#listeners=.*#listeners=PLAINTEXT://slave1:9092#g' $MP/kafka/config/server.properties
sed -i 's#^\#advertised.listeners=.*#advertised.listeners=PLAINTEXT://slave1:9092#g' $MP/kafka/config/server.properties
sed -i '/log.dirs=/clog.dirs='$MP'/kafka/data' $MP/kafka/config/server.properties
sed -i '/zookeeper.connect=/czookeeper.connect=master:2181,slave1:2181,slave2:2181' $MP/kafka/config/server.properties
source /etc/profile
EOF

ssh root@slave2 << EOF
echo "1" > $MP/kafka/data/myid
sed -i '/broker.id=/cbroker.id=2' $MP/kafka/config/server.properties
sed -i 's#^\#listeners=.*#listeners=PLAINTEXT://slave2:9092#g' $MP/kafka/config/server.properties
sed -i 's#^\#advertised.listeners=.*#advertised.listeners=PLAINTEXT://slave2:9092#g' $MP/kafka/config/server.properties
sed -i '/log.dirs=/clog.dirs='$MP'/kafka/data' $MP/kafka/config/server.properties
sed -i '/zookeeper.connect=/czookeeper.connect=master:2181,slave1:2181,slave2:2181' $MP/kafka/config/server.properties
source /etc/profile
EOF

kafka-server-start.sh -daemon $MP/kafka/config/server.properties
jps
kafka-topics.sh --zookeeper master:2181,slave1:2181,slave2:2181 --create --partitions 3 --replication-factor 3 --topic test
