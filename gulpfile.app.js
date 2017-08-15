//simple auto build script
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const assign = require('object-assign');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const babel = require('gulp-babel');
const del = require('del');
const gls = require('gulp-live-server');
const gutil  = require('gulp-util');
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;

var bdefaultapp = true;

var PATHAPP = 'src/threejsapp';
var PATHAPP_OUT = 'public/threejsapp';

if(bdefaultapp){
    PATHAPP = 'src/gameserverscripts';
    PATHAPP_OUT = 'public/';
}else{
    PATHAPP = 'src/threejsapp';
    PATHAPP_OUT = 'public/threejsapp';
}

//angular 2 with babel
const vendors = [
    'babel-polyfill',
    'zone.js/dist/zone',
    'rxjs/add/operator/map',
    '@angular/platform-browser-dynamic',
    '@angular/core',
    '@angular/common',
    '@angular/platform-browser',
    //'@angular/router',
    //'@angular/http',
    '@angular/forms',
    'ng2-ace-editor'
];

//Add vender.js support files from angular, rxjs, babel-polyfill, zone
gulp.task('build:vendor.js', () => {
  const b = browserify({
    debug: true
  });

  // require all libs specified in vendors array
  vendors.forEach(lib => {
    b.require(lib);
  });

  b.bundle()
  .pipe(source('vendor.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  //.pipe(sourcemaps.write('./maps'))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./public/'))
  ;

  return b;
});

gulp.task('js:copy', () => {
  return gulp.src([ 'src/js/*.js','src/js/**/*.js'])
    .pipe(gulp.dest('public/js'));
});

gulp.task('assets:copy', () => {
  return gulp.src([ PATHAPP+'/assets/**/*'])
    .pipe(gulp.dest(PATHAPP_OUT+'/assets'));
});

//development index.html
gulp.task('html:copy', () => {
  return gulp.src(['src/*.html'])
    .pipe(gulp.dest('public'));
});

gulp.task('app_html:copy', () => {
  return gulp.src([PATHAPP+'/*.html',PATHAPP+'/**/*.html'])
    .pipe(gulp.dest(PATHAPP_OUT));
});

gulp.task('css:copy', () => {
  return gulp.src([
      'src/css/*.css'
  ])
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

gulp.task('app_css:copy', () => {
  return gulp.src([
      PATHAPP+'/*.css',
      PATHAPP+'/**/*.css'
  ])
    .pipe(gulp.dest(PATHAPP_OUT))
    .pipe(browserSync.stream());
});

gulp.task('copy',['html:copy','app_html:copy','css:copy','app_css:copy']);

//build single file
gulp.task('build:app.js', () => {
  const b = browserify(PATHAPP+'/index.js', { debug: true })
    .ignore('./src/js/three.min.js')
    .ignore('./src/js/postprocessing/EffectComposer.js')
    .ignore('./src/js/shaders/CopyShader.js')
    .ignore('./src/js/jquery.min.js')
    .ignore('./src/js/jquery-ui.min.js')
    .ignore('./src/js/jquery.layout.min.js')
    .external(vendors) // Specify all vendors as external source
    .transform(babelify);
  return bundle(b);
});

gulp.task('app_watch:index.js', () => {
  const b = browserify([PATHAPP+'/index.js'], assign({ debug: true }, watchify.args))
    .ignore('./src/js/three.min.js')
    .ignore('./src/js/postprocessing/EffectComposer.js')
    .ignore('./src/js/shaders/CopyShader.js')
    .ignore('./src/js/jquery.min.js')
    .ignore('./src/js/jquery-ui.min.js')
    .ignore('./src/js/jquery.layout.min.js')
    .external(vendors) // Specify all vendors as external source
    .transform(babelify);
  const w = watchify(b)
    .on('update', () => {
        bundle(w);
        //reload();
    })
    .on('log', gutil.log);
    //.on("update", reload);
  return bundle(w)
});

gulp.task('app_watch:file', () =>{
    gulp.watch([PATHAPP+'/index.html'],['app_html:copy']).on("change", reload);
});

gulp.task('watch', ['app_watch:index.js','app_watch:file']);

//clean folder
//http://stackoverflow.com/questions/24396659/how-to-clean-a-project-correctly-with-gulp
gulp.task('clean', (cb) => {
  del.sync(['public'], cb);//
  //return;
});

gulp.task('src:server', () => {
    return gulp.src(['src/index.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
		//.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

//server host default 0.0.0.0:80
gulp.task('serve', ()=> {
  //var server = gls.static('public', 80);
  var server = gls.new('dist/index.js');
  server.start();
  return;
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "public"
        }
    });
    gulp.watch(['src/*.css','src/**/*.css'],['css:copy','app_css:copy']);
});

// build order
// clean = delete pulbic folder for clean up
// copy = html, js
// build:vendor = build angular 2 (take time to build vender to show on build)
// build = app javascript
// watch = watch files changes
// serve =setup server url http://127.0.0.1:80
//gulp.task('dev', ['clean','copy','build:vendor','build','watch','serve']);

gulp.task('app_dev:cleanbuild', ['clean','copy','assets:copy','js:copy','build:vendor.js','build:app.js','watch','browser-sync']);

gulp.task('app_dev:build', ['copy','build:app.js','watch','src:server','serve','browser-sync']);
//gulp.task('app_dev:build', ['copy','build:app.js','watch','src:server','browser-sync']);

// default development build
gulp.task('default', ['app_dev:build']);

function bundle(b) {
  return b.bundle()
    .on('error', (e) => {
      console.error(e.stack);
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(PATHAPP_OUT));
}
