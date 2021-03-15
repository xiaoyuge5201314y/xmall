<template>
  <div class="Home">
    <!-- 导航栏 -->
    <my-header></my-header>
    <!-- 轮播图 -->
    <banner style="margin-top: 10rem" :data="homeData.banner"></banner>
    <!-- 商品区 -->
    <section v-for="(item, i) in sectionList" :key="i">
      <goods-section :data="item"></goods-section>
    </section>
    <!-- footer -->
  </div>
</template>

<script>
// 导入导航栏
import MyHeader from "@/components/MyHeader.vue";
import Banner from "@/components/home/Banner.vue";
import GoodsSection from "@/components/home/GoodsSection.vue";
export default {
  data() {
    return {
      // 所有数据
      homeData: {},
      // 购物区域数据
      sectionList: {},
    };
  },

  components: {
    MyHeader,
    Banner,
    GoodsSection,
  },
  methods: {
    // 获取home数据
    getHomeData() {
      // 渲染数据
      this.$http.get("/home").then((res) => {
        if (res.code == 200) {
          this.$bus.$emit("banner", res.data.banner);
          this.sectionList = res.data.section;
        }
      });
    },
  },
  created() {
    this.getHomeData();
  },
};
</script>

<style scoped lang="scss">
.Home {
  overflow: hidden;
}
</style>
