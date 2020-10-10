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
})
