<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error="error" error-text="加载失败，请重新尝试">
    <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.content" /> -->
    <comment-item v-for="(item,index) in list" :key="index" :comment="item"></comment-item>
  </van-list>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    CommentItem
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 用于获取下一页的时间戳
      limit: 10,
      error: false

    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    async  onLoad () {
      try {
        //  请求获取数据
        const { data } = await getComment({
          type: 'a',
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        // 将数据添加到列表中
        // const { results } = data.data
        const { results } = data.data
        this.list.push(...results)
        // 把文章评论总数量传递给外部
        this.$emit('onload-success', data.data)
        // 将loading设为false
        this.loading = false
        // 判断是否还有数据
        if (results.length) {
        // 有就获取下一页页码数据
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      // 没有就将finished设置为true
      } catch (err) {
        this.error = true
        this.loading = true
      }
    }
  }
}
</script>

<style>
</style>
