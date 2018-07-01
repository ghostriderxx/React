const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: {
        react_demo: './src/react-demo.js',
        redux_form_utils_demo: './src/redux-form-utils-demo.js',
        redux_form_demo: './src/redux-form-demo.js'
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
    ]
};
