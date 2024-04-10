#!/bin/bash
echo "初始化设置"
sleep 2

read -p "输入安装路径（默认值$MP）： " MP
MP=${MP:-/opt/module}

# read -p "输入ssh密码（默认值$PASSWORD）： " PASSWORD
# PASSWORD=${PASSWORD:-123456}

read -p "输入master IP（默认值$NODE1IP）： " NODE1IP
NODE1IP=${NODE1IP:-192.168.152.82}

read -p "输入slave1 IP（默认值$NODE2IP）： " NODE2IP
NODE2IP=${NODE2IP:-192.168.152.102}

read -p "输入slave2 IP（默认值$NODE3IP）： " NODE3IP
NODE3IP=${NODE3IP:-192.168.152.122}

hostnamectl set-hostname master

cat>>"/etc/hosts"<<EOF
$NODE1IP master
$NODE2IP slave1
$NODE3IP slave2
EOF
            
ssh-keygen -t rsa -N '' -f /root/.ssh/id_rsa -q

ssh-copy-id master
ssh-copy-id slave1
ssh-copy-id slave2
mkdir $MP -p

scp -r /etc/hosts master:/etc/
scp -r /etc/hosts slave1:/etc/
scp -r /etc/hosts slave2:/etc/

systemctl disable firewalld 
systemctl stop firewalld
systemctl status firewalld

ssh root@slave1 <<EOF
systemctl disable firewalld 
systemctl stop firewalld
systemctl status firewalld
hostnamectl set-hostname slave1
mkdir $MP -p
ssh-keygen -t rsa -n '' -f  ~/.ssh/id_rsa
ssh-copy-id master
ssh-copy-id slave1
ssh-copy-id slave2

EOF

ssh root@slave2 <<EOF
systemctl disable firewalld 
systemctl stop firewalld
systemctl status firewalld
hostnamectl set-hostname slave2
mkdir $MP -p
ssh-keygen -t rsa -n '' -f  ~/.ssh/id_rsa
ssh-copy-id master
ssh-copy-id slave1
ssh-copy-id slave2

EOF