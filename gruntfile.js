var path = require('path');
var fs = require('fs');

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        generateIndices: { base: { src: ['src/**/*index.gen.ts']}},
        typescript: {
            watchBackendDev: {
                src: ['src/backend/devServer.noindex.ts'], dest: 'dist/dev/devServer.js',
                options: {
                    module: 'commonjs', target: 'es5', sourceMap: false, declaration: false,
                    watch: { path: ['src/backend/**/*.ts','src/commonend/**/*.ts'], atBegin: true
                    }}},
            watchFrontendDev: {
                src: ['src/frontend/main.ts'], dest: 'dist/dev/public/main.js',
                options: {
                    module: 'commonjs',target: 'es5',sourceMap: false,declaration: false,
                    watch: {path: ['src/frontend/**/*.ts','src/commonend/**/*.ts'], atBegin: true }}
            },
            frontendProd: {
                src: ['src/frontend/main.ts'], dest: 'dist/prod/public/main.pre.js',
                options: { module: 'commonjs', target: 'es5',
                  sourceMap: false, declaration: false}
            },
            backendProd: {
                src: ['src/backend/prodServer.noindex.ts'], dest: 'dist/prod/server.js',
                options: { module: 'commonjs', target: 'es5',
                  sourceMap: false, declaration: false}
            },
            watchFrontendTest: {
                  src: ['src/frontendTest/main.ts'], dest: 'dist/test/frontend/main.test.js',
                  options: {
                    module: 'commonjs', target: 'es5', sourceMap: false, declaration: false,
                    watch: {path: ['src/frontend/**/*.ts','src/frontendTest/**/*.ts','src/commonend/**/*.ts'], atBegin: true }}},
            watchGenerate: {
                  src: ['src/generate/main.ts'], dest: 'dist/generate/main.js',
                          options: {
                            target: 'es5', sourceMap: false, declaration: false,
                            watch: {path: ['src/generate/**/*.ts'], atBegin: true }}}},

        concurrent: {
          devWatch: {
            tasks:['typescript:watchBackendDev', 'typescript:watchFrontendDev',
            'watch:copyFrontIndex','typescript:watchFrontendTest',
            'nodemon:dev','nodemon:generate',
            'generateIndices',
            'watch:karmaWatch','typescript:watchGenerate'],
            options: {logConcurrentOutput: true}},
          devWatchLight: {
              tasks:['typescript:watchBackendDev', 'typescript:watchFrontendDev',
              'watch:copyFrontIndex',
              'generateIndices',
              'nodemon:dev','nodemon:generate',
              'typescript:watchGenerate'],
              options: {logConcurrentOutput: true}}
            },
          watch: {
          copyFrontIndex: {
            files: 'src/frontend/index.html', tasks: ['copy:index'],
            options: {atBegin: true,interrupt: true}},
          lintWatch:{
            files: 'src/**/*.ts', tasks: ['tslint:all'],
            options: {atBegin: true,interrupt: true}},
          karmaWatch:{
            files:'dist/test/**/*.js',tasks: ['karma:unit'],
            options: {atBegin: true,interrupt: true}}},
        copy:{index: {files: [{expand: false, src: ['src/frontend/index.html'], dest: 'dist/dev/public/index.html'},{expand: false, src: ['src/frontend/index.html'], dest: 'dist/prod/public/index.html'}]},
              dummyTest:{files: [{expand: false, src: ['src/frontendTest/dummy.js'], dest: 'dist/test/frontend/dummy.test.js'}]}},
        uglify: {
          prod: {files: {'dist/prod/public/main.js': ['dist/prod/public/main.pre.js']}}},
        tslint: {options: {configuration: "tslint.json"},
          all: {src:["src/**/*.ts"]}},
        clean: {
          prod: {src: ['dist']},
          prodMainPre:{src:['dist/prod/public/main.pre.js']}},
        karma: {
          unit: { files: [{ src: ['dist/test/**/*test.js'], served: true }], background: false, singleRun: true, browsers: ['PhantomJS'],frameworks: ['jasmine']}},
        mkdir:{prod:{options:{create:['dist/prod/public/']}}},
        nodemon: {
          dev: {
            script: 'dist/dev/devServer.js',
            options: {callback: function (nodemon) {nodemon.on('log', function (event) { console.log(event.colour); });},
                env: {PORT: '8000'},watch: ['dist/dev/'],delay: 2000,legacyWatch: true
            }},
            generate: {
              script: 'dist/generate/main.js',
              options: {callback: function (nodemon) {nodemon.on('log', function (event) { console.log(event.colour); });},
                  env: {PORT: '8030'},watch: ['dist/generate/'],delay: 0,legacyWatch: true
              }}
          },
        'typescript-formatter': {all:{Path: 'src/frontend/main.ts'}}
      });

    grunt.loadTasks('gruntTasks');
    grunt.registerTask('format', ['typescript-formatter']);
    grunt.registerTask('dev', ['concurrent:devWatch']);
    grunt.registerTask('devLight', ['concurrent:devWatchLight']);
    grunt.registerTask('prod', ['clean:prod','mkdir:prod', 'typescript:frontendProd','typescript:backendProd','uglify:prod','clean:prodMainPre','copy:index']);
  };
