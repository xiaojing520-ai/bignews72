// 可以不用写入口函数
// 只要发送ajax请示，就会先执行这个拦截器函数
$.ajaxPrefilter(function (options) {
  //   console.log(options) // 包括发送ajax请求时参数的所有内容
  options.url = 'http://ajax.frontend.itheima.net' + options.url

  // 统一设置token 应该要将登陆和注册的请求排除在外
  if (options.url.includes('/my')) {
    options.headers = {
      Authorization: window.localStorage.getItem('token')
    }
  }
  // 统一开启防翻墙
  options.complete = function (res) {
    // responseJSON: {status: 1, message: "身份认证失败！"}
    if (
      res.responseJSON.status == 1 &&
      res.responseJSON.message == '身份认证失败！'
    ) {
      location.href = './login.html'
    }
  }
})
