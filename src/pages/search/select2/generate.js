/*
*设置select2的选项设置（与后端交互）
*向后端发送请求，获取选项列表，并启动select2实例
*/
'use strict';

var _patent = require('utils/patent.js');
var _select2 = {
    generate : function(){
        _patent.request({
            //发data到服务器地址
            url    : 'http://wanlinke.com/requirelist',
            method : 'post',
            data   : {require_list: ["country"]},// 向后端发送请求选择项
            success: function(res){
                $("#select2-item-nation").select2({
                    tags: true,
                    multiple: true,
                    data: res.country
                });//启动select2
            },
            error: function(err){
                console.log(err);
            }
        });
    }
}
_select2.generate();