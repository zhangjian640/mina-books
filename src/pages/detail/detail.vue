<template>
    <div>
        <BookInfo :info="info"></BookInfo>
        <CommentList :comments="comments"></CommentList>
        <div class="comment" v-if="showAdd">
            <textarea v-model="comment"
                      class="textarea"
                      placeholder="请输入图书短评"
                      :maxlength="100"></textarea>
            <div class="location">
                地理位置：
                <switch color="#EA5A49" :checked="location" @change="getGeo"></switch>
                <span class="text-primary">{{location}}</span>
            </div>
            <div class="phone">
                手机型号：
                <switch color="#EA5A49" :checked="phone" @change="getPhone"></switch>
                <span class="text-primary">{{phone}}</span>
            </div>
            <button class="btn" @click="addComment">评论</button>
        </div>
        <div v-else class="text-footer"></div>
        <button open-type="share" class="btn">转发给好友</button>
    </div>
</template>

<script type="text/ecmascript-6">
    import utils from '@/utils'
    import BookInfo from '@/components/BookInfo'
    import CommentList from '@/components/CommentList'
    export default {
        data () {
            return {
                id: '',
                comment: '',
                comments: [],
                info: {},
                location: '',
                phone: '',
                userinfo: {}
            }
        },
        mounted () {
            this.id = this.$root.$mp.query.id
            this.getDetail()
            this.getComments()
            const userinfo = wx.getStorageSync('userinfo')
            if (userinfo) {
                this.userinfo = userinfo
            }
        },
        computed: {
            showAdd () {
                if (!this.userinfo.openId) {
                    return false
                }
                if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
                    return false
                }
                return true
            }
        },
        methods: {
            async getDetail () {
                const info = await utils.get('/weapp/bookdetail', { id: this.id })
                this.info = info
                wx.setNavigationBarTitle({
                    title: info.title
                })
            },
            async getComments () {
                const comments = await utils.get('/weapp/commentlist', { bookid: this.id })
                this.comments = comments.list
            },
            getGeo (e) {
                if (e.target.value) {
                    wx.getLocation({
                        type: 'wgs84',
                        success: (res) => {
                            const url = 'http://api.map.baidu.com/geocoder/v2/'
                            wx.request({
                                url,
                                data: {
                                    location: `${res.latitude},${res.longitude}`,
                                    output: 'json',
                                    ak: 'eg8Ocda34CCbLhaklmhEavrKHMGtAmbi'
                                },
                                success: (resp) => {
                                    if (resp.data.status === 0) {
                                        this.location = resp.data.result.addressComponent.city
                                    } else {
                                        console.log('出错了')
                                    }
                                }
                            })
                        }
                    })
                } else {
                    this.location = ''
                }
            },
            getPhone (e) {
                if (e.target.value) {
                    try {
                        var res = wx.getSystemInfoSync()
                        this.phone = res.model
                    } catch (e) {
                        // Do something when catch error
                    }
                } else {
                    this.phone = ''
                }
            },
            async addComment () {
                if (this.comment) {
                    const data = {
                        openid: this.userinfo.openId,
                        bookid: this.id,
                        comment: this.comment,
                        phone: this.phone,
                        location: this.location
                    }
                    await utils.post('/weapp/addcomment', data)
                    this.comment = ''
                    this.getComments()
                }
            }
        },
        components: {
            BookInfo,
            CommentList
        },
        onShareAppMessage () {}
    }
</script>

<style scoped lang="scss">
.comment{
    .textarea{
        width: 730rpx;
        height: 200rpx;
        background: #eee;
        padding: 10px;
    }
}
.location{
    margin: 10px;
}
.phone{
    margin: 10px;
}
.btn{
    background-color: #EA5149;
    color: #fff;
}
</style>
