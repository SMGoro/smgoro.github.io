#!/bin/bash
echo "jdk本地安装脚本 v1.0 —— by Goro"
sleep 2

read -p "输入安装路径（默认值$MP）： " MP_INPUT
MP=${MP_INPUT:-/opt/module}
read -p "输入软件包路径（默认值$SP）： " SP_INPUT
SP=${SP_INPUT:-/opt/software}
while true; do
    echo "请输入要查找的jdk压缩包文件名(默认$JF_IN)："
    read JF_IN
    JF_IN=${JF_IN:-jdk}
    JF_PATH=$(find $SP -type f -name "*$JF_IN*" -print | head -n 1)
    if [ -z "$JF_PATH" ]; then
        echo "没有找到匹配的文件，请重新输入关键词。"
    else
        echo "找到的文件的完整路径："
        JF="$JF_PATH"
        echo "保存到变量中的文件路径：$JF"
        read -p "文件路径是否正确？(Y/n) " yn
        yn=${yn:-y}
        case $yn in
            [Yy]* ) break;;
            [Nn]* ) continue;;
        esac
        break
    fi
done
mkdir $MP/jdk -p
tar -xvzf $JF -C $MP/jdk --strip-components 1

cat>>"/etc/profile"<<EOF
export JAVA_HOME=$MP/jdk
export PATH=\$JAVA_HOME/bin:\$PATH
EOF
source /etc/profile
scp -r /etc/profile slave1:/etc/
scp -r /etc/profile slave2:/etc/
java -version
scp -r $MP/jdk/ slave1:$MP/jdk/
scp -r $MP/jdk/ slave2:$MP/jdk/