#!/bin/bash
echo "scala本地安装脚本 v1.0 —— by Goro"
sleep 2

read -p "输入安装路径（默认值$MP）： " MP
MP=${MP:-/opt/module}
read -p "输入软件包路径（默认值$SP）： " SP
SP=${SP:-/opt/software}
while true; do
    echo "请输入要查找的scala压缩包文件名(默认$SF_IN)："
    read SF_IN
    SF_IN=${SF_IN:-scala-2}
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
mkdir $MP/scala -p
tar -xvzf $SF -C $MP/scala --strip-components 1

cat>>"/etc/profile"<<EOF
export SCALA_HOME=$MP/scala
export PATH=\$SCALA_HOME/bin:\$PATH
EOF
source /etc/profile
scp -r /etc/profile slave1:/etc/
scp -r /etc/profile slave2:/etc/
scala -version
scp -r $MP/scala/ slave1:$MP/
scp -r $MP/scala/ slave2:$MP/