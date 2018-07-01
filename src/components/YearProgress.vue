<template>
    <div class="progress">
        <progress :percent="percent" activeColor="#ea5a49" color="pink"/>
        <p>{{year}}已经过去了{{days}}天，{{percent}}%</p>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {}
        },
        computed: {
            year () {
                return new Date().getFullYear()
            },
            days () {
                let start = new Date()
                start.setMonth(0)
                start.setDate(1)
                let offset = new Date().getTime() - start.getTime()
                return parseInt(offset / 1000 / 60 / 60 / 24) + 1
            },
            percent () {
                return (this.days * 100 / this.getDayOfYear()).toFixed(1)
            }
        },
        methods: {
            isLeapYear () {
                const year = new Date().getFullYear()
                if (year % 400 === 0) {
                    return true
                } else if (year % 4 === 0 && year % 100 !== 0) {
                    return true
                } else {
                    return false
                }
            },
            getDayOfYear () {
                return this.isLeapYear() ? 366 : 365
            }
        }
    }
</script>

<style scoped lang="scss">
    .progress {
        width: 100%;
        margin-top: 50rpx;
        margin-bottom: 50rpx;
        progress {
        }
        p {
            text-align: center;
            margin-top: 20rpx;
        }
    }
</style>
