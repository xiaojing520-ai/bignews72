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

  // 发布文章  用事件委托
  $(".myForm").on("click", ".btn", function (e) {
    // 6.2 阻止默认行为
    e.preventDefault()
    // console.log(e.target);
    // 6.3 准备数据
    var data = new FormData($(".myForm")[0])
    // 6.4 判断此文章是什么状态 '发布' '草稿'
    if ($(e.target).hasClass("btn-release")) {
      // 说明是 发布
      data.append("state", "发布")
    } else {
      // 说明是 草稿
      data.append("state", "草稿")
    }

    $image
      .cropper("getCroppedCanvas", {
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {
        // 将裁剪之后的图片，转化为 blob 对象
        data.append("cover_img", blob)
        // 由于原始的方式获取图片不到，因此使用如下方式来获取
        data.append("content", tinyMCE.activeEditor.getContent())

        // 发起请求，把文章信息保存到服务器
        $.ajax({
          type: "POST",
          url: "/my/article/add",
          data: data,
          contentType: false,
          processData: false,
          success: function (res) {
            console.log(res)
            if (res.status !== 0) {
              return layer.msg("发表文章失败！")
            } else {
              // 发表文章成功之后，立即跳转到文章列表页面
              location.href = "./article_list.html"
            }
          }
        })
      })
  })
})
