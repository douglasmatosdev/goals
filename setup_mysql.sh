#!/bin/bash

echo "........................."
echo ".                       ."
echo ". STARTING MYSQL SCRIPT ."
echo ".                       ."
echo "........................."

echo " "
echo " "
echo " "
echo "./script.sh mysql_container password database_name "
echo " "
echo " "
echo " "

mysql_container=$1
password=$2
database_name=$3

create_user="CREATE USER 'root'@'%' IDENTIFIED BY '$password';"
create_database="CREATE DATABASE $database_name;"
grant_all_privileges="GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';"
flush_privileges_and_logs="FLUSH PRIVILEGES; SHOW DATABASES; SELECT User, Host FROM mysql.user;"

docker exec -it $mysql_container mysql -u root -p -e "$create_user $create_database $flush_privileges_and_logs"


echo "........................."
echo ".                       ."
echo ". FINISH MYSQL SCRIPT   ."
echo ".                       ."
echo "........................."