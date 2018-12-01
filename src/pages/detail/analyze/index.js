/*
*展示分析结果/图像
*/
// 引入 ECharts 主模块

var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts');
require('./index.css');
var _patent = require('utils/patent.js')
var _cited = require('html-loader!./cited.html')


// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('trend-graph'));
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
        _this.option.xAxis[0].data = _this.xdata
        
    },
    getInfo : function(){
        var _this = this;
        var submit_data = _patent.getUrlParam('patent_uuid');
        _patent.request({
            //发data到服务器地址
            url : 'api/patent/histogram/citation/'+submit_data,
            method : 'get',
            success: function(res){
                cited = res;
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
                    $("#detail-cited").html("");
                    $("#detail-cited").append(_patent.renderHtml(_cited,cited))
                }
                
            },
            error: function(err){
                console.log(err);
            }
        });
    }
}
chartInfo.chartInit();


