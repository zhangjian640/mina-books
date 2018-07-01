<template>
    <div>
        <Swiper :tops="tops"></Swiper>
        <Card v-for="book in books" :book="book" :key="book.id"></Card>
        <p class="text-footer" v-if="!more">
            没有更多数据
        </p>
    </div>
</template>

<script type="text/ecmascript-6">
    import utils from '@/utils'
    import Card from '@/components/card'
    import Swiper from '@/components/Swiper'
    export default {
        data () {
            return {
                books: [],
                tops: [],
                page: 0,
                more: true
            }
        },
        mounted () {
            this.getList(true)
            this.getTop()
        },
        onPullDownRefresh () {
            this.getList(true)
            this.getTop()
        },
        onReachBottom () {
            if (!this.more) {
                return
            }
            this.page = this.page + 1
            this.getList()
        },
        methods: {
            async getList (init) {
                if (init) {
                    this.page = 0
                    this.more = true
                }
                wx.showNavigationBarLoading()
                const books = await utils.get('/weapp/booklist', {page: this.page})
                if (books.list.length < 10 && this.page > 0) {
                    this.more = false
                }
                if (init) {
                    this.books = books.list
                } else {
                    // 累加
                    this.books = this.books.concat(books.list)
                }
                wx.stopPullDownRefresh()
                wx.hideNavigationBarLoading()
            },
            async getTop () {
                const tops = await utils.get('/weapp/top')
                this.tops = tops.list
            }
        },
        components: {Card, Swiper}
    }
</script>

<style scoped>

</style>
