<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" slot="title" type="info" size="mini" round icon="search" to="/search">搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="channel.name" v-for=" channel in channels" :key="channel.id">
        <!-- 文章列表组件 -->
        <article-list :channel="channel"></article-list>
      </van-tab>
      <div slot="nav-right" class="palceholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChennalEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑弹出层 -->
    <van-popup v-model="isChennalEditShow" closeable close-icon-position="top-left" position="bottom"
      :style="{ height: '100%' }">
      <channel-edit :my-channels="channels" :active="active" @update-active="onUpdateActive"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      // 频道列表
      channels: [],
      // 控制弹出层默认显示状态
      isChennalEditShow: false
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        let channels = []
        if (this.user) {
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            channels = localChannels
          } else {
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        console.log('获取频道数据失败')
      }
    },
    onUpdateActive (index, isChennalEditShow = true) {
      this.active = index
      this.isChennalEditShow = isChennalEditShow
    }
  },
  computed: {
    ...mapState(['user'])
  }

}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;

  .van-nav-bar__title {
    max-width: unset;
  }

  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;

    .van-icon {
      font-size: 32px;
    }
  }

  /deep/.channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      z-index: 1;
      top: 92px;
      left: 0;
      right: 0;
    }

    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }

    .van-tab--active {
      color: #333
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;

    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;

      i.toutiao {
        font-size: 33px;
      }

      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background-image: url('~@/assets/gradient-gray-line.png');
        background-size: contain;
      }
    }

    .palceholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
  }
}
</style>
