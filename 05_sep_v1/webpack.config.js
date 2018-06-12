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
        publicPath: "/",
        port: 9000,
        open: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
        host: "0.0.0.0",
        proxy: {
            "/sep": "http://10.1.91.213:8580/"
        },
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
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
};
