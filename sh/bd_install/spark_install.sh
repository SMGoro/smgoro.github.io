#!/bin/bash
echo "spark本地安装脚本 v1.0 —— by Goro"
sleep 2

read -p "输入安装路径（默认值$MP）： " MP
MP=${MP:-/opt/module}
read -p "输入软件包路径（默认值$SP）： " SP
SP=${SP:-/opt/software}
while true; do
    echo "请输入要查找的spark压缩包文件名(默认$SF_IN)："
    read SF_IN
    SF_IN=${SF_IN:-spark}
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
mkdir $MP/spark -p
tar -xvzf $SF -C $MP/spark --strip-components 1

cat>>"/etc/profile"<<EOF
export SPARK_HOME=$MP/spark
export PATH=\$SPARK_HOME/bin:\$PATH
EOF
source /etc/profile
scp -r /etc/profile slave1:/etc/
scp -r /etc/profile slave2:/etc/

cp $MP/spark/conf/spark-env.sh.template $MP/spark/conf/spark-env.sh -f
cat >> $MP/spark/conf/spark-env.sh << EOF
export JAVA_HOME=$MP/jdk
export HADOOP_HOME=$MP/hadoop
export HADOOP_CONF_DIR=\$HADOOP_HOME/etc/hadoop
EOF

stop-all.sh

sed -i '/<\/configuration>/d' $MP/hadoop/etc/hadoop/yarn-site.xml
cat >> $MP/hadoop/etc/hadoop/yarn-site.xml << EOF
<property>
  <name>yarn.nodemanager.pmem-check-enabled</name>
  <value>false</value>
</property>
<property>
  <name>yarn.nodemanager.vmem-check-enabled</name>
  <value>false</value>
</property>
</configuration>
EOF
scp -r $MP/hadoop/etc/hadoop/yarn-site.xml slave1:$MP/hadoop/etc/hadoop/yarn-site.xml
scp -r $MP/hadoop/etc/hadoop/yarn-site.xml slave2:$MP/hadoop/etc/hadoop/yarn-site.xml
scp -r $MP/spark/ slave1:$MP/
scp -r $MP/spark/ slave2:$MP/

start-all.sh
jps
spark-submit --class org.apache.spark.examples.SparkPi --master yarn $MP/spark/examples/jars/spark-examples_2.12-3.1.1.jar