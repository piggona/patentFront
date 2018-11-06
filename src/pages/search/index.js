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
require('./search-simple/index.js');

var _patent = require('utils/patent.js');
var _searchResult = require('./search-result/index.js');
_searchResult.display();
$(document).ready(function(){
    $("#select2-item-nation").select2({
        tags: true,
        multiple: true,
        data: [{id: 0, text: '中国'}, {id: 1, text: '日本'}, {id: 2, text: '美国'}]
    });//启动select2
});
// $(document).ready(function(){
//     $("#search-option").change(function(){
//         var selected=$(this).children('option:selected').val();
//         var content_id= require('html-loader!pages/search/search-complex/content-id.html');
//         var content_person= require('html-loader!pages/search/search-complex/content-person.html');
//        // alert(selected);
//        console.log('测试选项'+selected);
//         if(selected=="patent-id"){
//             //document.getElementById("search_content_id").
//             $(this).next().remove();
//             $(this).next().remove();
//             $(this).after(content_id);
//         }else if(selected=="patent-person"){
//             $(this).next().remove();
//             $(this).next().remove();
//             $(this).after(content_person);
//         }
//     });
// });