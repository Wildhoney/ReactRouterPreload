var config = require('./webpack.config');

module.exports = {
    ...config,
    entry: ['babel-polyfill', './example/js/client.js'],
    output: {
        filename: 'example/build/index.js',
        libraryTarget: 'var'
    }
};
