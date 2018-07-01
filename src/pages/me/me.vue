<template>
    <div class="container">
        <div class="no-login" v-if="!baseUserInfo">
            <div class="default-icon">
                <img src="/static/img/user.png" alt="">
            </div>
            <button class="login-btn" @getuserinfo="hello" open-type="getUserInfo">点击登录</button>
        </div>
        <div v-else class="userinfo">
            <img class="avatar" :src="baseUserInfo.avatarUrl">
            <p class="nickname">{{baseUserInfo.nickName}}</p>
        </div>
        <year-progress></year-progress>
        <button @click="scanBook" class="btn">添加图书</button>
    </div>
</template>

<script>
    import YearProgress from '@/components/YearProgress'
    import utils from '@/utils'
    export default {
        data () {
            return {
                baseUserInfo: null,
                userinfo: null
            }
        },
        created () {
            const baseUserInfo = wx.getStorageSync('baseUserInfo')
            if (baseUserInfo) {
                this.baseUserInfo = baseUserInfo
            }
            this.userinfo = wx.getStorageSync('userinfo')
        },
        methods: {
            hello (cb) {
                this.userinfo = cb.target.userInfo
                wx.setStorageSync('baseUserInfo', cb.target.userInfo)
            },
            scanBook () {
                wx.scanCode({
                    success: (res) => {
                        if (res.result) {
                            this.addBook(res.result)
                        }
                    }
                })
            },
            async addBook (isbn) {
                const res = await utils.post('/weapp/addbook', {
                    isbn,
                    openid: this.userinfo.openId
                })
                utils.showModel('添加成功', `${res.title}添加成功`)
            }
        },
        components: {
            YearProgress
        }
    }
</script>

<style lang="scss">
.container{
    padding: 0 30rpx;
    .userinfo{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30rpx;
        .avatar{
            width: 128rpx;
            height: 128rpx;
            border-radius: 50%;
        }
        .nickname{
        }
    }
}
    .btn{
        width: 100%;
        height: 40px;
        color: white;
        background-color: #ea5a49;
        margin-bottom: 10px;
        padding-left: 15px;
        border-radius: 2px;
        font-size: 16px;
        line-height: 40px;
        &:active{
            background-color: #fa5a49;
        }
    }
    .no-login{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .default-icon{
            width: 128rpx;
            height: 128rpx;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .login-btn{
            height: 50rpx;
            line-height: 50rpx;
            margin-top: 10rpx;
        }
    }
</style>

