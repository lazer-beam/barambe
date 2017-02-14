const gulp = require('gulp')
const gutil = require('gulp-util')
const mocha = require('gulp-mocha')
const open = require('gulp-open')
const inquirer = require('inquirer')

const testNames = ['example.js', 'test2.js', 'test3.js']

gulp.task('default', () => gutil.log(gutil.colors.magenta('LETS GET GULPING!!!!')))

gulp.task('open', ['test'], () => {
  gulp.src('./mochawesome-reports/mochawesome.html')
  .pipe(open({ app: 'google chrome' }))
})

gulp.task('test', done => {
  gutil.log(gutil.colors.cyan('IT IS TIME TO TEST !'))
  inquirer.prompt({
    type: 'list',
    name: 'name',
    message: 'Which test do you want to run?',
    choices: testNames,
  }).then(answers => {
    gutil.log('LETS DO THIS!!!!!')
    gulp.src(`./test/${answers.name}`, { read: false })
    .pipe(mocha({ reporter: 'mochawesome' }))
    .once('end', () => { process.exit() })
    done()
  })
})
