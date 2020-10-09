$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')

  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // 2. 弹出选择文件的窗口
  // 2.1 给上传按钮注册事件
  $('.btn-upload').on('click', function () {
    // 2.2 弹出选择文件的窗口
    $('#avatar').click()
  })

  //给文件按钮注册change事件，生成图片的一个链接，显示出来
  // 3. 预览待上传的图片
  // 3.1 给文件按钮注册change事件
  $('#avatar').on('change', function () {
    // console.dir(this)
    // 3.2 获取待上传的图片
    var file = this.files[0]
    // console.log(file) 图片信息
    // 3.3 生成一个链接
    var imgURL = URL.createObjectURL(file)
    // console.log(imgURL)  生成一个图片链接

    // 3.4 显示到img标签内

    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })

  //上传头像   给确定按钮注册事件
  // 4. 上传头像
  // 4.1 给确定按钮注册事件
  $('.btn-sure').on('click', function () {
    // 4.2 生成base64格式的图片链接
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 4.3 发送ajax请示
    $.ajax({
      type: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        console.log(res)
        if (res.status == 0) {
          // 4.4 更新成功之后要提示一下
          layer.msg(res.message)
          //4.5 主页面的头像要换掉
          window.parent.getUserInfo()
        }
      }
    })
  })
})
