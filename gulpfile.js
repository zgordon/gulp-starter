var 	gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	paths = {
		html: {
			all: '*.html'
		},
		sass: {
			main: './src/sass/style.scss',
			all: './src/sass/**/*.scss',
			dest: './dist/css/'
		},
		js: {
			all: ['./src/js/data.js',
				'./src/js/helpers.js',
				'./src/js/model.js',
				'./src/js/router.js',
				'./src/js/view.js',
				'./src/js/editor.js',
				'./src/js/app.js'],
			dest: './dist/js/'
		}
	};

gulp.task('bundlehtml', function(){
	return gulp.src(paths.html.all)
		.pipe(plugins.connect.reload());
});
gulp.task('bundlesass', function(){
	return gulp.src(paths.sass.main)
		.pipe(plugins.plumber())
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass({outputStyle: 'compressed'}).on('error', plugins.sass.logError))
		.pipe(plugins.sourcemaps.write())
		.pipe(gulp.dest(paths.sass.dest))
		.pipe(plugins.connect.reload());
});

gulp.task('bundlejs', function(){
	return gulp.src(paths.js.all)
		.pipe(plugins.plumber())
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format())
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('bundle.js'))
		.pipe(plugins.sourcemaps.write())
		.pipe(gulp.dest(paths.js.dest))
		.pipe(plugins.uglify())
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(plugins.sourcemaps.write())
		.pipe(gulp.dest(paths.js.dest))
		.pipe(plugins.connect.reload());

});

gulp.task('connect',function(){
	plugins.connect.server({
		root: './',
		livereload: true
	});
});

gulp.task('watch', function(){
	gulp.watch([paths.html.all], ['bundlehtml'] );
	gulp.watch([paths.js.all], ['bundlejs']);
	gulp.watch([paths.sass.all], ['bundlesass']);
});

gulp.task('default', ['connect', 'watch']);
