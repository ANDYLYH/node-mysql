;
$(function() {
	var demo = {
		searchFn:function(){
			$.ajax({
				type: "get",
				url: "http://192.168.199.230:8000/search",
				async: true,
				data: {
					name: $('.kayword').val(),
					pageCurrent: 1,
					pageSize: 10
				},
				success: function(res) {
					$('.tbody').empty();
					var trStr = "";
					$.each(res.data.list, function(idx, item) {
						trStr += '<tr>' +
							'<td>' + item.id + '</td>' +
							'<td>' + item.name + '</td>' +
							'<td>' + item.english + '</td>' +
							'<td>' + item.math + '</td>' +
							'<td  data-id="' + item.id + '" ><span class="deleteMsg">删除</span><span class="editBtn">编辑</span></td>' +
							'</tr>';
					});
					$('.tbody').html(trStr);
				}
			});
		},
		add:function(){
			var obj = {
				name: $('.name').val(),
				english: $('.english').val(),
				math: $('.math').val(),
			}
			$.ajax({
				type: "get",
				url: "http://192.168.199.230:8000/add",
				async: true,
				data: obj,
				success: function(res) {
					layer.msg('成功添加', {
						icon: 1,
						time: 1000,
						end: function() {
							location.reload();
						}
					})
				}
			});
		},
		del:function(_id){
			$.ajax({
				type: "get",
				url: "http://192.168.199.230:8000/del",
				async: true,
				data: {
					id: _id
				},
				dataType: 'json',
				success: function(res) {
					layer.msg('成功删除', {
						icon: 1,
						time: 1000,
						end: function() {
							location.reload();
						}
					})
				}
			});
		},
		get:function(editId){
			$.ajax({
				type: "get",
				url: "http://192.168.199.230:8000/get",
				async: true,
				data: {
					id: editId
				},
				dataType: 'json',
				success: function(res) {
					$('.edit_name').val(res.data.info.name);
					$('.edit_english').val(res.data.info.english);
					$('.edit_math').val(res.data.info.math);
				}
			});
		},
		update:function(obj){
			$.ajax({
				type: "get",
				url: "http://192.168.199.230:8000/update",
				async: true,
				data: obj,
				dataType: 'json',
				success: function(res) {
					layer.msg('成功修改', {
							icon: 1,
							time: 1000,
							end: function() {
								location.reload();
								$('.editBody').hide();
							}
						})
				}
			});
		}
	}
	$('.newA').on('click', function() {
		$.ajax({
			type: "get",
			url: "http://192.168.199.230:8000/search",
			data: {
				pageSize: 2,
				pageCurrent: 1
			},
			async: true,
			success: function(res) {
				layer.msg('成功刷新', {
					icon: 1,
					time: 1000,

				})
			}
		});
	});

	//查询
	demo.searchFn();
	$('.searchBtn').on('click', function() {
		demo.searchFn()
	});
	$('.kayword').on('keypress', function(e) {
			if (e.keyCode == 13) {
				demo.searchFn()
			}
		})
		//添加数据
	$('.confirmAdd').on('click', function() {
		demo.add();
	});

	//删除数据
	$('body').on('click', '.deleteMsg', function() {
		var _id = $(this).parent().data('id');
		layer.confirm('确定删除数据', function(index) {
			demo.del(_id);
		})
	});
	//修改学生成绩信息
	var editId = null;
	$('body').on('click','.editBtn',function(){
		editId = $(this).parent().data('id');
		demo.get(editId);
		$('.editBody').show();
	})
	$('body').on('click','.editBodyClose',function(){
		$('.editBody').hide();
	});
	//确定修改
	$('body').on('click','.edit_confirm',function(){
		var obj = {
			id: editId,
			name: $('.edit_name').val(),
			english: $('.edit_english').val(),
			math: $('.edit_math').val(),
		}
		demo.update(obj);
	});
	
	
	
	
	function addCookie(name, value, expireHours) {
		var cookieString = name + "=" + escape(value);
		//判断是否设置过期时间
		if (expireHours > 0) {
			var date = new Date();
			date.setTime(date.getTime + expireHours * 3600 * 1000);
			cookieString = cookieString + "; expire=" + date.toGMTString();
		}
		document.cookie = cookieString;
	}

	function getCookie(name) {
		var strCookie = document.cookie;
		var arrCookie = strCookie.split("; ");
		for (var i = 0; i < arrCookie.length; i++) {
			var arr = arrCookie[i].split("=");
			if (arr[0] == name) return arr[1];
		}
		return "";
	}
	//查看详情
	$('body').on('click', '.SeeDetails', function() {
		addCookie('name', '张三', 1000);
	});
});