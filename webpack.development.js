var config = require('./webpack.config');
const Uglify = require('uglifyjs-webpack-plugin');

module.exports = {
    ...config,
    entry: './example/js/index.js',
    output: {
        filename: 'example/build/index.js',
        libraryTarget: 'var'
    },
    plugins: [
        new Uglify({
            uglifyOptions: {
                ecma: 8
            }
        })
    ]
};
