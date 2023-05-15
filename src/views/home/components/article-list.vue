<template>
    <div class="article-list">
        <van-pull-refresh v-model="isreFreshLoading" @refresh="onRefresh" :success-text="refreshSuccessText"
            :success-duration="150">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error"
                error-text="请求失败，点击重新加载" @load="onLoad">
                <article-item v-for="(article,index) in list" :key="index" :article="article"></article-item>
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
import { getArticles } from '@/api/article'
import ArticleItem from '../components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false, // 在控制列表加载失败提示
      isreFreshLoading: false, // 控制下拉刷新的loading状态
      refreshSuccessText: '刷新成功'

    }
  },
  created () {
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        if (Math.random() > 0.5) {
          JSON.parse('dadgasdgs')
        }
        // 把请求结果放到list数组中
        const { results } = data.data
        // 数组展开符
        this.list.push(...results)
        console.log(data)
        this.loading = false
        if (results.length) {
          // 更新获取下一页的事件戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，finish为true
          this.finished = true
        }
      } catch (err) {
        // 展示错误提示状态
        this.error = true
        // 请求失败loading也关闭
        this.loading = false
        console.log('请求文章列表数据失败！')
      }
    },
    // 下拉刷新触发
    async onRefresh () {
      // 请求获取数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.unshift(...data.data.results)
        this.isreFreshLoading = false
        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功更新了${results.length}条数据`
      } catch (err) {
        this.refreshSuccessText = '刷新失败'
        console.log('下拉列表刷新失败')
      }
      //   将数据追加到列表顶部
      // 关闭下拉的loading状态
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
    height: 79vh;
    overflow-y: auto;
}
</style>
