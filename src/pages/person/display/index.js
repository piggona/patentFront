'use strict';

require('./index.css');
var _result = require('html-loader!./result.html');
var _patent = require('utils/patent.js');
var _statics = require('html-loader!./static.html');

var _display = {
    display_data : {},
    init : function(){
        this.get_data();
    },
    onload : function(){
        var keyword= _patent.getUrlParam('keyword');
        //若url中keyword存在，则回填到搜索框上，此步可以放到searchSubmit中作为post解决方案
        if (keyword){
            $('#search-input').val(keyword);
        }
    },
    get_data : function(){
        var submit_data = _patent.getUrlParam('inventor');
        var _this = this;
        _patent.request({
            //发data到服务器地址
            url : 'api/person/detail/'+submit_data,
            method : 'get',
            success: function(res){
                _this.display_data = res;
                let statics = res["statics"];
                res["title"]["createTime"] = res["title"]["createTime"].substr(0,10);
                console.log(res);
                if(res){
                    // 接收页面信息
                    $('#inventor-block').html("");
                    $('#inventor-block').append(_patent.renderHtml(_result,res["title"]));
                    $('#person-static-block').html("");
                    $("#person-static-block").append(_patent.renderHtml(_statics,statics));
                }
                
            },
            error: function(err){
                console.log(err);
            }
        }); 
    }
}
_display.init();
