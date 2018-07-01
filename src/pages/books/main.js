import Vue from 'vue'
import Book from './books'

const app = new Vue(Book)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '图书列表',
        enablePullDownRefresh: true
    }
}
