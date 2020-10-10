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
  renderList()
  function renderList() {
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

          // 2.3 启用分页
          renderPage(res)
        }
      }
    })
  }

  // 3. 筛选文章
  // 3.1 给form标签注册事件 通过筛选按钮来触发
  $(".myForm").on("submit", function (e) {
    // 3.2 阻止默认请求行为
    e.preventDefault()
    // 3.2 改变筛选的条件
    options.cate_id = $("#category").val()
    options.state = $("#state").val()
    // 3.3 发送ajax请求获取新数据
    renderList()
  })

  // 文章列表页的分页布局
  function renderPage(res) {
    var laypage = layui.laypage
    //执行一个laypage实例
    laypage.render({
      elem: "test1", //注意，这里的 test1 是 ID，不用加 # 号
      count: res.total, //数据总数，从服务端得到
      limit: options.pagesize, // 默认每页显示的条数
      limits: [2, 3, 5, 10],
      curr: options.pagenum, // 默认起始页
      layout: ["count", "limit", "prev", "page", "next", "skip", "first"],
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数
        // console.log(first);
        //首次不执行
        if (!first) {
          //do something
          // 修改发送给服务器的参数 当前页码值 当前每页的数据
          options.pagenum = obj.curr
          options.pagesize = obj.limit

          // 发送请求，获取最新的分布数据显示出来
          renderList()
        }
      }
    })
  }

  // 删除文章列表的功能
  //使用委托的方式给删除按钮注册事件，发送请示，删除数据
  $("tbody").on("click", ".btn-del", function () {
    // 5.9 获取当前页面中的文章数据  用什么来数量来表示都可以 比如说:删除按钮的个数 编辑按钮
    var count = $("tbody .btn-del").length
    // 5.2 获取当前删除按钮中的id
    var articleId = $(this).data("id")
    // 5.3 弹出提示框
    layer.confirm(
      "确认要删除该条数据吗?",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        // 5.4 发送ajax请求
        $.ajax({
          type: "GET",
          url: "/my/article/delete/" + articleId,
          success: function (res) {
            console.log(res)
            if (res.status == 0) {
              // 5.5 提示信息
              layer.msg(res.message)
              // 5.7 关闭弹出层
              layer.close(index)
              // 5.10 判断当前页码中的文章数量
              if (count == 1) {
                options.pagenum = options.pagenum == 1 ? 1 : options.pagenum - 1
              }
              // 5.8 重新刷新页面
              renderList()
            }
          }
        })
      }
    )
  })
})
