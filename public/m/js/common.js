window.lt = {};
lt.getSearchKey = function () {
	var value = location.search;
	value = value.replace('?', '');
	// 如果有多个键值对
	if (value) {
		var key = value.split('&');
	}
	var params = {};
	key.forEach(function (item, i) {
		var keyItem = item.split('=');
		params[keyItem[0]] = keyItem[1];
	})
	return params;
}
lt.loginUrl = '/m/user/login.html'
lt.cartUrl = '/m/user/cart.html'
lt.loginAjax = function (params) {
	$.ajax({
		type: params.type || 'get',
		url : params.url || '',
		data : params.data || '',
		dataType: params.dataType || 'json',
		success: function (data) {
			if (data.error == '400') {
				// 跳转到登录页面  并且将当前地址加入
				location.href = lt.loginUrl + '?returnUrl' + location.href;
				return false;
			} else {
				params.success && params.success(data)
			}
			console.log(data);
		},
		error: function () {
			mui.toast('服务器繁忙');
		}
	})
   
}