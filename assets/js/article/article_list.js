$(function () {
  // 1. 发送ajax请求获取分类数据
  // 1.1 立即发送ajax请示
  $.ajax({
    type: "GET",
    url: "/my/article/cates",
    success: function (res) {
      console.log(res)
      // 1.2 将数据渲染到下拉列表当中
      if (res.status == 0) {
        var htmlStr = template("categoryList", res)
        $("#category").html(htmlStr)

        // 重新渲染一下表单内容
        layui.form.render()
      }
    }
  })

  // 文章列表页中发送给服务器的参数数据
  var options = {
    pagenum: 1, // 页码值 默认是第1页
    pagesize: 3, // 每页显示的文章数据 默认是3页
    cate_id: $("#category").val(), // 文章的所属分类
    state: $("#state").val() // 文章的当前状态
  }

  // 2. 获取文章列表中的数据
  // 2.1 直接发送ajax请示

  $.ajax({
    type: "GET",
    url: "/my/article/list",
    data: options,
    success: function (res) {
      console.log(res)
      if (res.status == 0) {
        // 2.2 使用模板进行渲染
        var htmlStr = template("articleList", res)
        $("tbody").html(htmlStr)
      }
    }
  })
})
