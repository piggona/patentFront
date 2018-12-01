/*
*复杂/多次搜索
*功能：读取标签（nav-top），与表单输入内容，向后端请求查询，并展示查询
*/
'use strict';


require('./index.css');
require('bootstrap/js/src/collapse.js');
var _select2 = require('pages/search/select2/generate.js');
var _patent = require('utils/patent.js');
var _searchResult = require('pages/search/search-result/index.js');
var _patentTitle = require('html-loader!./tr/patent.html');
var _paperTitle = require('html-loader!./tr/paper.html');
var _foundTitle = require('html-loader!./tr/found.html');
var _corpTitle = require('html-loader!./tr/corp.html');
var _personTitle = require('html-loader!./tr/person.html');
var _foundSide = require('html-loader!./side/foundside.html');
var _paperSide = require('html-loader!./side/paperside.html');
var _static = require("html-loader!./static.html");

var header_multi = {
    search_phrase : {"type": "prime","sort": "relativity", "from": 0, "size": 10, "query": [{"attr": "_all","query": "","logic": ""},{"attr": "patentType","query": "","logic": ""},{"attr": "inventors.name.raw","query": "","logic": ""},{"attr": "assignees.name.raw","query": "","logic": ""},{"attr": "classification.uspc.raw","query": "","logic": ""},{"attr": "country","query": "","logic": ""},{"attr": "documentDate.iso","query": "","logic": ""},{"attr":"title","query":"","logic":""},{"attr":"digest","query":"","logic":""}]},
    init : function(){
        this.bindEvent();
    },
    pageinit : function(){
        var basic_query = {"type": "basic","query": ""};
        var keyword = _patent.getUrlParam("keyword");
        var searchtype = _patent.getUrlParam("type");
        if(searchtype === "searchpatent")
        {
            $('#search-result-tr').html("");
            $('#search-result-tr').append(_patentTitle);
        }else if(searchtype === "searchpaper"){
            $('#search-result-tr').html("");
            $('#search-result-tr').append(_paperTitle);
            $('.search-side').html("");
            $('.search-side').append(_paperSide);
        }else if(searchtype === "searchfound"){
            $('#search-result-tr').html("");
            $('#search-result-tr').append(_foundTitle);
            $('.search-side').html("");
            $('.search-side').append(_foundSide);
        }else if(searchtype === "searchcorp"){
            $('#search-result-tr').html("");
            $('#search-result-tr').append(_corpTitle);
        }else{
            $('#search-result-tr').html("");
            $('#search-result-tr').append(_personTitle);
        }
        basic_query["query"] = keyword;
        this.searchSubmit(basic_query);
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
            _this.getAllSubmit();
            _this.search_phrase["from"]=0;
            _this.searchSubmit(_this.search_phrase);
        });
        $('#reset-button').click(function(){
            _this.resetAll();
        });
        $('#next-page').click(function(){
            _this.nextPage();
            _this.searchSubmit(_this.search_phrase);
        });
        $('.nav-link-result').click(function(){
            _this.changeSort();
            _this.search_phrase["from"]=0;
            _this.searchSubmit(_this.search_phrase);
        })
        $('.card-tools .btn-tool').click(function(){
            let btn = $(this).children("i").attr("class");
            if(btn === "fa fa-minus"){
                $(this).children("i").attr("class","fa fa-plus");
            }else{
                $(this).children("i").attr("class","fa fa-minus");
            }
        })
        $(document).keyup(function(e){
            var key = e.which;
            if(key === 13){
                console.log("13")
            }
        });
    },
    changeSort : function(){
        var _this = this;
        console.log($('.nav-link-result.active').attr('value'));
        _this.search_phrase['sort'] = $('.nav-link-result.active').attr('value');
    },
    nextPage : function(){
        var _this = this;
        var previous = _this.search_phrase['from'];
        _this.search_phrase['from'] = previous+_this.search_phrase['size'];
        console.log(_this.search_phrase);
    },
    // getPatentSubmit : function(){
    //     var _this = this;
    //     var search_type = $('#multi-search-body-patent .form-group').find('input[type=checkbox]:checked').val();
    //     var patent_type = $('#multi-search-body-patent .patent-type').find('input[type=checkbox]:checked').val();
    //     var patent_query = $.trim($('#multi-search-body-patent .form-control').val());
    //     var query = _this.search_phrase['query'];
    //     query[0]['query'] =  $.trim(query[0]['query']+' '+patent_query);
    //     query[0]['logic'] = search_type;
    //     query[1]['query'] = patent_type;
        
    //     _this.search_phrase['query'] = query;
    //     console.log(_this.search_phrase);
    // },
    // getInventorSubmit : function(){
    //     var _this = this;
    //     var search_type = $('#multi-search-body-inventor .form-group').find('input[type=checkbox]:checked').val();
    //     var patent_query = $.trim($('#multi-search-body-inventor .form-control').val());
    //     var query = _this.search_phrase['query'];
    //     query[2]['query'] =  $.trim(query[2]['query']+' '+patent_query);
    //     query[2]['logic'] = search_type;
        
    //     _this.search_phrase['query'] = query;
    //     console.log(_this.search_phrase); 
    // },
    // getAssigneeSubmit : function(){
    //     var _this = this;
    //     var search_type = $('#multi-search-body-assignee .form-group').find('input[type=checkbox]:checked').val();
    //     var patent_query = $.trim($('#multi-search-body-assignee .form-control').val());
    //     var query = _this.search_phrase['query'];
    //     query[3]['query'] =  $.trim(query[3]['query']+' '+patent_query);
    //     query[3]['logic'] = search_type;
        
    //     _this.search_phrase['query'] = query;
    //     console.log(_this.search_phrase);
    // },
    // getClassSubmit : function(){
    //     var _this = this;
    //     var search_type = $('#multi-search-body-class .form-group').find('input[type=checkbox]:checked').val();
    //     var patent_query = $.trim($('#multi-search-body-class .form-control').val());
    //     var query = _this.search_phrase['query'];
    //     query[4]['attr'] = "classification."+search_type+".raw";
    //     query[4]['query'] =  patent_query;
    //     // query[4]['query'] = search_type;
        
    //     _this.search_phrase['query'] = query;
    //     console.log(_this.search_phrase);
    // },
    // getLocationSubmit : function(){
    //     var _this = this;
    //     var search_type = $('#multi-search-body-location .form-group').find('input[type=checkbox]:checked').val();
    //     var patent_query = $.trim($('#multi-search-body-location .form-control').val());
    //     var query = _this.search_phrase['query'];
    //     console.log(search_type);
    //     if(search_type === 'both')
    //     {
    //         query[5]['query'] =  patent_query;
    //     }
    //     else{
    //         query[5]['attr'] = search_type+".address.country";
    //         query[5]['query'] = patent_query;
    //     }
    //     _this.search_phrase['query'] = query;
    //     console.log(_this.search_phrase);
    // },
    // getDateSubmit : function(){
    //     var _this = this;
    //     var search_type = $('#multi-search-body-date .form-group').find('input[type=checkbox]:checked').val();
    //     var patent_query = $.trim($('#multi-search-body-date .form-control').val());
    //     var query = _this.search_phrase['query'];
    //     query[6]['attr'] = search_type+'Date.iso';
    //     query[6]['query'] =  patent_query;
        
    //     _this.search_phrase['query'] = query;
    //     console.log(_this.search_phrase);
    // },
    // getGovSubmit : function(){
    //     var _this = this;
    //     var search_type = $('#multi-search-body-gov .form-group').find('input[type=checkbox]:checked').val();
    //     var patent_query = $.trim($('#multi-search-body-gov .form-control').val());
    //     var query = _this.search_phrase['query'];
    //     // query[10]['query'] =  patent_query;
    //     // query[11]['query'] = search_type;
        
    //     _this.search_phrase['query'] = query;
    //     console.log(_this.search_phrase);
    // },
    //搜索所有的输入,使用id查找，并提交。
    searchSubmit : function(search_phrase){
        console.log(search_phrase);
        var _this = this;
        if ($.isEmptyObject(search_phrase))
        {
            //如果还没有填
            _patent.goHome();
        }
        else{
            _patent.request({
                //发data到服务器地址
                url : 'api/patent/search/',
                method : 'post',
                data : JSON.stringify(search_phrase),
                success: function(res){
                    console.log(res);
                    if(res){
                        _searchResult.result(res.data);
                        _searchResult.display();
                    }
                    else{
                        $('#search-result').html("");
                        $('#search-result').append(_static);
                    }
                },
                error: function(err){
                    console.log(err);
                    $('#search-result').html("");
                    $('#search-result').append(_static);
                }
            });
        }
        console.log(_searchResult.displayPack);
    },
    resetAll : function(){
        _searchResult.result([]);
        _searchResult.display();
        this.search_phrase = {"type": "prime","sort": "relativity", "from": 0, "size": 10, "query": [{"attr": "_all","query": "","logic": ""},{"attr": "patentType","query": "","logic": ""},{"attr": "inventors.name.raw","query": "","logic": ""},{"attr": "assignees.name.raw","query": "","logic": ""},{"attr": "classification.uspc.raw","query": "","logic": ""},{"attr": "country","query": "","logic": ""},{"attr": "documentDate.iso","query": "","logic": ""},{"attr":"title","query":"","logic":""},{"attr":"digest","query":"","logic":""}]};
    },
    getAllSubmit : function(){
        var _this = this;
        var patent_type = ""
        patent_type = $('#multi-search-body-patent .patent-type').find('input[type=checkbox]:checked').each(function(){
            let value = $(this).val()
            console.log(value)
            patent_type = patent_type+' '+value.toString()
            console.log(patent_type)
        });
        var query = _this.search_phrase['query'];
        query[1]['query'] = patent_type;
        let search_type = $('#multi-search-body-inventor .form-group').find('input[type=checkbox]:checked').val();
        let patent_query = $.trim($('#multi-search-body-inventor .form-control').val());
        query[2]['query'] =  $.trim(patent_query);
        query[2]['logic'] = search_type;
        search_type = $('#multi-search-body-assignee .form-group').find('input[type=checkbox]:checked').val();
        patent_query = $.trim($('#multi-search-body-assignee .form-control').val());
        query[3]['query'] =  $.trim(patent_query);
        query[3]['logic'] = search_type;
        search_type = $('#multi-search-body-class .form-group').find('input[type=checkbox]:checked').val();
        patent_query = $.trim($('#multi-search-body-class .form-control').val());
        query[4]['attr'] = "classification."+search_type+".raw";
        query[4]['query'] =  patent_query;
        search_type = $('#multi-search-body-location .form-group').find('input[type=checkbox]:checked').val();
        patent_query = $.trim($('#multi-search-body-location .form-control').val());
        if(search_type === 'both')
        {
            query[5]['query'] =  patent_query;
        }
        else{
            query[5]['attr'] = search_type+".address.country";
            query[5]['query'] = patent_query;
        }
        search_type = $('#multi-search-body-date .form-group').find('input[type=checkbox]:checked').val();
        patent_query = $.trim($('#multi-search-body-date .form-control').val());
        query[6]['attr'] = search_type+'Date.iso';
        query[6]['query'] =  patent_query;
        search_type = $('#multi-search-body-titlesearch .form-group').find('input[type=checkbox]:checked').val();
        patent_query = $.trim($('#multi-search-body-titlesearch .form-control').val());
        query[7]['logic'] = search_type;
        query[7]['query'] =  patent_query;
        search_type = $('#multi-search-body-digest.form-group').find('input[type=checkbox]:checked').val();
        patent_query = $.trim($('#multi-search-body-digest .form-control').val());
        query[8]['logic'] = search_type;
        query[8]['query'] =  patent_query;

        _this.search_phrase['query'] = query;
        console.log(_this.search_phrase);
    }
};
header_multi.init();
header_multi.pageinit();