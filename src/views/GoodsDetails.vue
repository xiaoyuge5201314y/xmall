<template>
  <div class="">
    <!-- 导航栏 -->
    <my-header></my-header>
    <!-- 商品信息 -->
    <main class="main w" style="margin-top: 10rem">
      <div class="smallPics">
        <div
          :class="['pic', index == i ? 'active' : '']"
          v-for="(item, i) in imagesmall"
          :key="i"
          @click="picClick(i, item)"
        >
          <img :src="item" alt="" />
        </div>
      </div>
      <div class="bigPic">
        <img :src="imagebig" alt="" />
      </div>
      <div class="goodsInfo">
        <div class="goodsDesc">
          <div class="title">{{ name }}</div>
          <div class="subTitle">{{ subTitle }}</div>
          <div class="price"><span>￥</span>{{ price | priceParse }}</div>
        </div>
        <div class="goodsCount">
          <el-input-number v-model="count" :step="1" :min="1"></el-input-number>
        </div>
        <div class="btns">
          <el-button type="primary" @click="addCart(productId, count)"
            >加入购物车</el-button
          >
          <el-button type="success">现在购买</el-button>
        </div>
      </div>
    </main>
    <!-- 详情 -->
    <div class="w detail">
      <div class="title">产品信息</div>
      <div class="content" v-html="detail"></div>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import { mapState } from "vuex";
import mixinCart from '@/mixin/mixinCart'
export default {
  name: "",
  data() {
    return {
      index: 0,
      count: 1,
      goodsDetails: {},
      productId: 0,
      imagesmall: [],
      imagebig: "",
      detail: "",
      name: "",
      price: "",
      subTitle: "",
      pre: Date.now(),
    };
  },
  mixins:[mixinCart],
  computed: {
    ...mapState(["login", "userInfo"]),
  },
  filters: {
    priceParse(price) {
      return `${Number(price).toFixed(2)}`;
    },
  },
  components: {
    MyHeader,
  },
  methods: {
    //  切换图片
    picClick(i, item) {
      this.index = i;
      this.imagebig = item;
    },
   
  },
  created() {
    this.productId = this.$route.query.productId;
    this.$http
      .get("/goods/goodsDetails?productId=" + this.productId)
      .then((res) => {
        this.goodsDetails = res.data;
        this.imagebig = this.goodsDetails.imagebig;
        this.detail = this.goodsDetails.detail;
        this.price = this.goodsDetails.price;
        this.subTitle = this.goodsDetails.subtitle;
        this.name = this.goodsDetails.name;
        this.imagesmall = this.goodsDetails.imagesmall.split(",");
      });
  },
};
</script>

<style scoped lang="scss">
.main {
  padding: 6rem;
  box-sizing: border-box;
  height: 56rem;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .smallPics {
    width: 8rem;
    .pic {
      margin: 1rem 0;
      width: 7.5rem;
      height: 7.5rem;
      border: 1px solid #eee;
      cursor: pointer;
      box-sizing: border-box;
      &.active {
        img {
          box-shadow: 0 0 0 0.3rem #ccc;
        }
      }
      img {
        border-radius: 0.2rem;
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .bigPic {
    width: 42rem;
    img {
      display: block;
      width: 100%;
    }
  }
  .goodsInfo {
    width: 45rem;
    .goodsDesc {
      position: relative;
      width: 100%;
      .title {
        font-size: 2.4rem;
      }
      .subTitle {
        margin: 2rem 0 1.5rem;
        font-size: 1.4rem;
        color: #ccc;
      }
      .price {
        position: absolute;
        color: #f4364c;
        bottom: 0;
        right: 0;
        font-size: 2.2rem;
        font-weight: 700;
        span {
          font-size: 1.6rem;
        }
      }
    }
    .goodsCount {
      height: 10rem;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
    }
    .btns {
      margin-top: 4rem;
    }
  }
}
.detail {
  margin-top: 2rem;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  .title {
    height: 6rem;
    font-size: 2rem;
    font-weight: 100;
    line-height: 6rem;
    background: linear-gradient(#fafafa, #ececec);
    border-bottom: 1px solid #ccc;
    text-indent: 2rem;
  }
}
</style>
