$(function ($) {
	mui('.mui-scroll-wrapper').scroll({
        indicators:false
    });
	// 获取关键字
	var key = lt.getSearchKey();
	$('input').val(key.key || '');
	// 根据数据更新商品列表
	// 下拉刷新
	getSearchData({
		proName: key.key,
		page: 1,
		pageSize: 4
	},function (data) {
		$('.lt_product').html(template('list', data));
	})

	// 点击搜索重新搜索 加载
	$('.lt_search a').on('tap', function () {
		var key = $('.lt_search input').val();
		if (!key) {
			mui.toast('请输入关键字')
			return false;
		}
		getSearchData({
			proName: key,
			page: 1,
			pageSize: 4
		},function (data) {
			$('.lt_product').html(template('list', data));
		})
		mui('#refreshContainer').pullRefresh().refresh(true)
	})
	
	// 根据排序  改变样式  重新加载商品
	$('.lt_order a').on('tap', function () {
		var $this = $(this);
		if (!$this.hasClass('now')) {
			// 加上样式  箭头向下
			$this.addClass('now').siblings().removeClass('now')
			.find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
		} else {
			// 有now
			if ($this.find('span').hasClass('fa-angle-down')) {
				$this.find('span').removeClass('fa-angle-down').addClass('fa-angle-up')
			} else {
				$this.find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
			}
		}

		// 根据类型  进行排序
		var order = $this.attr('data-type');
		var orderSize = $this.find('span').hasClass('fa-angle-up') ? 1 : 2;
		var key = $('.lt_search input').val();
		if (!key) {
			mui.toast('请输入关键字')
			return false;
		}
		var params = {
			proName: key,
			page: 1,
			pageSize: 4
		}
		params[order] = orderSize
		getSearchData(params,function (data) {
			$('.lt_product').html(template('list', data));
		})
		mui('#refreshContainer').pullRefresh().refresh(true)
	})

	// 下拉刷新  重置上拉加载
	mui.init({
	  pullRefresh : {
	    container:"#refreshContainer",
	    down : {
	      callback :function () {
	      	var that = this;
	      	var key = $('.lt_search input').val();
			if (!key) {
				mui.toast('请输入关键字')
				return false;
			}
	      	getSearchData({
				proName: key.key,
				page: 1,
				pageSize: 4
			},function (data) {
				setTimeout(function () {
                    /*渲染数据*/
                    $('.ct_product').html(template('list', data));
                    /*注意：停止下拉刷新*/
                    that.endPulldownToRefresh();
                    /*上拉加载重置*/
                    that.refresh(true);
                }, 1000);
			})
	      }
	    },
	    // 上拉加载
	    up : {
	    	callback : function () {
	    		 window.page ++;
                    /*组件对象*/
                    var that = this;
                    var key = $('.lt_search input').val();
					if (!key) {
						mui.toast('请输入关键字')
						return false;
					}
                    /*获取当前点击的功能参数  price 1 2 num 1 2*/
                    var order = $('.lt_order a.now').attr('data-type');
                    console.log(order)
                    var orderVal = $('.lt_order a.now').find('span').hasClass('fa-angle-up') ? 1 : 2;
                    /*获取数据*/
                    var params = {
                        proName: key,
                        page: window.page,
                        pageSize: 4
                        /*排序的方式*/
                    };
                    params[order] = orderVal;
                    getSearchData(params, function (data) {
                        setTimeout(function () {
                            /*渲染数据*/
                            $('.lt_product').append(template('list', data));
                            /*注意：停止上拉加载*/
                            if(data.data.length){
                                that.endPullupToRefresh();
                            }else{
                                that.endPullupToRefresh(true);
                            }
                        }, 1000);
                    });
	    	}
	    }
	  }
	});

})
var getSearchData = function (params, callback) {
	$.ajax({
		type : 'get',
		url : '/product/queryProduct',
		data: params,
		dataType: 'json',
		success : function (data) {
			window.page = data.page;
			callback && callback(data)
		}
	})
}
