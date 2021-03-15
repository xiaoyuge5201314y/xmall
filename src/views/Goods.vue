<template>
  <div class="goods">
    <my-header></my-header>
    <!-- 排序方式 -->
    <div class="sort w" style="margin-top: 7rem">
      <el-link
        class="link"
        @click="sort(1)"
        :underline="false"
        :type="index == 1 ? 'primary' : ''"
        >综合排序</el-link
      >
      <el-link
        class="link"
        @click="sort(2)"
        :underline="false"
        :type="index == 2 ? 'primary' : ''"
        >价格从低到高</el-link
      >
      <el-link
        class="link"
        @click="sort(3)"
        :underline="false"
        :type="index == 3 ? 'primary' : ''"
        >价格从高到低</el-link
      >
      <div class="price">
        <el-input
          class="input"
          placeholder="价格"
          size="mini"
          type="text"
          v-model="minPrice"
        />
        <el-input
          class="input"
          placeholder="价格"
          size="mini"
          type="text"
          v-model="maxPrice"
        />
        <el-button
          @click="getGoods(minPrice, maxPrice)"
          class="btn"
          size="mini"
          type="primary"
          >确定</el-button
        >
      </div>
    </div>
    <!-- 商品内容 -->
    <div class="goodsWrap w">
      <goods-card
        v-for="(item, i) in goodsList"
        :key="i"
        :item="item"
        :column="4"
      ></goods-card>
    </div>
    <div class="pagination w">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import GoodsCard from "@/components/GoodsCard.vue";
export default {
  data() {
    return {
      index: 2,
      minPrice: "",
      maxPrice: "",
      goodsList: [],
      total: 0,
      currentPage: 1,
      pageSize: 8,
      pageSizes: [8, 12, 20, 40],
    };
  },
  components: {
    MyHeader,
    GoodsCard,
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getGoods();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGoods();
    },
    sort(index) {
      this.index = index;
      this.getGoods();
    },
    async getGoods(minPrice = "", maxPrice = "") {
      let url = `/goods/allGoods?min=${minPrice}&max=${maxPrice}&method=${this.index}&page=${this.currentPage}&pageSize=${this.pageSize}`;
      const res = await this.$http.get(url);
      this.goodsList = res.data;
      this.total = res.total;
    },
  },
  created() {
    this.getGoods();
  },
};
</script>

<style scoped lang="scss">
.sort {
  height: 6rem;
  line-height: 6rem;
  font-size: 1.4rem;
  > * {
    float: left;
    margin: 0 1rem;
  }
  .price {
    .input {
      padding: 0;
      margin: 0 1rem;
      width: 8rem;
      text-align: center;
    }
    .btn {
      margin: 0 1rem;
      width: 6rem;
    }
  }
}
.goodsWrap {
  display: flex;
  flex-wrap: wrap;
}
.pagination{
    text-align: right;
    // margin: 4rem 0 10rem;
}
</style>
