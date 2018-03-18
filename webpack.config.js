const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.resolve('js/'),
        filename: 'bundle.js'
    },

    devtool: "source-map",

    devServer: {
        contentBase: './'
    },

    module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader'
            },

            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }],

                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '../css/style.css',
            disable: false,
            allChunks: true
        }),
    ]
};