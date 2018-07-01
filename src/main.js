import Vue from 'vue'
import App from './App'
import store from '@/store'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
    store
})
app.$mount()
Vue.prototype.$store = store
export default {
    // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages: ['pages/me/main', '^pages/comments/main', 'pages/books/main'],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#EA5149',
            navigationBarTitleText: 'mpvue',
            navigationBarTextStyle: 'light'
        },
        'tabBar': {
            selectedColor: '#ea5149',
            list: [
                {
                    pagePath: 'pages/books/main',
                    text: '图书列表',
                    iconPath: 'static/img/book.png',
                    selectedIconPath: 'static/img/book-active.png'
                },
                {
                    pagePath: 'pages/comments/main',
                    text: '评论',
                    iconPath: 'static/img/todo.png',
                    selectedIconPath: 'static/img/todo-active.png'
                },
                {
                    pagePath: 'pages/me/main',
                    text: '个人中心',
                    iconPath: 'static/img/me.png',
                    selectedIconPath: 'static/img/me-active.png'
                }
            ]
        }
    }
}
