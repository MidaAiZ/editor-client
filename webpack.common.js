let path = require('path')
let VueLoaderPlugin = require('vue-loader/lib/plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    entry:{
        'background':'./src/background/background.js',
        'content':'./src/content/content.js',
        'option':'./src/option/option.js',
        'newtab':'./src/newtab/newtab.js',
        'popup':'./src/popup/popup.js',
    },
    output:{
        path: path.resolve(__dirname, './dist'),
        publicPath: './',
        filename: '[name].main.js'
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'option.html',
            template: 'src/option/option.html',
            inject: 'body',
            chunks: ["option"],
            minify: { //压缩
                removeComments: true,
                collapseWhitespace: true,
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: 'src/popup/popup.html',
            inject: 'body',
            chunks: ["popup"],
            minify: { //压缩
                removeComments: true,
                collapseWhitespace: true,
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'newtab.html',
            template: 'src/newtab/newtab.html',
            inject: 'body',
            chunks: ["newtab"],
            minify: { //压缩
                removeComments: true,
                collapseWhitespace: true,
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {from:path.resolve(__dirname,'manifest.json'),to:''},
            {from:path.resolve(__dirname,'chrome_locales/'), to:'_locales/'},
            {from:path.resolve(__dirname,'static/'), to:'static/'}
        ])
    ],
    module:{
        rules:[
            {
                test: /\.vue$/,
                use:'vue-loader'
            },
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            {
                test:/\.css$/,
                use:['vue-style-loader','css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // 将 JS 字符串生成为 style 节点
                    "css-loader", // 将 CSS 转化成 CommonJS 模块
                    "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]?[hash]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]')
                        }
                    }
                ]
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'src': path.resolve(__dirname,'src'),
        }
    },
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 600
    }
}
