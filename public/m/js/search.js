$(function ($) {
	$('.lt_search a').on('tap', function () {
		var key = $('.lt_search input').val();

		if (!key) {
			mui.toast('请输入关键字')
		}
		location.href = 'searchList.html?key='+key;
	})
})