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

var header_multi = {
    search_phrase : {"type": "prime","sort": "relativity", "from": 0, "size": 10, "query": [{"attr": "_all","query": "","logic": ""},{"attr": "patentType","query": "","logic": ""},{"attr": "inventor.name.raw","query": "","logic": ""},{"attr": "assignee.name.raw","query": "","logic": ""},{"attr": "classification.uspc.raw","query": "","logic": ""},{"attr": "country","query": "","logic": ""},{"attr": "publishedDate","query": "","logic": ""}]},
    init : function(){
        this.bindEvent();
    },
    pageinit : function(){
        var basic_query = {"type": "basic","query": ""};
        var keyword = _patent.getUrlParam("keyword");
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
            _this.searchSubmit(_this.search_phrase);
        });
        $('#reset-button').click(function(){
            _this.resetAll();
        })
        $('#patent-btn').click(function(){
            _this.getPatentSubmit();
            _this.searchSubmit(_this.search_phrase);
        });
        $('#inventor-btn').click(function(){
            _this.getInventorSubmit();
            _this.searchSubmit(_this.search_phrase);
        });
        $('#assignee-btn').click(function(){
            _this.getAssigneeSubmit();
            _this.searchSubmit(_this.search_phrase);
        });
        $('#class-btn').click(function(){
            _this.getClassSubmit();
            _this.searchSubmit(_this.search_phrase);
        });
        $('#select2-item-nation').change(function(){
            _this.getLocationSubmit();
            _this.searchSubmit(_this.search_phrase);
        });
        $('#gov-btn').click(function(){
            _this.getGovSubmit();
            _this.searchSubmit(_this.search_phrase);
        });
        $('#date-btn').click(function(){
            _this.getDateSubmit();
            _this.searchSubmit(_this.search_phrase);
        })
    },
    getPatentSubmit : function(){
        var _this = this;
        var search_type = $('#multi-search-body-patent .form-group').find('input[type=checkbox]:checked').val();
        var patent_type = $('#multi-search-body-patent .patent-type').find('input[type=checkbox]:checked').val();
        var patent_query = $.trim($('#multi-search-body-patent .form-control').val());
        var query = _this.search_phrase['query'];
        query[0]['query'] =  $.trim(query[0]['query']+' '+patent_query);
        query[0]['logic'] = search_type;
        query[1]['query'] = patent_type;
        
        _this.search_phrase['query'] = query;
        console.log(_this.search_phrase);
    },
    getInventorSubmit : function(){
        var _this = this;
        var search_type = $('#multi-search-body-inventor .form-group').find('input[type=checkbox]:checked').val();
        var patent_query = $.trim($('#multi-search-body-inventor .form-control').val());
        var query = _this.search_phrase['query'];
        query[2]['query'] =  $.trim(query[2]['query']+' '+patent_query);
        query[2]['logic'] = search_type;
        
        _this.search_phrase['query'] = query;
        console.log(_this.search_phrase); 
    },
    getAssigneeSubmit : function(){
        var _this = this;
        var search_type = $('#multi-search-body-assignee .form-group').find('input[type=checkbox]:checked').val();
        var patent_query = $.trim($('#multi-search-body-assignee .form-control').val());
        var query = _this.search_phrase['query'];
        query[3]['query'] =  $.trim(query[3]['query']+' '+patent_query);
        query[3]['logic'] = search_type;
        
        _this.search_phrase['query'] = query;
        console.log(_this.search_phrase);
    },
    getClassSubmit : function(){
        var _this = this;
        var search_type = $('#multi-search-body-class .form-group').find('input[type=checkbox]:checked').val();
        var patent_query = $.trim($('#multi-search-body-class .form-control').val());
        var query = _this.search_phrase['query'];
        query[4]['query'] =  patent_query;
        // query[4]['query'] = search_type;
        
        _this.search_phrase['query'] = query;
        console.log(_this.search_phrase);
    },
    getLocationSubmit : function(){
        var _this = this;
        var search_type = $('#multi-search-body-location .form-group').find('input[type=checkbox]:checked').val();
        var patent_query = $.trim($('#multi-search-body-location .form-control').val());
        var query = _this.search_phrase['query'];
        query[5]['query'] =  patent_query;
        
        _this.search_phrase['query'] = query;
        console.log(_this.search_phrase);
    },
    getDateSubmit : function(){
        var _this = this;
        var search_type = $('#multi-search-body-date .form-group').find('input[type=checkbox]:checked').val();
        var patent_query = $.trim($('#multi-search-body-date .form-control').val());
        var query = _this.search_phrase['query'];
        query[6]['query'] =  patent_query;
        
        _this.search_phrase['query'] = query;
        console.log(_this.search_phrase);
    },
    getGovSubmit : function(){
        var _this = this;
        var search_type = $('#multi-search-body-gov .form-group').find('input[type=checkbox]:checked').val();
        var patent_query = $.trim($('#multi-search-body-gov .form-control').val());
        var query = _this.search_phrase['query'];
        // query[10]['query'] =  patent_query;
        // query[11]['query'] = search_type;
        
        _this.search_phrase['query'] = query;
        console.log(_this.search_phrase);
    },
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
                url : 'http://192.168.1.123:8000/patentapi/',
                method : 'post',
                data : JSON.stringify(search_phrase),
                success: function(res){
                    console.log(res);
                    if(res){
                        _searchResult.result(res.data);
                        _searchResult.display();
                    }
                },
                error: function(err){
                    console.log(err);
                }
            });
        }
        console.log(_searchResult.displayPack);
    },
    resetAll : function(){
        _searchResult.result('{}');
        _searchResult.display();
        this.search_phrase = {'type': 'prime','sort': 'relativity', 'from': 0, 'size': 10, 'query': [{'attr': 'patent','query': '','logic': ''},{'attr': 'patent_type','query': '','logic': ''},{'attr': 'inventor','query': '','logic': ''},{'attr': 'assignee','query': '','logic': ''},{'attr': 'patentClass','query': '','logic': ''},{'attr': 'patentClassSearch','query': '','logic': ''},{'attr': 'nation','query': '','logic': ''},{'attr': 'nationType','query': '','logic': ''},{'attr': 'date','query': '','logic': ''},{'attr': 'dateType','query': '','logic': ''},{'attr': 'gov','query': '','logic': ''},{'attr': 'govType','query': '','logic': ''}]};
    },
    getAllSubmit : function(){
        var _this = this;
        var search_type = $('#multi-search-body-patent .form-group').find('input[type=checkbox]:checked').val();
        var patent_type = $('#multi-search-body-patent .patent-type').find('input[type=checkbox]:checked').val();
        var patent_query = $.trim($('#multi-search-body-patent .form-control').val());
        var query = _this.search_phrase['query'];
        query[0]['query'] =  $.trim(patent_query);
        query[0]['logic'] = search_type;
        query[1]['query'] = patent_type;
        search_type = $('#multi-search-body-inventor .form-group').find('input[type=checkbox]:checked').val();
        patent_query = $.trim($('#multi-search-body-inventor .form-control').val());
        query[2]['query'] =  $.trim(patent_query);
        query[2]['logic'] = search_type;
        search_type = $('#multi-search-body-assignee .form-group').find('input[type=checkbox]:checked').val();
        patent_query = $.trim($('#multi-search-body-assignee .form-control').val());
        query[3]['query'] =  $.trim(patent_query);
        query[3]['logic'] = search_type;
        search_type = $('#multi-search-body-class .form-group').find('input[type=checkbox]:checked').val();
        patent_query = $.trim($('#multi-search-body-class .form-control').val());
        query[5]['query'] =  patent_query;
        query[4]['query'] = search_type;
        search_type = $('#multi-search-body-location .form-group').find('input[type=checkbox]:checked').val();
        patent_query = $.trim($('#multi-search-body-location .form-control').val());
        query[6]['query'] =  patent_query;
        query[7]['query'] = search_type;
        search_type = $('#multi-search-body-date .form-group').find('input[type=checkbox]:checked').val();
        patent_query = $.trim($('#multi-search-body-date .form-control').val());
        query[8]['query'] =  patent_query;
        query[9]['query'] = search_type;
        search_type = $('#multi-search-body-gov .form-group').find('input[type=checkbox]:checked').val();
        patent_query = $.trim($('#multi-search-body-gov .form-control').val());
        query = _this.search_phrase['query'];
        query[10]['query'] =  patent_query;
        query[11]['query'] = search_type;

        _this.search_phrase['query'] = query;
        console.log(_this.search_phrase);
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
header_multi.pageinit();