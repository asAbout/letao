$(function ($) {

	mui('.mui-scroll-wrapper').scroll({
		indicators:false
	});
	mui.init({
		pullRefresh : {
			container:"#refreshContainer",
			down : {
				auto:true,
				callback :function () {
					var that = this;
					setTimeout(function () {
						getCartData(function (data) {
							$('.mui-table-view').html(template('cart', data))
						})
						that.endPulldownToRefresh();
					},1000)
				}
			}
		}
	});

	// 点击刷新可以刷新页面
	$('.fa-refresh').on('tap', function () {
		mui('#refreshContainer').pullRefresh().pulldownLoading();
	})
	

	// 右滑编辑
	$('.mui-table-view').on('tap','.mui-btn-blue', function () {
		var id = $(this).parent().attr('data-id');
		console.log(id)
		var item = lt.itemDataById(window.cartData.data, id)
		console.log(item)
		var html = template('edit',item);
		mui.confirm(html.replace(/\n/g, ''), '商品编辑', ['确定', '取消'], function(e) {
			var size = $('.btn_size.now').html();
			var num = $('.p_number input').val()
			if (e.index == 0) {
				lt.loginAjax({
					type: 'post',
					url:'/cart/updateCart',
					data: {
						id:id,
						size: size,
						num: num
					},
					dataType: 'json',
					success: function (data) {
						if (data.success == true) {
							item.num = num;
							item.size = size;
							
							$('.mui-table-view').html(template('cart',window.cartData))
							mui.toast('编辑成功');
						}
					}
				})
			} else {
                    //TODO
                }
            })
	})
	$('body').on('tap', '.btn_size', function () {
		$(this).addClass('now').siblings().removeClass('now')
	})
	$('body').on('tap', '.p_number span', function () {
		var currentNum = $(this).siblings('input').val();
		var maxNum = parseInt($(this).siblings('input').attr('data-max'));
		if ($(this).hasClass('jian')) {
			if (currentNum <= 1) {
				mui.toast('至少一件商品');
				return false;
			}
			currentNum --;
		} else {
			if (currentNum >= maxNum) {
				setTimeout(function () {
					mui.toast('库存不足');
				},100)
				return false;
			}
			currentNum ++;
		}
		$(this).siblings('input').val(currentNum)
	})
	// 右滑删除
	$('.mui-table-view').on('tap','.mui-btn-red', function () {
		var $this = $(this);
		var id = $this.parent().attr('data-id');
		mui.confirm('您是否删除这个商品', '商品删除', ['确定', '取消'], function(e) {
			if (e.index == 0) {
				lt.loginAjax({
					type: 'get',
					url: '/cart/deleteCart',
					data: {
						id: id
					},
					dataType: 'json',
					success: function (data) {
						if (data.success == true) {
							$this.parent().parent().remove()
							setAmout();
							mui.toast('删除成功')
						}
					}

				})
			} else {
                    //TODO
                }
            })
	})
	// 总金额计算
	$('.mui-table-view').on('change', '[type=checkbox]', function () {
		setAmout();
	})
});
var setAmout = function () {
	var $changeBox = $('[type=checkbox]:checked');
	var amout = 0;
	$changeBox.each(function (i, item) {
		var id = $(this).attr('data-id');
		var obj = lt.itemDataById(window.cartData.data, id);
		var num = obj.num;
		var price = obj.price;
		amout += num * price 
	})
	if (Math.floor(amout * 100) % 10) {
		amout = Math.floor(amout * 100) / 100;
	} else {
		amout = Math.floor(amout * 100) / 100;
		amout = amout.toString() + '0';
	}
	$('#cartAmount').html(amout)
}
var getCartData = function (callback) {
	lt.loginAjax({
		type: 'get',
		url: '/cart/queryCartPaging',
		data:{
			page: 1,
			pageSize : 100
		},
		dataType: 'json',
		success: function (data) {
			window.cartData = data;
			callback && callback(data)
		}
	})
}