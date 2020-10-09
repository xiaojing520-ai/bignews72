$(function () {
  // 1. 发送请求 获取分类数据
  // 1.1 直接发送ajax请求
  renderList()
  function renderList() {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: function (res) {
        console.log(res)
        if (res.status == 0) {
          // 1.2 渲染列表
          var htmlStr = template("categoryList", res)
          $("tbody").html(htmlStr)
        }
      }
    })
  }

  // 添加分类
  // 2. 给添加分类按钮注册事件弹出添加分类的表单
  // 2.1 给按钮注册事件
  $(".btn-add-category").on("click", function () {
    // 2.2 调用layui.open方法
    window.addIndex = layer.open({
      title: "添加文章分类",
      type: 1,
      content: $("#addCategory").html(),
      area: ["500px", "250px"]
    })

    // 分类之弹出层数据校验
    // 3.实现验证功能
    var form = layui.form
    form.verify({
      username: function (value, item) {
        //value：表单的值、item：表单的DOM对象
        if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
          return "用户名不能有特殊字符"
        }
        if (/(^\_)|(\__)|(\_+$)/.test(value)) {
          return "用户名首尾不能出现下划线'_'"
        }
        if (/^\d+\d+\d$/.test(value)) {
          return "用户名不能全为数字"
        }
      }
    })

    // 给弹出层的确定按钮绑定点击事件 用事件委托
    // 4. 添加文章分类
    // 4.1 给body注册事件，通过form表单来触发

    $("body").on("submit", ".addForm", function (e) {
      // 4.2 阻止默认行为
      e.preventDefault()
      // 4.3 发送ajax请示
      $.ajax({
        type: "POST",
        url: "/my/article/addcates",
        data: $(this).serialize(),
        success: function (res) {
          console.log(res)
          if (res.status == 0) {
            // 4.4 添加成功后要关闭弹窗
            layer.close(window.addIndex)
            // 4.5 同时刷新分类列表
            renderList()
          }
        }
      })
    })
  })

  //   给删除按钮注册事件，弹出提示框
  //   删除按钮是模板动态生成的，不能直接绑定点击事件，要用到事件委托
  // 5. 删除文章分类
  // 5.1 使用委托的方式给删除按钮注册事件
  $("tbody").on("click", ".btn-del", function () {
    // 5.2 获取要删除的文章分类id
    var id = $(this).data("id")
    // 5.3 显示提示框
    layer.confirm("确定要删除这条数据吗", { icon: 3, title: "提示" }, function (
      index
    ) {
      //do something
      // 5.4 发送ajax请示
      $.ajax({
        type: "GET",
        url: "/my/article/deletecate/" + id,
        // 5.5 根据id来删除文章分类
        success: function (res) {
          console.log(res)
          if (res.status == 0) {
            layer.close(index)
            // 5.6 删除成功后要重新刷新页面
            renderList()
          }
        }
      })
    })
  })
})
