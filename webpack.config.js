module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'dist/react-router-preload.js',
        libraryTarget: 'var'
    },
    externals: {
        react: true,
        'react-router-config': true,
        history: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/i
            }
        ]
    }
};
