'use strict';

require('./index.css');
require('pages/common/header/index.js');
require('pages/common/nav-head/index.js');
require('pages/common/card/index.css');
require('./select2/generate.js');
require('./nav-top/index.js');
require('./nav/index.js')
require('./nav-side/index.js');
require('./search-result/index.js');
require('./search-complex/index.js');

var _patent = require('utils/patent.js');
var _searchResult = require('./search-result/index.js');
_searchResult.display();

$(document).ready(function(){
    _patent.request({
        //发data到服务器地址
        url : 'http://wanlinke.com',
        data : submit_data,// 向后端发送请求选择项
        success: function(res){
            $("#select2-choose").select2({
                tags: true,
                multiple: true,
                data: res.choose
            });//启动select2
        
            $("#select2-item-person").select2({
                data: res.itemPerson
            });
        },
        error: function(err){
            console.log(err);
        }
    });
    _searchResult.display();
    
});