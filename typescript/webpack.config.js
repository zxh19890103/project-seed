const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    mode: "development",
    context: __dirname,
    entry: "./src/index.ts",
    devtool: "inline-source-map",
    output: {
        filename: "app.[chunkhash].js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [ '.ts' ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['./dist']),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}