<template>
  <div
    class="item"
    @click="goodsClick(item.id)"
    :style="{ width: 100 / column + '%' }"
  >
    <div class="inner">
      <div class="img"><img :src="item.imagebig" alt="" /></div>
      <div class="goodsName">{{ item.name }}</div>
      <div class="desc">{{ item.subtitle }}</div>
      <div class="price">
        <i>{{ item.price | priceParse() }}</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["item", "column"],
  filters: {
    priceParse(price) {
      return `${Number(price).toFixed(2)}元`;
    },
  },
  methods: {
    goodsClick(productId) {
      this.$router.push(`/goodsDetails?productId=${productId}`);
    },
  },
};
</script>

<style scoped lang="scss">
.item {
  cursor: pointer;
  width: 20%;
  background-color: #ededed;
  height: 30rem;
  .inner {
    background-color: #fff;
    border-radius: 1rem;
    transition: margin 0.5s, box-shadow 0.5s;
    box-sizing: border-box;
    padding: 1rem 3rem;
    text-align: center;
    &:hover {
      margin-top: -0.5rem;
      box-shadow: 0 0 20px #d9ecff;
    }
    &:not(:nth-child(5n)) {
      margin-right: 1rem;
    }
    &:not(:nth-child(n + 6)) {
      margin-bottom: 1rem;
    }
    .img {
      width: 100%;
      height: 16rem;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .goodsName {
      font-size: 1.4rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .desc {
      margin: 1rem 0 2rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      text-align: center;
      font-size: 1.2rem;
      color: #666;
    }
    .price {
      color: red;
      font-size: 2rem;
    }
  }
}
</style>
