# はじめに
本記事はgruntを利用してSASSの自動コンパイルを実現することを目的とする。

SASSコマンドのみでも、watchコマンドを利用することで同一内容の実現が可能だが、ファイル指定や、フォルダ指定、watchコマンドの指定方法をSASSコマンドにて
実施する必要があり忘れてしまうと再度調べる必要があり効率が悪い。
gruntを導入することで、gruntコマンドのみでコンパイル可能となるため、
SCSSの自動コンパイルを可能にし作業効率向上を図る。

# github
今回作成したSASSの変換ツールgithubに公開しておりますので、
興味のある方はご利用ください。
https://github.com/sakamotoyuya/SASSEDIT

# 使い方
```
npm install
grunt
```
※npm install後に、
`node_modules\grunt\bin`に実行ファイルができるため、
ここにパスを通すかそれを実行するのでもよい。
`node_modules\grunt\bin\grunt`

構築方法は以下に示す。

## npm導入
```
PS C:\Users\yuya\Documents\develop\SASSEDIT> npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (sassedit) sass-editor
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository: (https://github.com/sakamotoyuya/SASSEDIT.git)
keywords:
author:
license: (ISC)
About to write to C:\Users\yuya\Documents\develop\SASSEDIT\package.json:

{
  "name": "sass-editor",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/sakamotoyuya/SASSEDIT.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/sakamotoyuya/SASSEDIT/issues"
  },
  "homepage": "https://github.com/sakamotoyuya/SASSEDIT#readme"
}


Is this OK? (yes) y

```
## rubyとsassをインストールする
以下を参考に、rubyとsassをインストールする。
https://bsj-k.com/sass-installation-windows/

## gruntの導入
[grunt本家サイト](https://gruntjs.com/getting-started)

```
npm install grunt --save-dev
```

ここからはcontrib系の物を導入していく。
contrib系がgruntが公式で展開しているプラグイン。

## 監視コマンドの導入
[grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
```
npm install grunt-contrib-watch --save-dev
```

## SASSコマンドの導入
[grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass)
```
npm install grunt-contrib-sass --save-dev
```

## gruntを準備する
以下のGruntfile.jsを用意する。

```Gruntfile.js
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    /*
    task:{
      ターゲット名1:{
        設定
      },
      ターゲット名2:{
        設定
      }
    }

    ターゲット名を指定することで、
    どちらかを実行することが可能となる。
    ターゲット名は自分で好きな文字の
    設定としてよい。
    */

    watch: {
        target:{
          files: ['src/**/*'],
          tasks: ['sass']
        },
      },
    sass: {
      dist: {
        // files: {
        //   'css/main.css': 'src/style1.scss'
        // }
       files: [{
        //ファイル名と同等の物を拡張子を変えて出力する。  
          expand: true,
          cwd: 'sass',//SRCに対する相対パスを指定する
          src: ['*.scss'],//コンパイルするソースコードを指定する。cwdで指定した物により、「src/*.scss」が指定元となる。
          dest: 'css/',//出力先フォルダを指定する
          ext: '.css'//拡張子を指定する。
        }]
      },
      options:{
        sourcemap:"none",//コードにsourcemapを出力しない
        noCache:true,//cacheを作らない
        style:"expanded"//nested, compact, compressed, expanded.
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');//watchコマンドで変更を検知するのに使用
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['sass','watch']);//タスクの登録

};

```
## sassフォルダとcssフォルダを作成する
sassフォルダ

```style1.scss
@import "style2";

.body{
  color:red;
}
```

```style2.scss
.sakamoto{
  color:pink;
}
```

cssフォルダを作っておく。

## 実行
gruntで実行してあげれば変換されます。
