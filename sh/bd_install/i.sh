#!/bin/bash

echo "==============="
echo "BigData Local AUTO Install Shell v0.1 ——by Goro"
echo "==============="
echo ""

echo "Please use number to choice:"

select option in "update shell" "set up" "install jdk" "install hadoop" "install zookeeper" "install scala&spark" "install kafka" "install all" "quit"
do
    case $option in
        "update shell")
            read -p "输入安装路径（默认值$IP）： " IP
            IP=${IP:-/usr/local/bin}
            echo "获取安装脚本"
            mkdir $IP -p
            curl "https://blog.imc.re/sh/bd_install/i.sh" -o $IP/bd.sh
            curl "https://blog.imc.re/sh/bd_install/setup.sh" -o $IP/setup.sh
            curl "https://blog.imc.re/sh/bd_install/jdk_install.sh" -o $IP/jdk_install.sh
            curl "https://blog.imc.re/sh/bd_install/hadoop_install.sh" -o $IP/hadoop_install.sh
            curl "https://blog.imc.re/sh/bd_install/zookeeper_install.sh" -o $IP/zookeeper_install.sh
            curl "https://blog.imc.re/sh/bd_install/scala_install.sh" -o $IP/scala_install.sh
            curl "https://blog.imc.re/sh/bd_install/spark_install.sh" -o $IP/spark_install.sh
            curl "https://blog.imc.re/sh/bd_install/kafka_install.sh" -o $IP/kafka_install.sh
            chmod +x $IP/*.sh            
            ;;
        "set up")
            echo "初始化设置"
            sleep 1
            chmod +x $IP/setup.sh
            bash $IP/setup.sh
        ;;

        "install jdk")
            echo "安装jdk"
            sleep 1
            chmod +x $IP/jdk_install.sh
            bash $IP/jdk_install.sh
        ;;
            
        "install hadoop")
            echo "安装hadoop"
            sleep 1
            chmod +x $IP/hadoop_install.sh
            bash $IP/hadoop_install.sh
        ;;
            
        "install zookeeper")
            echo "安装zookeeper"
            sleep 1
            chmod +x $IP/zookeeper_install.sh
            bash $IP/zookeeper_install.sh
        ;;
            
        "install scala&spark")
            echo "安装scala&spark"
            sleep 1
            chmod +x $IP/scala_install.sh
            bash $IP/scala_install.sh
            chmod +x $IP/spark_install.sh
            bash $IP/spark_install.sh
        ;;
            
        "install kafka")
            echo "安装kafka"
            sleep 1
            chmod +x $IP/kafka_install.sh
            bash $IP/kafka_install.sh
        ;;
            
        "install all")
            echo "安装所有组件"
            sleep 1
            chmod +x $IP/*.sh
            bash $IP/setup.sh
            bash $IP/jdk_install.sh
            bash $IP/hadoop_install.sh
            bash $IP/zookeeper_install.sh
            bash $IP/scala_install.sh
            bash $IP/spark_install.sh
            bash $IP/kafka_install.sh
        ;;

        "quit")
            break
        ;;
        *)
            echo "无效的选项，请重新选择。"
        ;;
    esac

done
