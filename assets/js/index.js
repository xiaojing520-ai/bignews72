$(function () {
  // 1. 发送请求获取登陆用户的昵称和头像
  // 1.1 立即发送ajax请求
  // 获取用户信息
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   //   Authorization:
    //   //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQyNTYsInVzZXJuYW1lIjoieHVqaW5nIiwicGFzc3dvcmQiOiIiLCJuaWNrbmFtZSI6IiIsImVtYWlsIjoiIiwidXNlcl9waWMiOiIiLCJpYXQiOjE2MDE5MDc1MTYsImV4cCI6MTYwMTk0MzUxNn0.umkmqBt0z9l1ck8Hx69mchR5HKQ6WOw6xFqGC_f73nY'
    //   Authorization: window.localStorage.getItem('token')
    // },
    success: function (res) {
      console.log(res)
      if (res.status === 0) {
        var nickname =
          res.data.nickname == '' ? res.data.username : res.data.nickname
        //渲染欢迎语
        $('.userInfo .welcome').html(`欢迎&nbsp;&nbsp;${nickname}`)
        //如果有头像和没头像的判断
        if (!res.data.user_pic) {
          //没头像
          $('.userInfo .text-avatar').html(nickname.slice(0, 1).toUpperCase())
          $('.layui-header .text-avatar').html(
            nickname.slice(0, 1).toUpperCase()
          )
        } else {
          //有头像
          $('.userInfo img').show().attr('src', res.data.user_pic).prev().hide()
        }
      }
    }
    // 验证token
    // complete: function (res) {
    //   // responseJSON: {status: 1, message: "身份认证失败！"}
    //   if (
    //     res.responseJSON.status == 1 &&
    //     res.responseJSON.message == '身份认证失败！'
    //   ) {
    //     location.href = './login.html'
    //   }
    // }
  })

  // 2、实现退出功能

  // 2.1给退出按钮注册点击事件
  $('.logout').on('click', function () {
    layer.confirm('你确定要退出吗', { icon: 3, title: '提示' }, function (
      index
    ) {
      //do something
      // 2.2删除本地储存的token
      window.localStorage.removeItem('token')
      // 2.3跳转到登录页面
      location.href = './login.html'

      layer.close(index)
    })
  })
})
