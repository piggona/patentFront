'use strict';

require('./index.css');
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts');
require('./index.css');


// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('trend-graph'));
var netChart = echarts.init(document.getElementById('net-graph'));
var coGraph = echarts.init(document.getElementById('co-graph'));
// 绘制图表
myChart.setOption({
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
        data:['专利发表数量'],
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
            data: ['0','1','2','3','15','12']
        }
    ]
});

var webkitDep = {  
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
        {  
            "name": "RCA Corporation",//节点名称  
            "value": 3,  
            "category": 0,//与关系网类别索引对应，此处只有一个关系网所以这里写0
            "symbolSize" :50,
            "itemStyle" : {"normal": {"color": "#C0392B"}}
        },  
        {  
            "name": " Method and apparatus for providing point-to-point",  
            "value": 8,  
            "category": 1, 
            "symbolSize" :20
        },  
        {  
            "name": " Method and apparatus for providing point-to-point",  
            "value": 10,  
            "category": 1  
        },  
        {  
            "name": "Method and apparatus for providing point-to-point",  
            "value": 1,  
            "category": 1  
        },  
        {  
            "name": "子节点2",  
            "value": 110,  
            "category": 1  
        },  
        {  
            "name": "Method and apparatus for providing point-to-point",  
            "value": 100,  
            "category": 1  
        },  
        {  
            "name": "Lothar W.kleiner",  
            "value": 1000,  
            "category": 2  
        }          
    ],  
    "links": [//节点之间连接  
        {  
            "source": 0,//起始节点，0表示第一个节点  
            "target": 1 //目标节点，1表示与索引为1的节点进行连接  
        },  
        {  
            "source": 0,  
            "target": 2  
        },  
        {  
            "source": 1,  
            "target": 3  
        },  
        {  
            "source": 1,  
            "target": 4  
        },  
        {  
            "source": 2,  
            "target": 5  
        },  
        {  
            "source": 2,  
            "target": 6  
        }  
    ]  
};

netChart.setOption({  
    legend: {  
        data: ['专利权人','专利','发明人']//此处的数据必须和关系网类别中name相对应  
    },  
    series: [{  
        type: 'graph',  
        layout: 'force',  
        animation: false,  
        draggable: true,  
        data: webkitDep.nodes.map(function (node, idx) {  
            node.id = idx;  
            return node;  
        }),  
        categories: webkitDep.categories,  
        force: {  
            edgeLength: 80,//连线的长度  
            repulsion: 100  //子节点之间的间距  
        },
        label: {
                normal: {
                    position: 'right'
                }
        },
        edges: webkitDep.links  
    }]  
}
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