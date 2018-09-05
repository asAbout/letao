$(function ($) {
	$('#login').bootstrapValidator({
		feedbackIcons: {
			// valid 成功  invalid 失败  validating 正在校验
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			username: {
				validators:{
					notEmpty: {
						message: '请输入用户名'
					},
					callback: {
						message: '用户名不存在'
					}
				}
			},
			password: {
				validators: {
					notEmpty: {
						message: '请输入密码'
					},
					stringLength: {
						min: 6,
						max: 18,
						message: '密码必须要6-18个字符'
					},
					callback: {
						message: '密码错误'
					}
				}

			}
		}
	}).on('success.form.bv', function(e) {
		e.preventDefault();
		var $form = $(e.target);
		$.ajax({
			url: '/employee/employeeLogin',
			type: 'post',
			data: $form.serialize(),
			dataType: 'json',
			success: function (data) {
				if (data.success == true) {
					location.href = '/Myadmin'
				} else {
					if (data.error == 1000) {
			 			// 用户名错误
			 			$form.data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
			 		} else if (data.error == 1001) {
			 			// 密码错误
			 			$form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
			 		}
			 	}
			 }
		})
	});
})