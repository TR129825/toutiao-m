<template>
  <div class="search-suggestion">
    <van-cell v-for="(text,index) in suggestions" :key="index"  icon="search" @click="$emit('search',text)">
      <span slot="title" v-html="highlight(text)"></span>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestions: [] // 联想建议数据
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // 当searchText改变时会调用handler函数
      // handler (value) {
      //   this.loadSearchSuggestion()
      // },
      handler: debounce(function (value) {
        this.loadSearchSuggestion()
      }, 200),
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestion () {
      try {
        const { data } = await getSearchSuggestion(this.searchText)
        this.suggestions = data.data.options
      } catch (err) {
        console.log('数据获取失败')
      }
    },
    highlight (text) {
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, `<span style="color:#3296fa">${this.searchText}</span>`)
    }
  }
}
</script>

<style>

</style>
