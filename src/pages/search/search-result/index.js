/*
*展示搜索结果:
*持久化数据记录(search),展示持久化数据记录
*/
'use strict';
require('./index.css');
var _patent = require('utils/patent.js');
var _result = require('html-loader!./result.html');
var _static = require('html-loader!./static.html');

var _searchResult = {
    displayPack : [],
    resultTemplate : _result,
    // publicId   : '',
    // title      : '',
    // patentee   : '',
    // publicDate : '',
    // IPC        : '',

    result     : function(result){
        // 存储搜索结果,结果格式为json数组
        this.displayPack = result;
        console.log(this.displayPack)
    },

    display    : function(){
        // 在DOM中插入需要展示的查询结果
        var _displayPack = this.displayPack;
        console.log(_displayPack);
        $('#search-result').html("");
        $('#comments-result').html("");
        if (this.displayPack.length === 0){
            console.log(this.displayPack.length)
            $('#comments-result').append(_static);
        }
        for(let i=0,l=_displayPack.length;i<l;i++){
            $('#search-result').append(_patent.renderHtml(_result,_displayPack[i]));
        }
    }
}

module.exports = _searchResult;