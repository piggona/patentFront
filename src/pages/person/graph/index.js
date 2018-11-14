'use strict';

require('./index.css');
var echarts = require('echarts/lib/echarts');
var _patent = require('utils/patent.js');
// 引入柱状图
require('echarts');
require('./index.css');
require('./worldcloud.js');


// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('trend-graph'));
var cloudChart = echarts.init(document.getElementById('cloud-graph'));
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
        _this.option.series[0].data = _this.data;
        _this.option.xAxis[0].data = _this.xdata;
    },
    getInfo : function(){
        var _this = this;
        var submit_data = _patent.getUrlParam('patent_uuid');
        _patent.request({
            //发data到服务器地址
            url : 'http://192.168.1.123:8000/api/patent/histogram/citation/'+submit_data,
            method : 'get',
            success: function(res){
                res = res['data'];
                console.log(res);
                if(res){
                    // 接收页面信息
                    for (let i=0;i<res.length;i++)
                    {
                        _this.xdata.push(res[i].time);
                        _this.data.push(res[i].patent_cnt);
                    }
                    _this.setOption();
                    myChart.setOption(chartInfo.option);
                }
                
            },
            error: function(err){
                console.log(err);
            }
        });
    }
}
chartInfo.chartInit();

var cloudInfo = {
    data: [],
    option: {
        tooltip: {},
        series: [{
            type : 'wordCloud',  //类型为字符云
            shape:'smooth',  //平滑
            gridSize : 2, //网格尺寸
            size : ['80%','80%'],
                //sizeRange : [ 50, 100 ],  
            rotationRange : [ 46, 80 ], //旋转范围
            textStyle : {  
                normal : {
                fontFamily:'sans-serif',
                color : function() {  
                    return 'rgb(' + [
                        Math.round(Math.random() * 255),
                        Math.round(Math.random() * 255),
                        Math.round(Math.random() * 255)
                        ].join(',') + ')';
                }  
                },  
                emphasis : {  
                    shadowBlur : 5,  //阴影距离
                    shadowColor : '#333'  //阴影颜色
                }  
            },
                data:[{
                    name: '汽车',
                    value: 10000,
                }, {
                    name: '光学',
                    value: 6181
                }, {
                    name: '相机',
                    value: 4386
                }, {
                    name: '调色',
                    value: 4055
                }, {
                    name: '电子',
                    value: 2467
                }, {
                    name: '中华人民共和国',
                    value: 2244
                }, {
                    name: '三星电子',
                    value: 1898
                }, {
                    name: '苹果',
                    value: 1484
                }, {
                    name: '诺基亚',
                    value: 1112
                }, {
                    name: '北京邮电大学',
                    value: 965
                }, {
                    name: 'Macbook Pro',
                    value: 847
                }, {
                    name: 'Elasctic Search',
                    value: 582
                }, {
                    name: '食品安全',
                    value: 555
                }, {
                    name: '少儿教育',
                    value: 550
                }, {
                    name: '诺贝尔奖',
                    value: 462
                }, {
                    name: '区块链技术',
                    value: 366
                }, {
                    name: '数字货币',
                    value: 360
                }, {
                    name: '汽车制造',
                    value: 282
                }, {
                    name: '智能驾驶',
                    value: 273
                }, {
                    name: '飞行',
                    value: 273
                }, {
                    name: '计算机技术',
                    value: 265
                }]
        }]
    },
    chartInit : function(){
        this.getInfo();
        
    },
    setOption : function(){
        var _this = this;
        _this.option.series[0].data = _this.data;
    },
    getInfo : function(){
        var _this = this;
        var submit_data = _patent.getUrlParam('patent_uuid');
        _patent.request({
            //发data到服务器地址
            url : 'http://192.168.1.123:8000/api/patent/histogram/citation/'+submit_data,
            method : 'get',
            success: function(res){
                res = res['data'];
                console.log(res);
                if(res){
                    // 接收页面信息
                    _this.data = res;
                    _this.setOption();
                    myChart.setOption(cloudInfo.option);
                }
                
            },
            error: function(err){
                console.log(err);
            }
        });
    }
}

cloudChart.setOption(
);

var coGraphChart = {
    years : ['1996','2001','2006','2011','2016','2018'],
    inventors : ['Seung June yi','Sung Jun Park','Sung Duck Chun'],
    data : [[0,2,2],[0,2,1],[0,2,10],[0,2,23],[0,2,19],[0,3,43],[0,3,72],[0,3,80],[0,4,123],[0,5,31],[1,3,95],[1,5,33],[2,3,9],[2,4,107],[2,5,75]],

    option : {
        tooltip: {
            position: 'top'
        },
        title: [],
        singleAxis: [],
        series: []
    },
    init : function(){
        var _this = this;
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
                    interval: 0
                }
            });
            _this.option.series.push({
                singleAxisIndex: idx,
                coordinateSystem: 'singleAxis',
                type: 'scatter',
                data: [],
                symbolSize: function (dataItem) {
                    return dataItem[1] * 4;
                }
            });
        });
        
        echarts.util.each(_this.data, function (dataItem) {
            _this.option.series[dataItem[0]].data.push([dataItem[1], dataItem[2]/6]);
        });
    }
}
coGraphChart.init();
coGraph.setOption(coGraphChart.option);