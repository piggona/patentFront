/*
*复杂/多次搜索
*功能：读取标签（nav-top），与表单输入内容，向后端请求查询，并展示查询
*/
'use strict';


require('./index.css');
var _patent = require('utils/patent.js');

var header_multi = {
    search_phrase : null,
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
        $('#multi-search-button').click(function(){
            _this.searchSubmit();
        });
        $('#multi-search-button-second').click(function(){
            _this.secondSearchSubmit();
        });
    },
    //搜索所有的输入,使用id查找，并提交。
    searchSubmit : function(){
        var submit_data = {};
        var keyword = $.trim($('#search-input').val());
        var search_mode = $('.nav-side').attr("id");
        var search_index = $('.nav-link-search.active').attr("id");
        var search_body = {};
        if(!(selected_item === null)){
            // 向data加入keyword
            submit_data['search_mode'] = search_mode;
            submit_data['search_index'] = search_index;

            // id搜索结果
            search_body['method'] = $('.form-group-id .multi-search').val();
            search_body['value'] = $('#select2-item-id').val();
            submit_data['search_id'] = search_body;

            // 名称搜索结果
            search_body['method'] = $('.form-group-name .multi-search').val();
            search_body['value'] = $('#select2-item-name').val();
            submit_data['search_name'] = search_body;

            // 专利所有人搜索
            search_body['method'] = $('.form-group-patentee .multi-search').val();
            search_body['value'] = $('#select2-item-patentee').val();
            submit_data['search_patentee'] = search_body;

            // 专利国家搜索
            search_body['method'] = $('.form-group-nation .multi-search').val();
            search_body['value'] = $('#select2-item-nation').val();
            submit_data['search_nation'] = search_body;

            // 专利类型搜索
            search_body['method'] = $('.form-group-type .multi-search').val();
            search_body['value'] = $('#select2-item-type').val();
            submit_data['search_type'] = search_body;
        }
        if ($.isEmptyObject(submit_data))
        {
            //如果还没有填
            _patent.goHome();
        }
        else{
            _patent.request({
                //发data到服务器地址
                url : 'http://wanlinke.com/9200',
                data : submit_data,
                success: function(res){
                    if(res){
                        _searchResult.result(res.data);
                        _searchResult.display();
                    }
                    console.log(res);
                },
                error: function(err){
                    console.log(err);
                }
            });
        }
    },
    secondSearchSubmit : function(){

    }
};
$('#select2-item').change(function(){
    var selected_item = $('#select2-item').val();
    console.log(selected_item);
    $('.form-group-id').attr('class','form-group-id hide');
    $('.form-group-name').attr('class','form-group-name hide');
    $('.form-group-patentee').attr('class','form-group-patentee hide');
    $('.form-group-nation').attr('class','form-group-nation hide');
    $('.form-group-type').attr('class','form-group-type hide');
    if(!(selected_item === null)){
        for(let i=0,len=selected_item.length; i<len; i++) {
            let element = selected_item[i];
            if(element === '0'){
                $('.form-group-id').attr('class','form-group-id');
            }else if(element === '1'){
                $('.form-group-name').attr('class','form-group-name');
            }else if(element === "2"){
                $('.form-group-nation').attr('class','form-group-nation');
            }else if(element === "3"){
                $('.form-group-type').attr('class','form-group-type');
            }else if(element === "4"){
                $('.form-group-patentee').attr('class','form-group-patentee');
            }
        };
    }   
});
header_multi.init();