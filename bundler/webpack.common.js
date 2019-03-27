const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    plugins:
    [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        }),
        new CopyWebpackPlugin([{
            from : 'static'
        }])
    ],
    entry: './src/index.js',
    output:
    {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    module:
    {
        rules:
        [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|svg|obj|mtl)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use:
                [
                    'html-loader'
                ]
            }
        ]
    }
}