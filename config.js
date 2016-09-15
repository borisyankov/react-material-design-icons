module.exports = {
    sourceRepo: 'https://github.com/google/material-design-icons',
    sourceFiles: './material-design-icons/**/*24px.svg',
    renamer: path => {
        const core = path.basename.match(/ic_(.*)_(26x)?24px/)[1];
        path.basename = core.replace(/(^.)|_([a-z])/g, x => x.slice(-1).toUpperCase());
        path.extname = '.js';
    }
};
