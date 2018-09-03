$(function ($) {
	$('.mui-btn-primary').on('tap', function () {
		// 获取form表单内容
		var data = $('form').serialize();
		var dataObj = lt.serialize2Object(data);

		// 校验
		if(!dataObj.username) {
			mui.toast('请输入用户名');
			return false;
		}
		if (!dataObj.password) {
			mui.toast('请输入密码');
			return false;
		}

		$.ajax({
			type: 'post',
			url: '/user/login',
			data:dataObj,
			dataType: 'json',
			success: function (data) {
				if(data.success == true) {
					var returnUrl = location.search.replace('?returnUrl', '');
					if(returnUrl) {
						location.href = returnUrl;
					} else {
						location.href = lt.userUrl;
					}
				} else if(data.error == 403) {
					mui.toast(data.message)
				}
			}
		})
	})
})