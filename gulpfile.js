var gulp = require('gulp')
var { exec } = require('child_process')

gulp.task('test', function() {
  exec('npm test', function(error, stdout, stderr) {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  })
})

gulp.task('dev', ['test'], function() {
  gulp.watch('src/**/*.ts', ['test'])
  gulp.watch('test/**/*.ts', ['test'])
})