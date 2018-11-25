const path = require('path')

module.exports = {
    mode: "production",
    context: __dirname,
    entry: "./src/index.ts",
    output: {
        filename: "app.js",
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
    }
}