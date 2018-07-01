<template>
    <div class="book-info">
        <div class="thumb">
            <img class="back" mode="aspectFill" :src="info.image">
            <img class="front" mode="aspectFit" :src="info.image">
            <div class="info">
                <div class="title">
                    {{info.title}}
                </div>
                <div class="author">
                    {{info.author}}
                </div>
            </div>
        </div>
        <div class="detail">
            <img class="avatar" mode="aspectFit" :src="userinfo.image">
            {{userinfo.nickName}}
            <div class="right text-primary">
                {{info.rate}}分
                <Rate :value="info.rate"></Rate>
            </div>
        </div>
        <div class="detail">
            {{info.publisher}}
            <div class="right">
                {{info.price}}
            </div>
        </div>
        <div class="tags">
            <div class="badge" v-for="tag in info.tags" :key="tag">{{tag}}</div>
        </div>
        <div class="summary">
            <p v-for="(sum, index) in info.summary" :key="index">{{sum}}</p>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import Rate from '@/components/rate'
    export default {
        props: ['info'],
        computed: {
            userinfo () {
                return this.info.user_info || {}
            }
        },
        components: {Rate}
    }
</script>

<style scoped lang="scss">
    .book-info {
        .thumb {
            width: 750rpx;
            height: 500rpx;
            position: relative;
            .back {
                filter: blur(15px);
                width: 100%;
            }
            .front {
                position: absolute;
                top: 30rpx;
                left: 0;
                right: 0;
                margin: 0 auto;
                width: 100%;
                height: 300rpx;
            }
            .info {
                position: absolute;
                width: 100%;
                left: 0;
                top: 330rpx;
                text-align: center;
                color: #fff;
                .title {
                    font-size: 20px;
                }
                .author {
                    font-size: 14px;
                }
            }
        }
        .right {
            float: right;
        }
        .detail {
            padding: 5px 10px;
            .avatar {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                vertical-align: middle;
            }

        }
        .tags{
            .badge{
                display: inline-block;
                margin: 5px;
                border-radius: 10px;
                border: 1px solid #EA4A49;
                color: #EA4A49;
                padding: 5px;
            }
        }
        .summary{
            padding: 0 10px;
            margin-top: 10px;
            p{
                text-indent: 2em;
            }
        }
    }
</style>
