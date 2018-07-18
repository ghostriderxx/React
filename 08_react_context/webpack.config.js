const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: [
        "./src/index.js"
    ],
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
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
};
