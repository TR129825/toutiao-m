<template>
    <van-cell class="comment-item">
        <van-image slot="icon" class="avatar" round fit="cover" :src="comment.aut_photo"></van-image>
        <div slot="title" class="title-wrap">
            <div class="user-name" slot="title">{{comment.aut_name}}</div>
            <van-button @click="onCommentLike" :loading="commentLoading" class="like-btn" :class="{liked:comment.is_liking}" :icon="comment.is_liking?'good-job':'good-job-o'" >{{ comment.like_count>0 ? comment.like_count:'赞' }}</van-button>
        </div>
        <div slot="label">
            <p class="comment-content">{{ comment.content }}</p>
            <div class="bottom-info">
                <span class="comment-pubdate">{{comment.pubdate | relativeTime }}</span>
                <van-button class="reply-btn" round>回复 {{comment.reply_count}}</van-button>
            </div>
        </div>
        <!-- <div slot="label">124</div> -->
    </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  data () {
    return {
      commentLoading: false
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onCommentLike () {
      this.commentLoading = true
      try {
        if (this.comment.is_liking) {
          // 取消点赞
          await deleteCommentLike(this.comment.com_id)
          this.comment.like_count--
        } else {
          // 添加点赞
          await addCommentLike(this.comment.com_id)
          this.comment.like_count++
        }
        this.comment.is_liking = !this.comment.is_liking
      } catch (err) {
        console.log('出错率', err)
      }
      this.commentLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item{
.avatar{
    width: 72px;
    height: 72px;
    margin-right: 25px;
}
.title-wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name{
        color: #406599;
        font-size: 26px;
    }
    .like-btn{
        height: 30px;
        padding: 0;
        border:0;
        font-size: 19px;
        .van-icon{
            font-size: 30px;
        }
        &.liked{
            color: #e5645f;
        }
    }
}

}
</style>
