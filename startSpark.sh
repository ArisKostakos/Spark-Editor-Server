#! /bin/sh
# /etc/init.d/startSpark.sh
#


echo "Starting Spark Server..."
cd /home/Aris/SparkEditorServer
cd file-server
node file &
cd ..
cd web-server
node app &
cd ..
cd game-server
pomelo start &
echo "Spark Server Running!"

exit 0