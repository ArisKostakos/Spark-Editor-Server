#! /bin/sh
# /etc/init.d/startSpark.sh
#
sudo sh
echo "Starting Spark Server..."
cd /home/Aris/SparkEditorServer
git pull
cd file-server
node file &
cd ..
cd web-server
node app &
cd ..
cd game-server
nohup pomelo start &
echo "Spark Server Running!"

exit 0