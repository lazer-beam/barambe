const gulp = require('gulp')
const gutil = require('gulp-util')
const mocha = require('gulp-mocha')
const open = require('gulp-open')
const argv = require('yargs').argv

gulp.task('default', () => gutil.log(gutil.colors.magenta('LETS GET GULPING!!!!')))

gulp.task('open', ['default', 'test'], () => {
  gulp.src('./mochawesome-reports/mochawesome.html')
  .pipe(open({ app: 'google chrome' }))
})

// gulp test -name [filename]
gulp.task('test', ['default'], () => {
  gutil.log(gutil.colors.cyan('TEST BITCH!!!'))
  gulp.src(`./test/${argv.x}.js`, { read: false })
  .pipe(mocha({ reporter: 'mochawesome' }))
  .once('end', () => { process.exit() })
})
