// 文章请求模块
import request from '@/utils/request'

// 请求获取文章列表数据

export const getArticles = params => {
  return request({
    mehtods: 'GET',
    url: '/v1_0/articles',
    params
  })
}

// 请求文章数据
export const getArticleById = articleId => {
  return request({
    mehtods: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}
// 收藏文章
export const addCollect = target => {
  return request({
    mehtods: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏文章
export const deleteCollect = target => {
  return request({
    mehtods: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
// 点赞文章
export const addLike = target => {
  return request({
    mehtods: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}
// 取消点赞文章
export const deleteLike = target => {
  return request({
    mehtods: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}
