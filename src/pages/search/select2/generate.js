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
            $("#select2-item-person").select2({
                tags: true,
                multiple: true,
                data: res.itemPerson
            });//启动select2
        
            $("#select2-item-nation").select2({
                tags: true,
                multiple: true,
                data: res.itemNation
            });//启动select2
            $('#select2-item-type').select2({
                tags: true,
                multiple: true,
                data: res.itemType
            })
            $('#select2-item').select2({
                tags: true,
                multiple: true,
                data: res.item
            })
        },
        error: function(err){
            console.log(err);
        }
    });
    $("#select2-item-person").select2({
        data: [{id: 0, text: '新泽西'}, {id: 1, text: '何旭东'}, {id: 2, text: '哈哈'}]
    });
    $("#select2-item-nation").select2({
        tags: true,
        multiple: true,
        data: [{id: 0, text: '中国'}, {id: 1, text: '日本'}, {id: 2, text: '美国'}]
    });//启动select2
    $('#select2-item-type').select2({
        tags: true,
        multiple: true,
        data: [{id: 0, text: '汽车'}, {id: 1, text: '光学'}, {id: 2, text: '经济'},{id: 3, text: '人工智能'},{id: 4, text: '网络'},{id: 5, text: '声学'},{id: 6, text: '计算机'},{id: 7, text: '影像'},{id: 8, text: '艺术'}]
    })
    $('#select2-item').select2({
        tags: true,
        multiple: true,
        data: [{id: 0, text: '专利id检索'}, {id: 1, text: '专利名称检索'}, {id: 2, text: '专利国家检索'},{id: 3, text: '专利类型检索'},{id: 4, text: '专利所有人检索'}]
    })
});