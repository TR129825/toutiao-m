<template>
  <div class="search-contaier">
    <!-- 顶部搜索栏 -->
    <form action="/">
      <van-search class="" v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel"
        background="#3296fa" @focus="isResultShow=false" />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText"></search-result>
    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"></search-suggestion>
    <!-- 搜索历史记录 -->
    <search-history v-else></search-history>

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
export default {
  name: 'Search',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult

  },
  props: {

  },
  data () {
    return {
      searchText: '',
      isResultShow: false // 控制搜索结果展示
    }
  },
  methods: {
    onSearch (val) {
      console.log(val)
      this.searchText = val
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }

}
</script>

<style lang="less" scoped>
.search-contaier {
  .van-search__action {
    color: #fff
  }
}
</style>
