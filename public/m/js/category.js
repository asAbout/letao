$(function ($) {
	getFirstCategoryData(function (data) {
		// 获取一级分类
		$('.cate_left ul').html(template('firstTemplate', data))
		console.log('aaa')
		// 获取二级分类
		// 先获取id
		var categroyId = $('.cate_left ul li a').attr("data-id");
		console.log(categroyId);
		getSecondCategoryData({id:categroyId},function (data) {
			$('.cate_right ul').html(template('secondTemplate', data))
		})
	})

	$('.cate_left').on('tap', 'a', function (e) {
		if ($(this).parent().hasClass('now')) return false;
		$('.cate_left li').removeClass('now')
		$(this).parent().addClass('now')
		var categroyId = $(this).attr("data-id");
		getSecondCategoryData({id:categroyId},function (data) {
			$('.cate_right ul').html(template('secondTemplate', data))
		})
	})
})
var getFirstCategoryData = function (callback) {
	$.ajax({
		url: '/category/queryTopCategory',
		type: 'get',
		data: '',
		dataType: 'json',
		success: function (data) {
			callback && callback(data);
			console.log(data)
		}
	})
}

var getSecondCategoryData = function (pamas,callback) {
	$.ajax({
		url: '/category/querySecondCategory',
		type: 'get',
		data: pamas,
		dataType: 'json',
		success: function (data) {
			callback && callback(data);
			console.log(data)
		}
	})
}