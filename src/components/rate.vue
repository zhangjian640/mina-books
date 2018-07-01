<template>
    <div class="rate">
        <span>☆☆☆☆☆</span>
        <div class="hollow" :style="width">★★★★★</div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            value: {type: [Number, String], default: 0}
        },
        computed: {
            width () {
                return `width:${this.value / 2}em`
            }
        }
    }
</script>

<style scoped lang="scss">
    .rate {
        position: relative;
        display: inline-block;
        .hollow{
            position: absolute;
            display: inline-block;
            top: 0;
            left: 0;
            width: 0;
            overflow: hidden;
        }
    }
</style>
