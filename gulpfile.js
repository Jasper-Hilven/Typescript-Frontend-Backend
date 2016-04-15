var gulp = require('gulp');
var depFinds = require('./buildTasks/DependencyFinder');
var paths = {
  scripts: ['src/**/*.ts']
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
   console.log(depFinds.LogAllThingies(__dirname + "/src"));
});
/*gulp.task('default', ['watch', 'scripts', 'images']);
*/
