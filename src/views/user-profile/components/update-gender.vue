<template>
  <div class="update-gender">
    <van-picker title="性别"
    :default-index="value"
     show-toolbar
    :columns="columns"
    @cancel="$emit('close')"
    @confirm="onConfirm"
    @change="onChange"/>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  methods: {
    async  onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0
      })
      try {
        const localGender = this.localGender
        await updateUserProfile({
          gender: localGender
        })
        // 更新视图
        this.$emit('input', localGender)
        // 关闭弹出层
        this.$emit('close')
        // 提示更新成功
        this.$toast('更新性别成功')
      } catch (err) {
        console.log('更新性别失败', err)
      }
    },
    onChange (picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style>

</style>
