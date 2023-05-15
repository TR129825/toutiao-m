<template>
    <div class="update-name">
        <van-nav-bar title="昵称" left-text="取消" right-text="完成" @click-left="$emit('close')" @click-right="onConfirm"></van-nav-bar>
        <van-field v-model.trim="message" rows="2" autosize  type="textarea" maxlength="50" placeholder="请输入昵称"
            show-word-limit />
    </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: this.value,
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        const { data } = await updateUserProfile({
          name: localName
        })
        console.log(data)
        // 更新视图
        this.$emit('input', localName)
        // 关闭弾层
        this.$emit('close')
        // 更新成功
        this.$toast('更新昵称成功')
      } catch (err) {
        console.log('更新用户信息失败', err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-field{
    margin-top: 10px;
}
</style>
