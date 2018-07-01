<template>
<div class="comment-list">
    <div class="page-title" v-if="comments.length">
        我的评论
    </div>
    <div class="comment"
         v-for="(comment, index) in comments"
         :key="index"
         @click="handleClick(comment)"
    >
        <div class="user">
            <div class="inline">
                <img :src="comment.image" class="avatar" mode="aspectFit">
                {{comment.title}}
            </div>
            <div class="right">
                {{comment.location || '未知地点'}}
                <span class="text-primary">-</span>
                {{comment.phone || '未知型号'}}
            </div>
        </div>
        <div class="content">
            {{comment.comment}}
        </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
  export default {
      props: ['comments', 'type'],
      methods: {
          handleClick (comment) {
              if (this.type === 'user') {
                  wx.navigateTo({
                      url: '/pages/detail/main?id=' + comment.bookid
                  })
              }
          }
      }
  }
</script>

<style scoped lang="scss">
.comment-list{
    background-color: #eee;
    font-size: 14px;
    .page-title{
        padding: 20rpx;
        font-size: 14px;
    }
    .comment{
        background-color: #fff;
        margin-bottom: 10px;
        padding: 5px 10px;
        .user{
            display: flex;
            justify-content: space-between;
            .inline{
                .avatar{
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    vertical-align: middle;
                }
            }
        }
        .content{
            margin: 10px 0;
        }
    }
}
</style>
