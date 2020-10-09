$(function () {
  //  1. 开启验证规则
  // layui这个框架提供了一个暴露的对象layui
  // jQuery.js提供了一个暴露的对象 $ jQuery
  var form = layui.form
  form.verify({
    repass: function (value, item) {
      // item是当前的确认密码框元素
      // value是当前确认密码框中输入的值
      //   console.log(value)
      //   console.log(item)
      // 2.1 获取第一个密码框的值
      var passVal = $('.myForm input[name=newPwd]').val()
      // 2.2 判断一下这两次密码是否一致
      if (value != passVal) {
        $('.myForm .pass,.myForm .repass').val('')
        return '两次密码输入不一样'
      }
    },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格']
  })

  // 2. 更新密码
  // 2.1 给form标签注册submit事件
  $('.myForm').on('submit', function (e) {
    // 2.2 阻止默认请求行为
    e.preventDefault()
    // 2.3 发送ajax请求
    $.ajax({
      type: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        // 2.4 提示是否更新成功
        layer.open({
          title: '温馨提示',
          content: res.message,
          yes: function (index, layero) {
            //do something
            // 2.5 清空输入框的值
            // $('.myForm')[0].reset()
            $('.myForm .btn-reset').click() // 使用触发器的方式来实现清空输入框
            layer.close(index) //如果设定了yes回调，需进行手工关闭
          }
        })
      }
    })
  })
})
