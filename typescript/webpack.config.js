const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

// console.log(path.resolve('./66tslint.json'))

module.exports = {
    mode: "development",
    context: __dirname,
    entry: "./src/Animal.ts",
    devtool: "inline-source-map",
    output: {
        filename: "app.[chunkhash].js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [ '.ts' ],
        plugins: [
            new TsconfigPathsPlugin({ 
                configFile: path.resolve(__dirname, './tsconfig.json')
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        context: __dirname
                    }
                },
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