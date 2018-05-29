const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: ["babel-polyfill", './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: "source-map",
    devServer: {
        publicPath: "/dist/",
        port: 9000,
        open: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
        host: "0.0.0.0",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
};
