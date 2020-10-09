$(function () {
  // 1. 发送ajax请求获取当前登陆用户的用户名 昵称 邮箱
  // 1.1 直接发送ajax请求
  renderForm()
  function renderForm() {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        console.log(res)
        if (res.status == 0) {
          // $('.myForm input[name=username]').val(res.data.username)
          // $('.myForm input[name=nickname]').val(res.data.nickname)
          // $('.myForm input[name=email]').val(res.data.email)

          // 1.2.2使用layui中的val方法来赋值
          // 这个方法有两个参数，第一个参数表示form标签lay-filter=""的值
          // 第二个参数是一个对象 注意：对象中的属性名必须和form表单中input标签中的name值一致
          // layui.form.val('myForm', {
          //   username: res.data.username,
          //   nickname: res.data.nickname,
          //   email: res.data.email
          // })

          //1.2.3 可以简化成如下写法:
          layui.form.val('myForm', res.data)

          // 将获取到的数据存储起来
          window.renderData = res.data
        }
      }
    })
  }

  // 2. 实现表单验证
  layui.form.verify({
    nickname: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp('^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$').test(value)) {
        return '用户名不能有特殊字符'
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "用户名首尾不能出现下划线'_'"
      }
      if (/^\d+\d+\d$/.test(value)) {
        return '用户名不能全为数字'
      }
    }
  })

  // 3. 基本资料更新
  // 3.1 给form标签注册submit事件
  $('.myForm').on('submit', function (e) {
    // 3.2 阻止默认请求行为
    e.preventDefault()
    // 3.3 发送ajax请求
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      //   data: $(this).serialize(),
      data: layui.form.val('myForm'),
      success: function (res) {
        // 3.4 成功或失败都要进行提示
        layer.msg(res.message)
        window.parent.getUserInfo()
      }
    })
  })

  // 4. 重置基本资料
  // 4.1 给重置按钮注册事件

  $('.myForm .btn-reset').on('click', function (e) {
    // 4.2 阻止form标签的默认提交行为
    e.preventDefault()
    // 4.3 所谓重置就是显示原始的数据(用户名 昵称 邮箱)
    // 其实也就是重新发送ajax请求获取数据
    // renderForm() 这种方式会重复发送一次ajax请求

    // 还可以有第二种方式
    // 直接渲染原来的数据
    // window对象是顶级对象，所有的作用域都可以访问
    layui.form.val('myForm', window.renderData)
  })
})
