<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" >
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginRef">
      <van-field v-model="user.mobile" name="mobile" label="手机号" placeholder="请输入手机号码"
        :rules="userFormRules.mobile" type="number" maxlength="11">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field v-model="user.code" name="验证码" label="验证码" placeholder="请输入验证码"
        :rules="userFormRules.code" type="number" maxlength="6">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down v-if="isCountDownShow" @finish="isCountDownShow=false" :time="60000" format="ss s"/>
          <van-button v-else @click="onSendSms" class="send-sms-btn" native-type="button" size="small" round type="default">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      userFormRules: {
        mobile: [{ required: true, message: '请填写用户名' }, { pattern: /1[3|5|7|8]\d{9}/, message: '手机格式错误' }],
        code: [{ required: true, message: '请填写验证码' }, { pattern: /\d{6}/, message: '验证码格式错误' }]
      },
      isCountDownShow: false// 是否展示倒计时
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onSubmit () {
      // 1. 获取表单数据
      const user = this.user
      console.log(user)
      this.$toast.loading({
        message: '登录中......',
        forbidClick: true,
        duration: 0
      })
      // TODO: 2. 表单验证
      // 3. 提交表单请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        // 登录成功跳转回原来页面
        this.$router.back()
      } catch (err) {
        this.$toast.fail('手机号或验证码错误')
        console.log('登录失败', err)
      }
      // 4. 根据请求响应结果处理后续操作
    },
    async   onSendSms () {
      // 1.校验手机号码
      try {
        await this.$refs.loginRef.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        const res = await sendSms(this.user.mobile)
        this.$toast.success(res, '发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 154px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
    background-color: #ededed;
  }

  .login-btn-wrap {
    padding: 53px 33px;

    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
