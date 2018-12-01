'use strict';

require('./index.css');
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts');
require('./index.css');
var _patent = require('utils/patent.js');
var _cited = require('html-loader!./cited.html');
var _recent = require('html-loader!./recent.html');


// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('trend-graph'));
var netChart = echarts.init(document.getElementById('net-graph'));
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
        let _this = this;
        _this.option.series[0].data = _this.data;
        _this.option.xAxis[0].data = _this.xdata
        
    },
    getInfo : function(){
        let _this = this;
        let submit_data = _patent.getUrlParam('assignee');
        _patent.request({
            //发data到服务器地址
            url : 'api/organization/histogram/'+submit_data,
            method : 'get',
            success: function(res){
                let recent = res;
                let myres = res['data'];
                console.log("myres");
                console.log(myres);
                if(myres){
                    // 接收页面信息
                    for (let i=0;i<myres.length;i++)
                    {
                        _this.xdata.push(myres[i].time);
                        _this.data.push(myres[i].patent_cnt);
                    }
                    _this.setOption();
                    myChart.setOption(chartInfo.option);
                    $("#assignee-recent").html("");
                    $("#assignee-recent").append(_patent.renderHtml(_recent,recent));
                }
                
            },
            error: function(err){
                console.log(err);
            }
        });
    }
}
chartInfo.chartInit();


var netInfo = {
    webkitDep : {  
        "type": "force",  
        "categories": [//关系网类别，可以写多组  
            {  
                "name": "专利权人",//关系网名称  
                "keyword": {},  
                "base": "专利权人"  
            },
            {
                "name": "专利",//关系网名称  
                "keyword": {},  
                "base": "专利"
            },
            {
                "name": "发明人",//关系网名称  
                "keyword": {},  
                "base": "发明人"
            }
        ],  
        "nodes": [//展示的节点  
            
        ],  
        "links": [//节点之间连接  
            
        ]  
    },
    option : {
        legend: {  
            data: ['专利权人','专利','发明人']//此处的数据必须和关系网类别中name相对应  
        },  
        series: [{  
            type: 'graph',  
            layout: 'force',  
            animation: false,  
            draggable: true,  
            data: "",  
            categories: "",  
            force: {  
                edgeLength: 80,//连线的长度  
                repulsion: 100  //子节点之间的间距  
            },
            label: {
                    normal: {
                        position: 'right'
                    }
            },
            edges: "" 
        }]
    },
    chartInit : function(){
        this.getInfo();
        
    },
    setOption : function(){
        this.option.series[0].data = this.webkitDep.nodes.map(function (node, idx) {  
            node.id = idx;  
            return node;  
        });
        this.option.series[0].categories = this.webkitDep.categories;
        this.option.series[0].edges = this.webkitDep.links;
    },
    getInfo : function(){
        let _this = this;
        let submit_data = _patent.getUrlParam('assignee');
        _patent.request({
            //发data到服务器地址
            url : 'api/organization/netChart/'+submit_data,
            method : 'get',
            success: function(res){
                if(res){
                    console.log("res");
                    console.log(res);
                    let cited = res;
                    let netres = res["data"];
                    console.log("netres");
                    console.log(netres);
                    // 接收页面信息
                    let s = 0
                    for (let i = 0;i < netres.length; i ++){
                        if (netres[i]["uuid"] == submit_data)
                        {
                            s = i;
                            break;
                        }
                    }
                    for (let i=0;i<netres.length;i++)
                    {
                        if(netres[i].categories === 0)
                        {
                            netres[i]["symbolSize"] = 50;
                            netres[i]["itemStyle"] = {"normal": {"color": "#C0392B"}};
                            _this.webkitDep["nodes"].push(netres[i]);
                            _this.webkitDep["links"].push({"source":s, "target":i})
                        }
                        else if(netres[i].categories === 1){
                            netres[i]["symbolSize"] = 30;
                            netres[i]["itemStyle"] = {"normal": {"color": "#273746"}};
                            _this.webkitDep["nodes"].push(netres[i]);
                            _this.webkitDep["links"].push({"source":s,"target":i});
                        }
                        else{
                            _this.webkitDep["nodes"].push(netres[i]);
                            netres[i]["itemStyle"] = {"normal": {"color": "#0097A7"}};
                            _this.webkitDep["links"].push({"source":s,"target":i});
                        }
                    }
                    _this.setOption();
                    console.log(_this.webkitDep);
                    console.log(_this.option);
                    netChart.setOption(_this.option);
                    $('#assignee-cited').html("");
                    $('#assignee-cited').append(_patent.renderHtml(_cited,cited));
                }
                
            },
            error: function(err){
                console.log(err);
            }
        });
    }
}
netInfo.getInfo();

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
        let submit_data = _patent.getUrlParam('assignee');
        _patent.request({
            //发data到服务器地址
            url : 'api/organization/coopChart/'+submit_data,
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
