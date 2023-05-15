<template>
    <van-button :class="{liked:value===1}" :icon="value===1? 'good-job':'good-job-o'" :loading="loading" @click="onCollect"></van-button>
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      reuqire: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 已经点赞，取消点赞
          await deleteLike(this.articleId)
        } else {
          // 添加点赞
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === -1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        console.log(err, '请求错误')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
    .liked{
        .van-icon{
            color: #e5645f;
        }
    }
</style>
