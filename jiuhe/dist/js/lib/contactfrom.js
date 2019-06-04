$(function(){
  	//---------------------联系我们表单------------------------
	if ($('.contact-from').length) {
		$('.team-item').each(function () {
			$(this).on('click', function () {
				$('[name=companyName]').val($(this).data('cname'));
				$(this).addClass('active').siblings().removeClass('active');
				randerAcle();
			})
		})
		var correct = ' <img class="tip" src="./images/correct.png" alt="" srcset="">';
		var error = ' <img class="tip" src="./images/error.png" alt="" srcset="">';

		function errorTip(dom, text) {
			if (text) {
				dom.after('<p class="text-info f12 mt5 mb5 error-tip">' + text + '</p>')
			} else {
				dom.next('.error-tip').remove();
			}
		}
		function randerAcle(){
			$('.c-from .submit').addClass('disabled');
			if($('#userName').val()&&$('[name=companyName]').val()&&$('#userEmail').val()&&$('#userPhone').val()){
				var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
				if(reg.test($('#userEmail').val())){
					$('.c-from .submit').removeClass('disabled');
				}
			}
		}
		// 姓名验证
		$('#userName').on('blur', function () {
			var parent = $(this).parent(".from-item");
			$(this).next('.sdst').empty();
			errorTip(parent)
			if ($(this).val()) {
				parent.find('.sdst').append(correct);
			} else {
				errorTip(parent, '请输入姓名！');
				parent.find('.sdst').append(error);
			}
			randerAcle();
		})
		// 电子邮件
		$('#userEmail').on('blur', function () {
			var parent = $(this).parent(".from-item");
			$(this).next('.sdst').empty();
			errorTip(parent)
			var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
			if ($(this).val() === '') { //输入不能为空
				errorTip(parent, '请输入电子邮件！');
				parent.find('.sdst').append(error);
				return false;
			} else if (!reg.test($(this).val())) { //正则验证不通过，格式不对
				errorTip(parent, '邮箱格式不正确！');
				parent.find('.sdst').append(error);
				return false;
			} else {
				parent.find('.sdst').append(correct);
				return true;
			}
			randerAcle();
		})
		// 联系电话
		$('#userPhone').on('blur', function () {
			var parent = $(this).parent(".from-item");
			$(this).next('.sdst').empty();
			errorTip(parent)
			if ($(this).val()) {
				parent.find('.sdst').append(correct);
			} else {
				errorTip(parent, '请输入联系电话！');
				parent.find('.sdst').append(error);
			}
			randerAcle();
		})
		// 提交按钮
		var loading = false;
		
		$('.c-from .submit').on('click',function(){
			if($(this).addClass('disabled')&&!loading){
				return;
			}
			loading = true;
			$.ajax({
					type: "post",
					url: "/api/user/register", // 接口地址
					data: $('#contactFrom').serialize(),
			}).done(function(message) {
				console.log(message)
				$('#contactFromDialog').modal('show'); // 显示弹框
				loading = false;
			}).fail(function(err){
				console.log(err)
				loading = false;
			})
		})
		
	}
})