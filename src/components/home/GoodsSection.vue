<template>
  <div class="w section">
    <div class="title">{{ data.title }}</div>
    <div class="content">
      <goods-card
        v-for="(item, i) in data.results"
        :key="i"
        :item="item"
        :column="5"
      ></goods-card>
    </div>
  </div>
</template>

<script>
import GoodsCard from "@/components/GoodsCard.vue";
export default {
  //父子组件传值
  props: ["data"],
  methods: {},
  components: {
    GoodsCard,
  },
};
</script>

<style scoped lang="scss">
.section {
  margin-top: 2rem;
  .title {
    height: 6rem;
    font-size: 2rem;
    font-weight: 100;
    line-height: 6rem;
  }
  .content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
