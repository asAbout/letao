$(function ($) {
	barChats();
	pieCharts()
})
var barChats = function () {
	var box = document.getElementsByClassName('picTable')[0];
	var myChats = echarts.init(box)
	var option = {
		title: {
			text:'2017年注册人数'
		},
		legend: {
			data:['注册人数']
		},
		tooltip:{},
	    xAxis : [
	    {
	    	type : 'category',
	    	data : ['1月', '2月', '3月', '4月', '5月', '6月'],
	    	axisTick: {
	    		alignWithLabel: true
	    	}
	    }
	    ],
	    yAxis : [
	    {
	    	type : 'value'
	    }
	    ],
	    series : [
	    {
	    	name:'注册人数',
	    	type:'bar',
	    	barWidth: '60%',
	    	data:[100, 300, 200, 500, 300, 220]
	    }
	    ]
	};

	myChats.setOption(option);
}

var pieCharts = function () {
    /*1.引入echarts.min.js文件*/
    /*2.找到画图的容器*/
    var box = document.querySelector('.picTable:last-child');
    /*3.初始化插件*/
    var myChart = echarts.init(box);
    /*4.配置参数*/
    var options = {
        title : {
            text: '品牌销售占比',
            subtext: '2017年10月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            /*series.name  a  */
            /*data.name  b */
            /*data.value  c */
            /*占比  d */
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['李宁','耐克','阿迪','匡威','回力']
        },
        series : [
            {
                name: '销售情况',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'李宁'},
                    {value:310, name:'耐克'},
                    {value:234, name:'阿迪'},
                    {value:135, name:'匡威'},
                    {value:1548, name:'回力'}
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
    }
    /*5.设置参数*/
    myChart.setOption(options);
};