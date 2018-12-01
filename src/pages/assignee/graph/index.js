'use strict';

require('./index.css');
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts');
require('./index.css');
require('echarts-wordcloud');

var _patent = require('utils/patent.js');
var _cited = require('html-loader!./cited.html');
var _recent = require('html-loader!./recent.html');
var _nber = require('html-loader!./nber.html');


// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('trend-graph'));
var netChart = echarts.init(document.getElementById('net-graph'));
var cloudChart = echarts.init(document.getElementById('cloud-graph'));
var pieGraph = echarts.init(document.getElementById('pie-graph'));
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
            roam :true,  
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
                    netChart.setOption(netInfo.option);
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
        let submit_data = _patent.getUrlParam('assignee');
        _patent.request({
            //发data到服务器地址
            url : 'api/organization/pieChart/patentClass/'+submit_data,
            method : 'get',
            success: function(res){
                if(res){
                    console.log("res");
                    console.log(res);
                    _this.data = res["data"];
                    _this.setOption();
                    let nber = res["nber"];
                    console.log(_this.option);
                    $('#assignee-nber').html("");
                    $('#assignee-nber').append(_patent.renderHtml(_nber,nber));
                }
                pieGraph.setOption(pieInfo.option)
                
            },
            error: function(err){
                console.log(err);
            }
        });
    }

}

var cloudInfo = {
    data: [],
    option: {
        tooltip: {},
        series: [{
            type : 'wordCloud',  //类型为字符云
            shape:'smooth',  //平滑
            gridSize : 2, //网格尺寸
            textStyle: {
                normal: {
                    fontFamily: '微软雅黑',
                    color: function(){
                        var colors = ['#16A085', '#1F618D', '#B7950B', "#BA4A00", "#283747", '#A04000', '#B3B6B7', '#A04000', '#76448A'];
                        return colors[parseInt(Math.random()*10)];
                    }
                }
            },
            size : ['80%','80%'],
                //sizeRange : [ 50, 100 ],  
            rotationRange : [ 46, 80 ], //旋转范围
            // textStyle : {  
            //     normal : {
            //     fontFamily:'sans-serif',
            //     color : function() {  
            //         return 'rgb(' + [
            //             Math.round(Math.random() * 255),
            //             Math.round(Math.random() * 255),
            //             Math.round(Math.random() * 255)
            //             ].join(',') + ')';
            //     }  
            //     },  
            //     emphasis : {  
            //         shadowBlur : 5,  //阴影距离
            //         shadowColor : '#333'  //阴影颜色
            //     }  
            // },
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
        let submit_data = _patent.getUrlParam('assignee');
        _patent.request({
            //发data到服务器地址
            url : 'api/organization/cloudChart/keywords/'+submit_data,
            method : 'get',
            success: function(res){
                let cited = res;
                let cloudres = res["data"];
                console.log(cloudres);
                if(res){
                    // 接收页面信息
                    _this.data = cloudres;
                    _this.setOption();
                    cloudChart.setOption(_this.option);
                    $('#inventor-cited').html("");
                    $('#inventor-cited').append(_patent.renderHtml(_cited,cited));
                }
                
            },
            error: function(err){
                console.log(err);
            }
        });
    }
}
cloudInfo.getInfo();
pieInfo.chartInit();
pieGraph.setOption(pieInfo.option);
cloudChart.setOption(cloudInfo.option);
netChart.setOption(netInfo.option);
myChart.setOption(chartInfo.option);

