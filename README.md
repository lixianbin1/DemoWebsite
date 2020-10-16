# DemoWebsite

这是一个试验箱!

## 演示地址：https://lixianbin1.github.io/DemoWebsite/

## 加入演示

 - 1：在 src/common/listData.js 加入需要介绍演示的内容

 ```
export const list=[{
    href:'./Demo/ThreeJS/index.html',       //演示项目的相对地址
    img:require('../Static/img/article/1905091.png'),   //介绍时候的图片
    title:'three.js',                       //演示标题
    text:'three.js制作的演示例子'             //演示介绍
},]
 ```

 - 2：在项目的 src/Demo 目录加入需要演示的项目
 

 - 3：在项目的 src/Warehouse 目录加入演示项目的源代码压缩包

## 命令介绍

    yarn push   
    // 项目自动部署命令，在演示项目加入后，可以执行命令进行push 

    yarn build 
    // 项目打包命令，在根目录出现build/ 文件夹 


