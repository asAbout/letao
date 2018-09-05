$(function ($) {
	NProgress.configure({ showSpinner: false });
	$(window).ajaxStart(function () {
		NProgress.start();
	})
	$(window).ajaxComplete(function () {
		NProgress.done()
	})
})

// 显示隐藏分类
$('[data-menu]').on('click', function () {
	$('.ad_aside').toggle()
	$('.ad_section').toggleClass('menu')
});
$('.menu [href="javascript:;"]').on('click', function () {
	$(this).siblings('.child').slideToggle();
})

var modalHtml = ['<div class="modal fade" id="modal">',
'  <div class="modal-dialog modal-sm">',
'    <div class="modal-content">',
'      <div class="modal-header">',
'        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>',
'        <h4 class="modal-title">温馨提示</h4>',
'      </div>',
'      <div class="modal-body text-danger">',
'        <p><span class="glyphicon glyphicon-info-sign"></span> 您确定要退出后台管理系统吗？</p>',
'      </div>',
'      <div class="modal-footer">',
'        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>',
'        <button type="button" class="btn btn-primary">确定</button>',
'      </div>',
'    </div>',
'  </div>',
'</div>'].join("");

$('body').append(modalHtml);

$('[data-logout]').on('click', function () {
	$('#modal').modal('show').find('.btn-primary').on('click', function () {
		// 发送到后台
		$.ajax({
			type: 'get',
			url: '/employee/employeeLogout',
			data: '',
			dataType: 'json',
			success: function (data) {
				if (data.success == true) {
					location.href = '/Myadmin/login.html'
				}
			}
		})
		$('#modal').modal('hide')
	})
})