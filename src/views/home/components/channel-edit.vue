<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button type="danger" plain round size="mini" class="edit-btn" @click="isEdit = !isEdit">{{ isEdit
        ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item v-for=" (channel, index) in myChannels" :key="index" class="grid-item"
        @click="onMyChannelClick(channel, index)">
        <van-icon slot="icon" name="clear" v-show="isEdit && !fiexChannels.includes(channel.id)"></van-icon>
        <span slot="text" :class="{ active: index === active }" class="text">{{ channel.name }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item v-for="(channel, index) in recommendChannels " :key="index" :text="channel.name" icon="plus"
        class="grid-item" @click="onAddChannel(channel)" />
    </van-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getAllChannels, addUserChannels, deleteUserChannels } from '@/api/channel'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.loadAllChannels()
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态显示
      fiexChannels: [0] // 固定频道
    }
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取全部频道列表失败')
      }
    },
    // 添加频道
    async onAddChannel (channel) {
      this.myChannels.push(channel)
      // 数据持久化处理
      if (this.user) {
        // 已登录，把数据请求接口放到线上
        try {
          await addUserChannels({
            id: channel.id,
            seq: this.myChannels.length
          })
        } catch (err) {
          console.log('添加用户频道失败')
        }
      } else {
        // 未登录，把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        if (this.fiexChannels.includes(channel.id)) {
          return
        }
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        // 编辑状态
        this.myChannels.splice(index, 1)
        this.deleteChnnel(channel)
      } else {
        // 非编辑状态
        this.$emit('update-active', index, false)
      }
    },
    async deleteChnnel (channel) {
      try {
        if (this.user) {
          // 已经登录，将数据更新到线上
          await deleteUserChannels(channel.id)
        } else {
          // 未登录，将数据更新到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        console.log('操作失败')
      }
    }

  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(mychannel => {
          return mychannel.id === channel.id
        })
      })
    }
  }

}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85059;
    border: 1px solid #f85059;
  }

  /deep/.grid-item {
    width: 160px;
    height: 86px;

    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;

      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
      }

      .van-grid-item__icon-wrapper {
        position: unset;
      }

    }
  }

  /deep/.my-grid {
    .van-icon-clear {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 15px;
      color: #cacaca;
      z-index: 2;
    }

    .van-grid-item__text {
      margin-top: 0;
    }

    .active {
      color: red !important;
    }

  }

  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        white-space: nowrap;
        flex-direction: row;

        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }

        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
