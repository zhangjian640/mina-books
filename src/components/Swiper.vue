<template>
    <div class="swiper">
        <swiper indicator-dots="true"
                indciator-color="#EA5A49"
                autoplay="true"
                interval="6000"
                duration="1000"
                circular="true">
            <div v-for="(top, i) in imgUrls" :key="i">
                <swiper-item>
                    <img
                        class="slide-image"
                        mode="aspectFit"
                        v-for="item in top"
                        :src="item.image"
                        :key="item.id"
                        @click="bookDetail(item.id)">
                </swiper-item>
            </div>
        </swiper>

    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: ['tops'],
        data () {
            return {}
        },
        computed: {
            imgUrls () {
                let res = this.tops
                return [res.slice(0, 3), res.slice(3, 6), res.slice(6)]
            }
        },
        methods: {
            bookDetail (id) {
                wx.navigateTo({
                    url: '/pages/detail/main?id=' + id
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .swiper {
        margin-top: 10rpx;
    }

    .slide-image {
        width: 33%;
        height: 250rpx;
    }
</style>
