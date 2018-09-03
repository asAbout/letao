$(function () {
	var key = lt.getSearchKey();
	getProductData({id: key.id},function (data) {
		$('.mui-scroll').html(template('brand',data))
		mui('.mui-scroll-wrapper').scroll({
	        indicators:false
	    });
	    /*轮播图*/
	    mui('.mui-slider').slider({
	        interval:2000
	    });

	    // 选择尺码
	    $('.btn_size').on('tap', function () {
	    	$(this).addClass('now').siblings().removeClass('now')
	    })
	    // 选择数量
	    $('.p_number span').on('tap', function () {
	    	var currentNum = $(this).siblings('input').val();
	    	var maxNum = parseInt($(this).siblings('input').attr('data-max'));
	    	if ($(this).hasClass('jian')) {
	    		if (currentNum <= 0) {
	    			mui.toast('请您选择数量');
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
	    // 添加购物车
	    $('.btn_addCart').on('tap', function () {
	    	// 判断是否选择了数量和尺码
	    	var size = $('.btn_size.now').html();
	    	if (!size.length) {
	    		mui.toast('请您选择尺码');
	    		return false;
	    	}
	    	var num = $('.p_number input').val();
	    	if (num <= 0 ) {
	    		mui.toast('请您选择数量');
	    		return false;
	    	}
	    	lt.loginAjax({
	    		type:'post',
		        url:'/cart/addCart',
		        data:{
		        	productId: key.id,
		        	num: num,
		        	size: size
		        },	
		        dataType:'json',
		        success: function (data) {
	        		if (data.success == true) {
	        			mui.confirm('添加成功，去购物车看看？', '温馨提示', ['是', '否'], function(e) {
			                if (e.index == 0) {
			                    location.href = lt.cartUrl
			                } else {
			                    //TODO
			                }
			            })
	        		}
		        }
	    	})

	    })
	})
})

var getProductData = function (params, callback) {
	$.ajax({
		type : 'get',
		url: '/product/queryProductDetail',
		data: params,
		dataType: 'json',
		success : function (data) {
			callback && callback(data)
		}
	})
}