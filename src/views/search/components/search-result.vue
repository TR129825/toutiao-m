<template>
  <div class="search-result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="加载失败，点击重试">
      <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      queryInfo: {
        page: 1,
        perpage: 20,
        q: this.searchText
      },
      data: false
    }
  },
  methods: {
    async onLoad () {
      // 1.请求获取数据
      try {
        const { data } = await getSearchResult(this.queryInfo)
        // 2.将数据添加到列表数组中
        const { results } = data.data
        this.list.push(...results)
        // 3.将本次加载loading关闭
        this.loading = false
        // 4.判断是否还有数
        if (results.lenght) {
          this.pag++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        console.log('获取搜索结果失败')
        this.loading = false
      }
    }
  }
}
</script>

<style>
</style>
