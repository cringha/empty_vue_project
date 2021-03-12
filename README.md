# Easy Edge Management Setup 

### Install 3rd dependencies 

#### Install Node 
> NodeJs , Install Node JS [Node.js](https://nodejs.org/en/)

#### Instal Yarn package management tools 
> Install Yarn [Yarn](https://yarnpkg.com/en/)
> 


#### Node-Sass
> github 访问受阻， 用国内镜像
> 

根据 node 版本 选择 *.node文件， [node-sass Mirror](https://npm.taobao.org/mirrors/node-sass/v4.9.0/) 
设置 `sass-binary-path` 为本地文件

```
yarn config set sass-binary-path D:\dev\SPPA\Platform\webapps\portal\bin\win32-x64-64_binding.node
yarn add node-sass

```

### 编译

先執行 yarn 更新nodes 組件，
然後執行 yarn run dev 開發模式
yarn run build 編譯

```
yarn 

yarn run dev 

```



#### src 目錄 
src 目錄是映射到 ../frame/public 目錄上

```

mklink /j src ..\frame\public

```