<template>
    <div class="article-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="黑马头条" left-arrow @click-left="$router.back()"></van-nav-bar>
        <div class="main-wrap">
            <!-- 加载中 -->
            <div v-if="loading" class="loading-wrap">
                <van-loading color="#3296fa" vertical>加载中</van-loading>
            </div>
            <!-- /加载中 -->

            <!-- 文章标题 -->
            <div v-else-if="article.title" class="article-detail">
                <h1 class="article-title">{{ article.title }}</h1>
                <!-- /文章标题 -->
                <!-- 用户信息 -->
                <van-cell class="user-info" center :border="false">
                    <van-image slot="icon" class="avatar" fit="cover" round :src="article.aut_photo" />
                    <div slot="title" class="user-name">{{ article.aut_name }}</div>
                    <div slot="label" class="publish-date">{{ article.pubdate | relativeTime }}</div>
                    <follow-user :is-followed="article.is_followed" :user-id="article.aut_id"
                        @update-is_followed="article.is_followed = $event"></follow-user>
                    <!-- <van-button v-if="article.is_followed" class="follow-button" round size="small" @click="onFollow">已关注</van-button>
                    <van-button v-else class="follow-button" round size="small" icon="plus" type="info" @click="onFollow">关注</van-button> -->
                </van-cell>
                <!-- 用户信息 -->
                <!-- 文章内容 -->
                <div class="article-content  markdown-body" ref="article-content" v-html="article.content"></div>
                <van-divider>正文结束</van-divider>
                <!-- 文章评论列表 -->
               <comment-list :source="article.art_id" @onload-success="totalCommentCount=$event.total_count" :list="commentList"></comment-list>
                <!-- /文章评论列表 -->
                <!-- 底部区域 -->
                <div class="article-bottom">
                    <van-button class="comment-btn" type="default" @click="isPostCommentShow=true">写评论</van-button>
                    <van-icon class="comment-icon" name="comment-o" :info="totalCommentCount"></van-icon>
                    <!-- <van-button class="btn-item" icon="star-o"></van-button> -->
                    <collect-article class="btn-item" v-model="article.is_collected" :article-id="article.art_id"></collect-article>
                    <!-- <van-button class="btn-item" icon="good-job-o"></van-button> -->
                    <like-article class="btn-item" v-model="article.attitude" :article-id="article.art_id"></like-article>
                    <van-icon name="share" color="#777777"></van-icon>
                </div>
                <!-- /底部区域 -->
            </div>
            <!-- 加载失败：404 -->
            <div v-else-if="errStatus === 404" class="error-wrap">
                <van-icon name="failure"></van-icon>
                <p class="text">资源不存在或已经删除！</p>
            </div>
            <!-- 加载失败：404 -->
            <!-- 加载失败，其他未知源错误 -->
            <div v-else class="error-wrap">
                <van-icon name="failure"></van-icon>
                <p class="text">内容加载失败！</p>
                <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
            </div>
            <!-- 文章评论列表 -->
            <!-- /文章评论列表 -->
            <!-- 发布评论 -->
            <!-- /发布评论 -->
            <!-- 弹出层 -->
            <van-popup v-model="isPostCommentShow">
              <comment-post :target="article.art_id" @post-success="onPostSuccess"></comment-post>
            </van-popup>
        </div>
    </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import FollowUser from './components/follow-user.vue'
import CollectArticle from '@/components/collect-article.vue'
import LikeArticle from '@/components/like-article'
import CommentList from './components/comment-list.vue'
import CommentPost from './components/comment-post.vue'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser, CollectArticle, LikeArticle, CommentList, CommentPost

  },
  props: {
    articleId: {
      type: [Number, String],
      required: true,
      errStatus: 0 // error的status
    }
  },
  data () {
    return {
      article: {},
      loading: true, // 加载的loading状态
      errStatus: 0,
      followLoading: false,
      totalCommentCount: 0,
      isPostCommentShow: false,
      commentList: []// 评论列表
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      try {
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
        // 初始化图片点击预览
        setTimeout(() => {

        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        console.log('获取数据失败', err)
      }
      this.loading = false
    },
    ImagePreview () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    onPostSuccess (data) {
      // 关闭弹出层
      this.isPostCommentShow = false
      this.commentList.unshift(data.new_obj)
    }

  }
}
</script>

<style lang="less" scoped>
@import "./github-markdown.css";

.article-container {
    .page-nav-bar {
        background-color: #3296fa;
    }

    .main-wrap {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #fff;

        .loading-wrap {
            padding: 200px 32px;
        }
    }

    .article-detail {
        position: fixed;
        left: 0;
        right: 0;
        top: 92px;
        bottom: 88px;
        overflow-y: scroll;
        background-color: #fff;

        .article-title {
            font-size: 40px;
            color: #3a3a3a;
            padding: 50px 32px;
            margin: 0;
        }

        .article-content {
            padding: 0 32px;
        }

        .user-info {
            padding: 0 32px;

            .avatar {
                width: 70px;
                height: 70px;
                margin-right: 17px;
            }
        }
    }

    .error-wrap {
        padding: 200px 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .van-icon {
            font-size: 122px;
            color: #b4b4b4;
        }

        .text {
            font-size: 30px;
            color: #666666;
            margin: 33px 0 46px;
            z-index: 1;
        }

        .retry-btn {
            width: 280px;
            height: 70px;
            line-height: 70px;
            border: 1px solid #c3c3c3;
            font-size: 30px;
            color: #666666;
        }

    }

    .article-bottom {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        // box-sizing:border-box;
        height: 88px;
        border-top: 1px solid #d8d8d8;
        background-color: #fff;

        .comment-btn {
            width: 282px;
            height: 46px;
            border: 2px solid #eee;
            font-size: 30px;
            line-height: 46px;
            color: #a7a7a7;
        }

        /deep/ .van-icon {
            font-size: 40px;
        }

        .van-info {
            font-size: 16px;
            background-color: #e22829;
        }

        /deep/.btn-item {
            border: none;
            padding: 0;
            line-height: 40px;
            color: #777777;
        }
    }
}
</style>
