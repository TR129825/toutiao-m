<template>
    <van-cell class="article-item" :to="'/article/'+article.art_id">
        <div class="title van-multi-ellipsis--l2" slot="title" >{{ article.title }}</div>
        <div slot="label">
            <div v-if="article.cover.type === 3" class="cover-wrap">
                <div v-for="(img, index) in article.cover.images" :key="index" class="cover-item">
                    <van-image class="cover-item-img" fit="cover" :src="img" />
                </div>
            </div>
            <div class="label-info-wrap">
                <span>{{ article.aut_name }}</span>
                <span>{{ article.comm_count }}</span>
                <span>{{ article.pubdate | relativeTime}}</span>
            </div>
        </div>
        <van-image class="right-cover" v-if="article.cover.type === 1" slot="default" fit="cover" :src="article.cover.images[0]" />
    </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  components: {

  }
}
</script>

<style lang="less">
.article-item {
    .title {
        font-size: 32px;
        color: #3a3a3a;
    }
    .van-cell__value{
        flex: unset;
        width: 232px;
        height: 146px;
        padding-left: 25px;
        .right-cover{
            width: 232px;
            height: 146px;
        }
    }
    .label-info-wrap span{
        font-size: 22px;
        color: #b4b4b4;
        margin-right: 25px;
    }
    .cover-wrap{
        display: flex;
        padding: 30px 0;
        .cover-item{
            flex: 1;
            height: 146px;
            &:not(:last-child){
                padding-right: 4px;
            }
            .cover-item-img{
                width: 100%;
                height: 146px;
            }
        }
    }
}
</style>
