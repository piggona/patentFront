'use strict';


require('./index.css');
var _patent = require('utils/patent.js');
var _searchResult = require('pages/search/search-result/index.js');

var header = {
    init : function(){
        this.bindEvent();
    },
    onload : function(){
        var keyword= _patent.getUrlParam('keyword');
        //若url中keyword存在，则回填到搜索框上，此步可以放到searchSubmit中作为post解决方案
        if (keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvent : function(){
        // 两个回调函数
        var _this = this;
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入提交后，做搜索提交
        $('#search-input').keyup(function(e){
            if(e.keycode === 13){
                _this.searchSubmit();
            }
        });
    },
    //搜索所有的输入,使用id查找，并提交。
    searchSubmit : function(){
        window.location.href = './multi-search.html?keyword=' + $('#simple-search').val();
    }
};

header.init();