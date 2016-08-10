// generated on 2016-07-30 using generator-gulp-webapp 1.1.1
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

import ts from "gulp-typescript";
import browserify from 'browserify';
import tsify from 'tsify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';


const $ = gulpLoadPlugins();
const reload = browserSync.reload;

var config ={
    src: "src/",
    tmp: ".tmp/",
    dist: "www/",
    images_dir: "src/assets/images",
}

gulp.task('styles', () => {
  return gulp.src(config.src + '/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(gulp.dest('www/styles'))
    .pipe(reload({stream: true}));
});

gulp.task("typescript", function () {
  return browserify({
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {},
        transform: "babelify"
    })
    .plugin(tsify)
    .on('error', onError)
    .transform("babelify", {presets: ['es2015']})
    .bundle()
    .pipe(source('bundle.js')) // concat all source into one file
    .pipe(buffer())
    // .pipe($.uglify())
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(config.dist))
    .pipe(gulp.dest('.tmp/'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src(config.src + '/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(gulp.dest(config.src+ '/scripts'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint(config.src + 'www/scripts/js/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['styles' ,'typescript'], () => {
  return gulp.src(config.src + '/*.html')
    .pipe($.useref({searchPath: ['.tmp', config.src, '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest(config.dist));
});

gulp.task('images', () => {
  return gulp.src(config.images_dir + '/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('www/assets/images/'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('src/assets/fonts/**/*'))
    .pipe(gulp.dest('.tmp/assets/fonts/'))
    .pipe(gulp.dest('www/assets/fonts/'));
});

/*copy everything else to destination - good for assets and stuff*/
gulp.task('extras', () => {
  return gulp.src([
    config.src + '/*.*',
    config.src + '/**/*.*',
    '!src/lib/*.*',
    '!src/*.html',
    '!**/*.ts'
  ], {
    dot: true
  }).pipe(gulp.dest(config.dist));
});

gulp.task('clean', del.bind(null, ['.tmp', config.dist]));

gulp.task('serve', ['styles','typescript', 'scripts', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', config.src],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    config.src + '/*.html',
    '.tmp/scripts/**/*.js',
    config.src + '/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch(config.src + '/styles/**/*.scss', ['styles']);
  gulp.watch(config.src + '/scripts/**/*.ts', ['typescript']);
  gulp.watch(config.src + '/scripts/**/*.js', ['scripts']);
  gulp.watch(config.src + '/assets/fonts/**/*', ['fonts']);
  gulp.watch(config.src + '/assets/style/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', ['build'] ,() => {
  browserSync({
    notify: false,
    port: 9000,
    ghostMode: false,
    server: {
      baseDir: [config.dist]
    }
  });

  gulp.watch([
    config.src + '/*.html',
    'www/scripts/**/*.js',
    'www/**/*.js',
    config.src + '/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch(config.src + '/assets/**/*', ['extras']);
  gulp.watch(config.src + '/styles/**/*.scss', ['styles']);
  gulp.watch(config.src + '/scripts/**/*.ts', ['typescript']);
  gulp.watch(config.src + '/*.ts', ['typescript']);
  gulp.watch(config.src + '/scripts/**/*.js', ['scripts']);
  gulp.watch(config.src + '/assets/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src(config.src + '/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest(config.src + '/styles'));

  gulp.src(config.src + '/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest(config.src));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src(config.dist + '/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});


function onError(err) {
  console.log(err);
  this.emit('end');
}