#!/bin/bash
echo "正在打包..."
file="dist"
rm -rf $file
npm run build
echo "上传目标文件${file}"
ssh root@139.196.120.93 "cd ./tabplus-client;rm -rf ${file}"
sftp root@139.196.120.93 <<EOF
put -r $file tabplus-client/${file}
EOF

echo "程序执行完毕!"

