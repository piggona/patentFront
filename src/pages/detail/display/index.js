/*
*请求对应的查询内容
*/
var _patent = require('utils/patent.js');
require('./index.css');


$(document).ready(function(){
    
    _patent.request({
        //发data到服务器地址
        url : 'http://wanlinke.com/9200',
        data : "请求详情数据",
        success: function(res){
            if(res.keyword){
                $('#search-input').val(keyword);
                _searchResult.result(res.data);
                _searchResult.display();
            }
            console.log(res);
        },
        error: function(err){
            console.log(err);
        }
    }); 
});

var _display = {
    submit_data : {},
    display_data : {},
    onload : function(){
        var keyword= _patent.getUrlParam('keyword');
        //若url中keyword存在，则回填到搜索框上，此步可以放到searchSubmit中作为post解决方案
        if (keyword){
            $('#search-input').val(keyword);
        }
    },
    get_data : function(){
        this.submit_data['type'] = "detail_data";
        this.submit_data['patent_id'] = _patent.getUrlParam('id');
        var _this = this;
        _patent.request({
            //发data到服务器地址
            url : 'http://wanlinke.com/9200',
            data : _this.submit_data,
            success: function(res){
                if(res){
                    // 接收页面信息
                    _this.display_data = res.data;
                }
                console.log(res);
            },
            error: function(err){
                console.log(err);
            }
        }); 
    }
}