import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
// dayjs默认语言是英文
dayjs().format('YYYY-MM-DD')
// 模板过滤器， 相当于定义了一个全局可用的方法
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value)) // 31 年前
})
