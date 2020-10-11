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

  // 4. 单击选择封面的按钮弹出选择图片对话框
  // 4.1 给选择封面按钮注册事件
  $(".btn-upload").on("click", function (e) {
    e.preventDefault()
    $("#avatar").click()
  })

  // 5. 实现图片的本地预览功能
  // 5.1 给input标签注册change事件
  $("#avatar").on("change", function () {
    // 5.2 获取待上传的图片
    var file = this.files[0]
    // 5.3 生成图片的链接
    var imgUrl = URL.createObjectURL(file)

    // 5.4 实现本地预览功能 需要先销毁之前的 然后再显示新的
    $("#image")
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imgUrl) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })
})
