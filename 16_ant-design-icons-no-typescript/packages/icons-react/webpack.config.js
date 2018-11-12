const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

const banner = `${pkg.name} ${pkg.version}`;

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        library: 'AntDesignReactIcon',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [new webpack.BannerPlugin(banner)]
};
