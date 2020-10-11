$(function () {
  // 1. 启用富文本编辑器
  initEditor()

  // 2. 创建裁切区
  // 2.1 获取裁剪区域的 DOM 元素
  var $image = $("#image")

  // 2.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 400 / 280,
    // 指定预览区域
    preview: ".img-preview"
  }

  // 2.3 创建裁剪区域
  $image.cropper(options)

  // 3. 发送ajax请求获取分类数据
  // 3.1 立即发送ajax请示
  $.ajax({
    type: "GET",
    url: "/my/article/cates",
    success: function (res) {
      console.log(res)
      // 3.2 将数据渲染到下拉列表当中
      if (res.status == 0) {
        var htmlStr = template("categoryList", res)
        $("#category").html(htmlStr)

        // 重新渲染一下表单内容
        layui.form.render()
      }
    }
  })
})
