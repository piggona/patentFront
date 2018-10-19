/*
*设置select2的选项设置（与后端交互）
*向后端发送请求，获取选项列表，并启动select2实例
*/
'use strict';

var _patent = require('utils/patent.js');

$(document).ready(function(){
    _patent.request({
        //发data到服务器地址
        url : 'http://wanlinke.com',
        data : [{id: 0, text: 'IPC专利号'}, {id: 1, text: '专利所有人'}, {id: 2, text: '专利所在公司'}],// 向后端发送请求选择项
        success: function(res){
            $("#select2-choose").select2({
                tags: true,
                multiple: true,
                data: data
            });//启动select2
        
            $("#select2-item-person").select2({
                data: data
            });
        },
        error: function(err){
            console.log(err);
        }
    });
    $("#select2-item-person").select2({
        data: [{id: 0, text: 'IPC专利号'}, {id: 1, text: '专利所有人'}, {id: 2, text: '专利所在公司'}]
    });
    $("#select2-item-id").select2({
        tags: true,
        multiple: true,
        data: [{id: 0, text: '新泽西'}, {id: 1, text: '何旭东'}, {id: 2, text: '哈哈'}]
    });//启动select2
});