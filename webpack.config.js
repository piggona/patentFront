var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var WEBPACK_ENV = process.env.WEBPACK_ENV||'dev';
//获取htmlWebpackplugin参数
var getHtmlConfig = function(name){
    return {
        //模板路径
        template : './src/views/' + name + '.html',
        //打包文件路径
        filename : 'view/' + name + '.html',
        inject   : true,
        hash     : true,
        //打包的html中引入的js模块名
        chunks   : ['common',name]
    }
};
var config = {
    entry: {
        'common' : ['./src/pages/common/index.js'],
        'detail' : ['./src/pages/detail/index.js'],
        'search' : ['./src/pages/search/index.js'],
    },
    output: {
        path      : path.resolve(__dirname,'./dist'),
        publicPath: '/dist',
        filename  : 'js/[name].js'
    },
    module: {
        rules: [
            { test: /\.css$/, use: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(png|jpg|woff|svg|eot|ttf|gif|jpeg)\??.*$/, use: "url-loader?limit=100000&name=resource/[name].[ext]" },
            { test: /\.(woff|svg|eot|ttf)\??.*$/, use: 'style-loader!css-loader'},
        ]
    },
    plugins: [
        // 把css单独打包到文件中
        new ExtractTextPlugin("css/[name].css"),

        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('detail')),
        new HtmlWebpackPlugin(getHtmlConfig('search'))
    ],
    resolve: {
        alias : {
            utils : __dirname + '/src/utils',
            pages : __dirname + '/src/pages',
            views : __dirname + '/src/views',
            images: __dirname + '/src/images',
        }
    },
    externals: {
        'jquery': 'window.jQuery'
    },
};

if ('dev'===WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
};

module.exports = config;