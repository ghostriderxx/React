const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: [
        "./src/ThrottleScroll.js"
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: "source-map",
    devServer: {
        publicPath: "/",
        port: 9001,
        open: true,
        hot: true,
        inline: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
};
