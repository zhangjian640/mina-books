<template>
    <a :href="defaultUrl">
        <div class="book-card">
            <div class="thumb" @click.stop="preview">
                <img
                    :src="book.image"
                    mode="aspectFit">
            </div>
            <div class="detail">
                <div class="row text-primary">
                    <div class="left">
                        {{book.title}}
                    </div>
                    <div class="right">
                        {{book.rate}}
                        <Rate :value="book.rate"></Rate>
                    </div>
                </div>
                <div class="row">
                    <div class="left">
                        {{book.author}}
                    </div>
                    <div class="right">
                        浏览量
                    </div>
                </div>
                <div class="row">
                    <div class="left">
                        {{book.publisher}}
                    </div>
                    <div class="right">
                        {{book.user_info.nickName}}
                    </div>
                </div>
            </div>
        </div>
    </a>
</template>

<script>
    import Rate from '@/components/rate'

    export default {
        props: ['book'],
        computed: {
            defaultUrl () {
                return '/pages/detail/main?id=' + this.book.id
            }
        },
        methods: {
            preview () {
                wx.previewImage({
                    current: this.book.image,
                    urls: [this.book.image]
                })
            }
        },
        components: { Rate }
    }
</script>

<style scoped lang="scss">
    .book-card {
        padding: 5px;
        margin-top: 5px;
        margin-bottom: 5px;
        display: flex;
        font-size: 14px;
        .thumb {
            width: 90px;
            height: 90px;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
        .detail {
            margin-left: 20rpx;
            flex: 1;
            .row {
                line-height: 20px;
                margin-bottom: 3px;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
