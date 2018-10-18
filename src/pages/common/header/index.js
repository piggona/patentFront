/*
*页面头部的交互：
*功能：用户的登录与退出，与CAS系统的交互
*实现：调用util中的请求模块实现系统的登入登出，
*用户调用静态页面，页面发送ajax请求，请求发送到后端进行登录验证，根据返回值进行请求返回展示
*/
'use strict';
require('./index.css');

var _patent = require('utils/patent.js');

var header = {
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
        var _this = this;
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入提交后，做搜索提交
        $('#search-input').keyup(function(e){
            if(e.keycode === 13){
                _this.searchSubmit();
            }
        });
    },
    //搜索所有的输入,使用id查找，并提交。
    searchSubmit : function(){
        var submit_data = {};
        var keyword = $.trim($('#search-input').val());
        if(keyword){
            // 向data加入keyword
            submit_data['keyword'] = keyword;
        }
        if ($.isEmptyObject(submit_data))
        {
            //如果还没有填
            _patent.goHome();
        }
        else{
            _patent.request({
                //发data到服务器地址
                url : 'http://wanlinke.com',
                data : submit_data,
                success: function(res){
                    if(res.keyword){
                        $('#search-input').val(keyword);
                    }
                    console.log(res);
                },
                error: function(err){
                    console.log(err);
                }
            });
        }
    }
};

header.init();