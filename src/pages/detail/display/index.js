/*
*请求对应的查询内容
*/
var _patent = require('utils/patent.js');
require('./index.css');
var _result = require('html-loader!./result.html');



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
            url : 'http://192.168.1.123:8000/patentapi/'+submit_data,
            method : 'get',
            success: function(res){
                console.log(res);
                if(res){
                    // 接收页面信息
                    var inventor = res.inventors;
                    var inventor_name = _this.get_name(inventor);
                    var assignees = res.assignees;
                    var assignees_name = _this.get_assignees(assignees);
                    var classification = res.classification;
                    var classification_name = _this.get_classification(classification);
                    console.log(inventor_name);
                    console.log(classification_name);
                    res['inventor_name'] = inventor_name;
                    res['assignees_name'] = assignees_name;
                    res['classification_name'] = classification_name;

                    $('#display-container').html("");
                    $('#display-container').append(_patent.renderHtml(_result,res));
                }
                
            },
            error: function(err){
                console.log(err);
            }
        }); 
    },
    get_name : function(inventor){
        var inventor_name = '';
        for (let i=0;i<inventor.length; i++){
            inventor_name = inventor_name + ' ' + inventor[i].name.fullName;
        }
        return inventor_name;
    },
    get_assignees : function(assignees){
        var assignees_name = '';
        assignees_name = assignees[0].name.raw
        console.log(assignees_name);
        return assignees_name;
    },
    get_classification : function(classification){
        var classification_name = {"ipc": "","uspc":"","cpc":""};
        var ipc = classification.ipc;
        var uspc = classification.uspc;
        var cpc = classification.cpc;
        console.log(ipc);
        console.log(uspc);
        console.log(cpc);
        for(let i=0;i<ipc.length;i++){
            if (ipc[i] === {}){
            }
            else{
                classification_name["ipc"] = classification_name["ipc"]+ ' ' +ipc[i].raw;
            }
        }
        for(let i=0;i<uspc.length;i++){
            if (uspc[i] === {}){
            }
            else{
                classification_name["uspc"] = classification_name["uspc"]+ ' ' +uspc[i].raw;
            }
        }
        for(let i=0;i<cpc.length;i++){
            if (cpc[i] === {}){
            }
            else{
                classification_name["cpc"] = classification_name["cpc"]+ ' ' +cpc[i].raw;
            }
        }
        return classification_name;
    }
}
_display.init();