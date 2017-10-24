var config = require('./webpack.config');

module.exports = {
    ...config,
    entry: './src/index.js',
    output: {
        filename: 'dist/react-router-preload.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        react: true,
        'react-router-dom': true,
        'react-router-config': true,
        'prop-types': true
    }
};
