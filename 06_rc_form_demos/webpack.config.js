const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        getFieldDecorator: './src/getFieldDecorator.js',
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
            filename: 'getFieldDecorator.html',

            // Required
            inject: false,
            template: require('html-webpack-template'),
            // template: 'node_modules/html-webpack-template/index.ejs',

            // Optional
            appMountId: 'app'
        })
    ]
};
