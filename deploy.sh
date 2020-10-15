#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npx react-scripts build

cp -r src/Demo/ build/

# 进入生成的文件夹
cd build

# push
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:lixianbin1/DemoWebsite.git master:gh-pages

# 删除dist文件夹
cd ../
rm -rf build