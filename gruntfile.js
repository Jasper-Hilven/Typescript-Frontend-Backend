module.exports = function(grunt) {

  grunt.initConfig({
          tslint: {
              options: {
                  configuration: grunt.file.readJSON('tslint.json')
              },
              files: {
                  src: 'src/**/*.ts'
              }
          },
          ts: {
            default : {
                 src: ["src/backend/**/*.ts"]
               }
             }

      });
      grunt.loadNpmTasks("grunt-ts");
      grunt.loadNpmTasks("grunt-tslint");

};
