$(function () {
  //  实现登陆与注册界面切换
  $('.login a').on('click', function () {
    $('.login').hide().next().show()
  })
  $('.register a').on('click', function () {
    $('.register').hide().prev().show()
  })

  //  2. 开启验证规则
  // layui这个框架提供了一个暴露的对象layui
  // jQuery.js提供了一个暴露的对象 $ jQuery
  var form = layui.form
  form.verify({
    username: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp('^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$').test(value)) {
        return '用户名不能有特殊字符'
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "用户名首尾不能出现下划线'_'"
      }
      //   if(/^\d+\d+\d$/.test(value)){
      //     return '用户名不能全为数字';
      //   }
    },
    repass: function (value, item) {
      // item是当前的确认密码框元素
      // value是当前确认密码框中输入的值
      //   console.log(value)
      //   console.log(item)
      // 2.1 获取第一个密码框的值
      var passVal = $('.register input[name=password]').val()
      // 2.2 判断一下这两次密码是否一致
      if (value != passVal) {
        $('.register .pass,.register .repass').val('')
        return '两次密码输入不一样'
      }
    },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格']
  })

  //3、实现新用户的注册
  $('.register .myForm').on('submit', function (e) {
    // 阻止表单的默认行为
    e.preventDefault()

    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      // 使用表单序列化的方式将form标签内的所有的具有name属性的input select textarea标签的值一次性获取并拼接成字符串
      data: $(this).serialize(),
      success: function (res) {
        // 3.4 注册成功后提示用户 失败也要提示
        // console.log(res);
        layer.msg(res.message)
        if (res.status == 0) {
          $('.register .myForm')[0].reset()
          $('.register').hide().prev().show()
        }
      }
    })
  })

  // 4、实现用户的登录
  $('.login .myForm').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if (res.status == 0) {
          window.localStorage.setItem('token', res.token)
          location.href = './index.html'
        }
      }
    })
  })
})
