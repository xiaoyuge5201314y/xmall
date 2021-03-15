<template>
  <!-- 轮播图 -->
  <div class="banner w">
    <el-carousel height="50rem" :interval="2000" arrow="always">
      <el-carousel-item v-for="(item, i) in bannerList" :key="i">
        <router-link :to="`/goodsDetails?productId=${item.id}`" class="item">
          <img :src="item.imagebig" alt="" class="img" />
        </router-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerList: [],
    };
  },
  created() {
    //  中央事件总线获取数据
    this.$bus.$on("banner", (data) => {
      this.bannerList = data;
    });
  },
};
</script>

<style scoped lang="scss">
.banner {
  margin-top: 4rem;
  .item {
    height: 50rem;
    .img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>
