/*
*侧边栏选项块：
*功能：通过用户选择改变外观及标示标签，转换搜索的请求内容
*/
'use strict';
require('./index.css');


$(document).ready(function(){
        this.click=function(data){
            var selected = $(data);
            var former = $('#side_chosen');
            var standard_search = $('#standard_search');
            var second_search = $('#second_search');
            console.log(selected);
            former.attr("id","not_chosen")
            selected.attr("id","side_chosen");
            if (data === '.button1')
            {
                standard_search.attr("class","col-md-12");
                second_search.attr("class","col-md-12 hide");

            }else{
                standard_search.attr("class","col-md-12 hide");
                second_search.attr("class","col-md-12");
            }
        }
        window.SlideClick=this;
    }
)
