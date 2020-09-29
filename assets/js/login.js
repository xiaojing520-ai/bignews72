$(function () {
  //  实现登陆与注册界面切换
  $('.login a').on('click', function () {
    $('.login').hide().next().show()
  })
  $('.register a').on('click', function () {
    $('.register').hide().prev().show()
  })
})
