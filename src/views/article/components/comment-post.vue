<template>
  <div class="comment-post">
    <van-field class="post-field" v-model.trim="message" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入内容" show-word-limit></van-field>
    <van-button class="post-btn" @click="onPostComment" :disabled="!message.length">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onPostComment () {
      try {
        const { data } = await addComment({
          target: this.target,
          content: this.message,
          art_id: null
        })
        console.log(data)
        this.message = ''
        this.$emit('post-success', data.data)
      } catch (err) {
        console.log('请求失败', err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
