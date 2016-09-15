const config = require('./config');

const gulp = require('gulp');
const git = require('gulp-git');
const replace = require('gulp-replace');
const flatten = require('gulp-flatten');
const rename = require('gulp-rename');
const rm = require('gulp-rimraf');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

const fs = require('fs');

const template = fs.readFileSync('./src/Template.js', 'utf8');
const templateParts = template.match(/([\s\S]*)({PATH})([\s\S]*)/);

gulp.task('clean', function() {
    gulp.src('dist/*').pipe(rm())
});

gulp.task('clone', ['clean'], () =>
    git.clone(config.sourceRepo)
);

gulp.task('base', ['clean'], () =>
    gulp.src('./src/Icon.js')
        .pipe(babel({
            presets: ['es2015', 'stage-2', 'react']
        }))
        .pipe(gulp.dest('icons'))
);

gulp.task('icons', ['clone'], () =>
    gulp.src(config.sourceFiles)
        .pipe(replace(/(<svg[^>]*>)([\s\S]*)(<\/svg>)/g, templateParts[1] + '$2' + templateParts[3]))
        .pipe(rename(path => {
            const core = path.basename.match(/ic_(.*)_(26x)?24px/)[1];
            path.basename = core.replace(/(^.)|_([a-z])/g, x => x.slice(-1).toUpperCase());
            path.extname = '.js';
            console.log(path.basename);
        }))
        .pipe(flatten())
        .pipe(plumber())
        .pipe(babel({
            presets: ['react']
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('icons'))
);

gulp.task('babel', ['icons'], () =>
    gulp.src('./icons/*.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['react']
        }))
        .pipe(gulp.dest('icons'))
);

gulp.task('default', ['base', 'icons']);
