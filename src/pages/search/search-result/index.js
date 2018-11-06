/*
*展示搜索结果:
*持久化数据记录(search),展示持久化数据记录
*/
'use strict';
require('./index.css');
var _patent = require('utils/patent.js');
var _result = require('html-loader!./result.html');

var _searchResult = {
    displayPack : [{patent_uuid:'uspto_USD0746618S1',documentId:'publicId',title:'title',assignees:'patentee',publishedDate:'publicDate',uspc:'IPC'},{patent_uuid:'uspto_USD0746618S1',documentId:'publicId',title:'title',assignees:'patentee',publishedDate:'publicDate',uspc:'IPC'}],
    resultTemplate : _result,
    // publicId   : '',
    // title      : '',
    // patentee   : '',
    // publicDate : '',
    // IPC        : '',

    result     : function(result){
        // 存储搜索结果,结果格式为json数组
        this.displayPack = result;
    },

    display    : function(){
        // 在DOM中插入需要展示的查询结果
        var _displayPack = this.displayPack;
        console.log(_displayPack);
        $('#search-result').html("");
        for(let i=0,l=_displayPack.length;i<l;i++){
            $('#search-result').append(_patent.renderHtml(_result,_displayPack[i]));
        }
    }
}

module.exports = _searchResult;