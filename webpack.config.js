var webpack = require('webpack');

var config = {
    entry: {
        'common' : ['./src/pages/common/index.js'],
        'detail' : ['./src/pages/detail/index.js'],
        'search' : ['./src/pages/search/index.js'],
    },
    output: {
        path      : './dist',
        publicPath: '/dist/',
        filename  : 'js/[name].js'
    },
    module: {

    },
    plugins: {

    },
    resolve: {
        alias : {
            utils : __dirname + '/src/utils',
            pages : __dirname + '/src/pages',
            views : __dirname + '/src/views',
            images: __dirname + '/src/images',
        }
    },
    externals: {

    }
};

module.exports = conifg;