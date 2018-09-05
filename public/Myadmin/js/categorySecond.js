$(function ($) {
	window.page = 1;

	template.helper('getJquery', function () {
		return jQuery;
	})
	var render = function () {
		getCateSecondgoryData(function (data) {
			$('tbody').html(template('list', data));
			$('.pagination').bootstrapPaginator({
				bootstrapMajorVersion: 3,
				size: 'normal',
				currentPage:window.page,
				numberOfPages: 3,
				totalPages: Math.ceil(data.total / data.size) ,
				onPageClicked:function (event, originalEvent, type,page) {
					window.page = page;
					render()
				}
			})
		})
	}
	render();
	uploadFile();
	getCateFirstgoryData(function (data) {
		$('.dropdown-menu').html(template('cateFirst',data)).find('li').on('click',function () {
			var val = $(this).find('a').html();
			$('.categoryName').html(val)
			$('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
			$('[name="categoryId"]').val($(this).attr('data-id'));
		})
		
	});
	$('#form').bootstrapValidator({
		excluded:[],
		feedbackIcons: {
			// valid 成功  invalid 失败  validating 正在校验
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			categoryId: {
				validators:{
					notEmpty: {
						message: '请选择一级分类'
					}
					
				}
			},
			brandName: {
				validators: {
					notEmpty: {
						message: '请输入二级分类名称'
					}
				}

			},
			brandLogo: {
				validators: {
					notEmpty: {
						message: '请上传文件'
					}
				}
			}
		}
	}).on('success.form.bv', function(e) {
		e.preventDefault();
		var $form = $(e.target);
		console.log($form.serialize())
		$.ajax({
			url: '/category/addSecondCategory',
			type: 'post',
			data:$form.serialize(),
			dataType: 'json',
			success: function (data) {
				if (data.success == true) {
					$('#save').modal('hide')
					window.page = 1;
					render();
				}
			}
		})
	});
})
var getCateSecondgoryData = function (callback) {
	$.ajax({
		type: 'get',
		url: '/category/querySecondCategoryPaging',
		data: {
			page: window.page || 1,
			pageSize: 2
		},
		dataType: 'json',
		success: function (data) {
			callback && callback(data)
		}
	})
}

var getCateFirstgoryData = function (callback) {
	$.ajax({
		type: 'get',
		url: '/category/queryTopCategoryPaging',
		data: {
			page: 1,
			pageSize: 1000
		},
		dataType: 'json',
		success: function (data) {
			callback && callback(data)
		}
	})
}

var uploadFile = function () {
	$('[name="pic1"]').fileupload({
        /*上传地址*/
        url:'/category/addSecondCategoryPic',
        /*返回格式*/
        dataType: 'json',
        /*上传成功*/
        done: function (e, data) {
        	console.log(data)
            $('#uploadImage').attr('src',data.result.picAddr);
            $('[name="brandLogo"]').val(data.result.picAddr);
            $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    });
}