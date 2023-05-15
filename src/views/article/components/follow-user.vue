<template>
    <div class="follow-user">
        <van-button v-if="isFollowed" class="follow-button" :loading="loading" round size="small" @click="onFollow">已关注</van-button>
        <van-button v-else class="follow-button" :loading="loading" round size="small" icon="plus" type="info" @click="onFollow">关注</van-button>
    </div>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
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
    async onFollow () {
      console.log(this.isFollowed)

      try {
        if (this.isFollowed) {
          // 取消关注
          const { data } = await deleteFollow(this.userId)
          console.log(data)
        } else {
          const { data } = await addFollow(this.userId)
          console.log(data)
        }
        // this.article.is_followed = !this.article.is_followed
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        console.log('操作失败，请重试', err)
      }
      this.loading = false
    }
  }
}
</script>

<style>
</style>
