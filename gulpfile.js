const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const fileinclude = require('gulp-file-include');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber'); 
const run = require('gulp-run');
const open = require('gulp-open');
const rename = require('gulp-rename');
const today = new Date();
const dateString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

gulp.task('open', () =>
  gulp.src('compiled/index.htm')
  .pipe(open({app: 'google chrome'}))
  .on('end', () => gutil.log('File opened'))
);
 
gulp.task('reload', () =>
  run('osascript reload.scpt').exec()
);

gulp.task('backup', () =>
  gulp.src('compiled/index.htm', {base: '.'})
  .pipe(plumber())
  .pipe(rename(`${dateString}.htm`)) 
  .pipe(gulp.dest('backups', {base: '.'}))
  .on('end', () => gutil.log(`File backed up to backups/${dateString}.htm`))
);

gulp.task('compile', () =>
  sass('styles/style.scss')
  .pipe(plumber())
  .on('error', sass.logError)
  .pipe(gulp.dest('compiled'))
  .on('end', () => gutil.log('Sass compiled'))
);

gulp.task('insert', () =>
  gulp.src('html/template.htm', {base: '.'})
  .pipe(plumber())
  .pipe(fileinclude())
  .on('end', () => gutil.log('Partials inserted into page'))
  .pipe(rename('index.htm')) 
  .pipe(gulp.dest('compiled'), {base: '.'})
  .on('end', () => gutil.log('Compiled page saved as index.htm'))
);

gulp.task('watch sass', () =>
  gulp.watch('styles/style.scss', ['rebuild'])
);

gulp.task('watch html', () =>
  gulp.watch('html/*.htm', ['rebuild'])
);

gulp.task('default', ['build', 'open', 'watch'], function() { });
gulp.task('build', ['compile', 'insert'], function() { });
gulp.task('watch', ['watch sass', 'watch html'], function() { });
gulp.task('rebuild', ['compile', 'insert', 'backup', 'reload'], function() { });
