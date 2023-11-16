import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from "@/store";

// 白名单
const whiteList = ['/login', '/404']

router.beforeEach(async (to, from, next) => {

  // 进度条的开始
  NProgress.start()

  // 存在token
  if (store.getters.token) {
    // 判断是否 访问 登陆页
    if (to.path === '/login') {
      // 跳转到主页
      next('/dashboard')
      NProgress.done()
    } else {
      // 放过，到登录页
      next()
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 跳转到主页
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 结束进度条
  NProgress.done()
})
