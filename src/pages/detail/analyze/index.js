/*
*展示分析结果/图像
*/
// 引入 ECharts 主模块

var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts');
require('./index.css');
require('./worldcloud.js');


// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('trendGraph'));
var pieChart = echarts.init(document.getElementById('pieGraph'));
var cloudChart = echarts.init(document.getElementById('cloudGraph'));
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
            data: ['0','1','2','3','15','12']
        }
    ]
});

pieChart.setOption({
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series : [
        {
            name:'专利类型-比例',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'G05D'},
                {value:310, name:'G05C'},
                {value:274, name:'G64C'},
                {value:235, name:'G64D'},
                {value:400, name:'B64C'},
                {value:300, name:'B64D'},
                {value:250, name:'B05D'},
                {value:100, name:'B05C'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#3398DB',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
})

cloudChart.setOption({
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
    }
)

