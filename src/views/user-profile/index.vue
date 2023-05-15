<template>
    <div class="user-profile">
        <!-- 导航栏 -->
        <van-nav-bar title="个人信息" class="page-nav-bar" left-arrow @click-left="$router.back()"></van-nav-bar>
        <input type="file" hidden ref="file" @change="onFileChange">
        <van-cell title="头像" is-link @click="$refs.file.click()">
            <van-image class="avatar" fit="cover" :src="user.photo" round></van-image>
        </van-cell>
        <van-cell title="昵称" :value="user.name" is-link @click="isUpdataNameShow = true"></van-cell>
        <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link @click="isUpdataGenderShow = true"></van-cell>
        <van-cell title="生日" :value="user.birthday" is-link @click="isUpdataBirthShow=true"></van-cell>
        <!-- 编辑昵称弹出层 -->
        <van-popup v-model="isUpdataNameShow" style="height:100%" position="bottom">
            <update-name v-if="isUpdataNameShow" @close="isUpdataNameShow = false" v-model="user.name"></update-name>
        </van-popup>
        <!-- 编辑性别弹出层 -->
        <van-popup v-model="isUpdataGenderShow" position="bottom">
            <update-gender v-model="user.gender" @close="isUpdataGenderShow=false"></update-gender>
        </van-popup>
          <!-- 编辑生日弹出层 -->
          <van-popup v-model="isUpdataBirthShow"  position="bottom">
            <update-birth v-if="isUpdataBirthShow" v-model="user.birthday" @close="isUpdataBirthShow=false"></update-birth>
        </van-popup>
        <!-- 编辑弹出图像层 -->
        <van-popup v-model="isUpdataPhotoShow" style="height:100%"   position="top">
            <update-photo :img="img" @close="isUpdataPhotoShow=false" @update-photo="user.photo=$event"></update-photo>
        </van-popup>
    </div>
</template>

<script>
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirth from './components/update-birth.vue'
import UpdatePhoto from './components/update-photo.vue'
import { getUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  data () {
    return {
      user: {},
      isUpdataNameShow: false,
      isUpdataGenderShow: false,
      isUpdataBirthShow: false,
      isUpdataPhotoShow: false,
      img: null
    }
  },
  components: {
    UpdateName, UpdateGender, UpdateBirth, UpdatePhoto
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.user = data.data
      } catch (err) {
        console.log('获取用户嘻嘻失败', err)
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      const data = window.URL.createObjectURL(file)
      this.img = data
      this.isUpdataPhotoShow = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
    .avatar {
        width: 60px;
        height: 60px;
    }

    .van-popup {
        background-color: #f5f7f9;
    }
}
</style>
