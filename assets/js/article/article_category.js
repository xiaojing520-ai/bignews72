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
})
