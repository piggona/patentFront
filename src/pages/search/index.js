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
    $("#search-option").change(function(){
        var selected=$(this).children('option:selected').val();
        var content_id= require('html-loader!pages/search/search-complex/content-id.html');
        var content_person= require('html-loader!pages/search/search-complex/content-person.html');
       // alert(selected);
       console.log('测试选项'+selected);
        if(selected=="patent-id"){
            //document.getElementById("search_content_id").
            $(this).next().remove();
            $(this).next().remove();
            $(this).after(content_id);
            $("#select2-item-id").select2({
                tags: true,
                multiple: true,
                data: [{id: 0, text: 'IPC专利号'}, {id: 1, text: '专利所有人'}, {id: 2, text: '专利所在公司'}]
            });//启动select2
        }else if(selected=="patent-person"){
            $(this).next().remove();
            $(this).next().remove();
            $(this).after(content_person);
            $("#select2-item-person").select2({
                data: [{id: 0, text: '新泽西'}, {id: 1, text: '何旭东'}]
            });
        }
    });
});