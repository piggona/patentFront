'use strict';

require('./index.css');
var echarts = require('echarts/lib/echarts');
var _patent = require('utils/patent.js');
var _cited = require('html-loader!./cited.html');
var _recent = require('html-loader!./recent.html');
var _nber = require('html-loader!./nber.html');
// 引入柱状图
require('echarts');
require('./index.css');


// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('trend-graph'));
var pieGraph = echarts.init(document.getElementById('pie-graph'));
var coGraph = echarts.init(document.getElementById('co-graph'));
// 绘制图表
var chartInfo = {
    xdata : [],
    data : [],
    option : {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: true
                }
            }
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        legend: {
            data:['专利被引数量'],
            itemGap: 5
        },
        grid: {
            top: '12%',
            left: '8%',
            right: '10%',
            containLabel: true
        },
        xAxis: [
            {
                type : 'category',
                data : ['2000','2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
            }
        ],
        yAxis: [
            {
                type : 'value',
                name : '专利被引数量',
                axisLabel: {
                    formatter: function (a) {
                        a = +a;
                        return isFinite(a)
                            ? echarts.format.addCommas(+a)
                            : '';
                    }
                }
            }
        ],
        dataZoom: [
            {
                show: true,
                start: 0,
                end: 100
            },
            {
                type: 'inside',
                start: 94,
                end: 100
            },
            {
                show: true,
                yAxisIndex: 0,
                filterMode: 'empty',
                width: 30,
                height: '80%',
                showDataShadow: false,
                left: '93%'
            }
        ],
        series : [
            {
                name: '专利被引数量',
                type: 'bar',
                data: ['0','1','2','3','60','12']
            }
        ]
    },
    chartInit : function(){
        this.getInfo();
        
    },
    setOption : function(){
        var _this = this;
        _this.option["xAxis"][0]["data"] = _this.xdata;
        _this.option["series"][0]["data"] = _this.data;
    },
    getInfo : function(){
        var _this = this;
        var submit_data = _patent.getUrlParam('inventor');
        _patent.request({
            //发data到服务器地址
            url : 'api/person/histogram/'+submit_data,
            method : 'get',
            success: function(res){
                let recent = res;
                let chartres = res['data'];
                console.log(res);
                if(res){
                    // 接收页面信息
                    for (let i=0;i<chartres.length;i++)
                    {
                        _this.xdata.push(chartres[i].time);
                        _this.data.push(chartres[i].patent_cnt);
                    }
                    _this.setOption();
                    myChart.setOption(chartInfo.option);
                    $("#inventor-recent").html("");
                    $("#inventor-recent").append(_patent.renderHtml(_recent,recent));
                }
                
            },
            error: function(err){
                console.log(err);
            }
        });
    }
}
chartInfo.chartInit();

var pieInfo = {
    data : [{value:335, name:'G05D'},{value:310, name:'G05C'},{value:234, name:'G64C'},{value:135, name:'864C'},{value:1548, name:'864D'}],
    option : {
        title : {
            text: 'IPC分类饼图',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['G05D','G05C','G64C','864C','864D']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'G05D'},
                    {value:310, name:'G05C'},
                    {value:234, name:'G64C'},
                    {value:135, name:'864C'},
                    {value:1548, name:'864D'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    },
    chartInit : function(){
        this.getInfo();
        
    },
    setOption : function(){
        this.option["legend"]["data"] = [];
        for (let i=0,len=this.data;i<len;i++){
            this.option["legend"]["data"].push(this.data[i]["name"]);
        }
        this.option["series"][0]["data"] = this.data;
    },
    getInfo : function(){
        let _this = this;
        let submit_data = _patent.getUrlParam('inventor');
        _patent.request({
            //发data到服务器地址
            url : 'api/person/pieChart/patentClass/'+submit_data,
            method : 'get',
            success: function(res){
                if(res){
                    console.log("res");
                    console.log(res);
                    _this.data = res["data"];
                    _this.setOption();
                    let nber = res;
                    console.log(_this.option);
                    $('#inventor-cited').html("");
                    $('#inventor-cited').append(_patent.renderHtml(_nber,nber));
                }
                pieGraph.setOption(pieInfo.option)
                
            },
            error: function(err){
                console.log(err);
            }
        });
    }

}
pieInfo.getInfo();
var coInfo = {
    years : [],
    inventors : [],
    data : [],

    option : {
        tooltip: {
            position: 'top'
        },
        title: [],
        singleAxis: [],
        series: []
    },
    init : function(){
        let _this = this;
        echarts.util.each(_this.inventors, function (day, idx) {
            console.log(idx);
            _this.option.title.push({
                textBaseline: 'middle',
                top: (idx + 0.5) * 100 / 7 + '%',
                text: day
            });
            _this.option.singleAxis.push({
                left: 180,
                type: 'category',
                boundaryGap: false,
                data: _this.years,
                top: (idx * 100 / 7 + 5) + '%',
                height: (100 / 7 - 10) + '%',
                axisLabel: {
                    interval: 2
                }
            });
            _this.option.series.push({
                singleAxisIndex: idx,
                coordinateSystem: 'singleAxis',
                type: 'scatter',
                data: [],
                symbolSize: function (dataItem) {
                    return 30;
                }
            });
        });
        
        echarts.util.each(_this.data, function (dataItem) {
            _this.option.series[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
        });
    },
    chartInit : function(){
        this.getInfo();
    },
    setOption : function(){
        this.init();
    },
    getInfo : function(){
        let _this = this;
        let submit_data = _patent.getUrlParam('inventor');
        _patent.request({
            //发data到服务器地址
            url : 'api/person/coopChart/'+submit_data,
            method : 'get',
            success: function(res){
                if(res){
                    // 接收页面信息
                    for (let i=res["year_min"];i<=res["year_max"];i++)
                    {
                        _this.years.push(i);
                    };
                    for (let i=0;i<res["name"].length;i++)
                    {
                        _this.inventors.push(res.name[i]);
                    };
                    _this.data = res.data;
                    console.log(_this.years);
                    console.log(_this.inventors);
                    console.log(_this.data);
                    console.log(_this.option.series);
                    _this.setOption();
                    coGraph.setOption(_this.option);
                }
                
            },
            error: function(err){
                console.log(err);
            }
        });
    }
}
coInfo.getInfo();