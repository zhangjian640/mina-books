<script>
    import qcloud from 'wafer2-client-sdk'
    import config from './config'
    export default {
        async created () {
            qcloud.setLoginUrl(config.loginUrl)
            let user = wx.getStorageSync('userinfo')
            if (!user) {
                qcloud.login({
                    success (userinfo) {
                        console.log('登录成功', userinfo)
                        wx.setStorageSync('userinfo', userinfo)
                    },
                    fail (err) {
                        console.log('登录失败', err)
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .text-primary{
        color: #EA5149;
    }
    .text-footer{
        text-align: center;
        font-size: 12px;
        margin-bottom: 5px;
    }
</style>
