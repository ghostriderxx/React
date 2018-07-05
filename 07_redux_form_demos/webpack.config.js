const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        "01_simple": './src/01_simple.js',
        "02_syncValidation": './src/02_syncValidation.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    devtool: "source-map",
    devServer: {
        publicPath: "/",
        port: 9000,
        open: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
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
        new HtmlWebpackPlugin({
            filename: '01_simple.html',
            chunks: ['01_simple'],
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app'
        }),
        new HtmlWebpackPlugin({
            filename: '02_syncValidation.html',
            chunks: ['02_syncValidation'],
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app'
        }),
        new HtmlWebpackPlugin({
            filename: '03_fieldLevelValidation.html',
            chunks: ['03_fieldLevelValidation'],
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app'
        }),
    ]
};
