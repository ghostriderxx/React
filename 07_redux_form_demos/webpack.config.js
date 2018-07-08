const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        "01_simple": './src/01_simple.js',
        "02_syncValidation": './src/02_syncValidation.js',
        "03_fieldLevelValidation": './src/03_fieldLevelValidation.js',
        "04_submitValidation": './src/04_submitValidation.js',
        "07_initializeFromState": "./src/07_initializeFromState.js",
        "09_remoteSubmit": "./src/09_remoteSubmit.js",
        "10_normalizing": "./src/10_normalizing.js",
        "12_selectingFormValues": "./src/12_selectingFormValues.js",
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
        new HtmlWebpackPlugin({
            filename: '04_submitValidation.html',
            chunks: ['04_submitValidation'],
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app'
        }),
        new HtmlWebpackPlugin({
            filename: '07_initializeFromState.html',
            chunks: ['07_initializeFromState'],
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app'
        }),
        new HtmlWebpackPlugin({
            filename: '09_remoteSubmit.html',
            chunks: ['09_remoteSubmit'],
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app'
        }),
        new HtmlWebpackPlugin({
            filename: '10_normalizing.html',
            chunks: ['10_normalizing'],
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app'
        }),
        new HtmlWebpackPlugin({
            filename: '12_selectingFormValues.html',
            chunks: ['12_selectingFormValues'],
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app'
        }),
    ]
};
