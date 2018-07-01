<template>
    <div class="container">
        <CommentList
            v-if="userinfo.openId"
            type="user"
            :comments="comments"></CommentList>
        <div v-if="userinfo.openId">
            <div class="page-title">我的图书</div>
            <Card v-for="book in books" :key="book.id" :book="book"></Card>
        </div>
        <div v-if="!books.length">暂时没有添加过图书，快去收藏吧！</div>
    </div>
</template>

<script type="text/ecmascript-6">
    import utils from '@/utils'
    import CommentList from '@/components/CommentList'
    import Card from '@/components/card'
    export default {
        data () {
            return {
                comments: [],
                userinfo: {},
                books: {}
            }
        },
        onShow () {
            if (!this.userinfo.openId) {
                const userinfo = wx.getStorageSync('userinfo')
                if (userinfo) {
                    this.userinfo = userinfo
                    this.init()
                }
            }
        },
        onPullDownRefresh () {
            this.init()
            wx.stopPullDownRefresh()
        },
        methods: {
            init () {
                wx.showNavigationBarLoading()
                this.getComments()
                this.getBooks()
                wx.hideNavigationBarLoading()
            },
            async getBooks () {
                const books = await utils.get('/weapp/booklist', {
                    openid: this.userinfo.openId
                })
                this.books = books.list
                console.log(this.books)
            },
            async getComments () {
                const comments = await utils.get('/weapp/commentlist', {
                    openid: this.userinfo.openId
                })
                this.comments = comments.list
            }
        },
        components: {
            CommentList,
            Card
        }
    }
</script>

<style scoped lang="scss">
.page-title{
    padding: 20rpx;
    font-size: 14px;
    background-color: #eee;
}
</style>
