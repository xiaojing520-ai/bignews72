$(function () {
  // 1. 发送请求 获取分类数据
  // 1.1 直接发送ajax请求
  $.ajax({
    type: 'GET',
    url: '/my/article/cates',
    success: function (res) {
      console.log(res)
      if (res.status == 0) {
        // 1.2 渲染列表
        var htmlStr = template('categoryList', res)
        $('tbody').html(htmlStr)
      }
    }
  })

  // 添加分类
  // 2. 给添加分类按钮注册事件弹出添加分类的表单
  // 2.1 给按钮注册事件
  $('.btn-add-category').on('click', function () {
    // 2.2 调用layui.open方法
    layer.open({
      title: '添加文章分类',
      type: 1,
      content: $('#addCategory').html(),
      area: ['500px', '250px']
    })
  })
})
