/*
*请求对应的查询内容
*/
var _patent = require('utils/patent.js');
require('./index.css');
var _result = require('html-loader!./result.html');
var _fullText = require('html-loader!./fullText.html');



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
        var submit_data = _patent.getUrlParam('patent_uuid');
        var _this = this;
        _patent.request({
            //发data到服务器地址
            url : 'http://10.210.17.107:8000/api/patent/detail/'+submit_data,
            method : 'get',
            success: function(res){
                _this.display_data = res;
                console.log(res);
                if(res){
                    // 接收页面信息
                    var inventor = res.inventors;
                    var inventor_name = _this.get_name(inventor);
                    console.log("inventor_name");
                    console.log(inventor_name);
                    var assignees = res.assignees;
                    var assignees_name = _this.get_assignees(assignees);
                    var classification = res.classification;
                    var classification_name = _this.get_classification(classification);
                    res['inventor_name'] = inventor_name;
                    res['assignees_name'] = assignees_name;
                    res['classification_name'] = classification_name;

                    $('#display-container').html("");
                    $('#display-container').append(_patent.renderHtml(_result,res));
                    $('.login-panel').append(_patent.renderHtml(_fullText,res));

                    $("#full-text").click(function(){
                        console.log("click");
                        $('.detail').addClass('blur');
                        $('.elastic-layer').removeClass('close');
                        event.stopPropagation();
                    })
                    $(".login-panel").on('click',function(){
                        event.stopPropagation();
                    });
                
                    $('body').on('click',function(){
                        $('.detail').removeClass('blur');
                        $('.elastic-layer').addClass('close');
                    });
                }
                
            },
            error: function(err){
                console.log(err);
            }
        }); 
    },
    get_name : function(inventor){
        var inventor_name = [];
        for (let i=0;i<inventor.length; i++){
            if (JSON.stringify(inventor[i]) != "{}"){
                let name = {"name" : ""};
                name["name"]=inventor[i].name.raw;
                inventor_name.push(name);
            }
            else{
            }
        }
        return inventor_name;
    },
    get_assignees : function(assignees){
        var assignees_name = '';
        assignees_name = assignees[0].name.raw
        return assignees_name;
    },
    get_classification : function(classification){
        var classification_name = {"ipc": [],"uspc":[],"cpc":[]};
        var ipc = classification.ipc;
        var uspc = classification.uspc;
        var cpc = classification.cpc;
        console.log("ipc");
        console.log(ipc);
        console.log("uspc");
        console.log(uspc);
        console.log("cpc");
        console.log(cpc);
        for(let i=0;i<ipc.length;i++){
            if (JSON.stringify(ipc[i]) != "{}"){
                let content = {"content" : ""};
                content["content"] = ipc[i].raw;
                classification_name["ipc"].push(content);
            }
            else{
            }
        }
        for(let i=0;i<uspc.length;i++){
            console.log("pc");
            console.log(JSON.stringify(uspc[i]));
            if (JSON.stringify(uspc[i]) != "{}"){
                let content = {"content" : ""};
                content["content"] = uspc[i].raw;
                classification_name["uspc"].push(content);
            }
            else{
            }
        }
        for(let i=0;i<cpc.length;i++){
            if (JSON.stringify(cpc[i]) != "{}"){
                let content = {"content" : ""};
                content["content"] = cpc[i].raw;
                classification_name["cpc"].push(content);
            }
            else{
            }
        }
        return classification_name;
    }
}
_display.init();