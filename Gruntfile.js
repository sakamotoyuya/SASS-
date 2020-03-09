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
  grunt.loadNpmTasks('grunt-contrib-sass');//sassコマンドをロード
 
  grunt.registerTask('default', ['sass','watch']);//タスクの登録
 
};