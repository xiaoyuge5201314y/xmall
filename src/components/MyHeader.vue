<template>
  <div class="header">
    <div class="wrap w">
      <!-- 导航 -->
      <div class="navList">
        <router-link
          class="link"
          :to="item.path"
          v-for="(item, i) in navList"
          :key="i"
          ><span class="icon"></span><span>{{ item.name }} </span></router-link
        >
      </div>
      <!-- 输入框 -->
      <div class="search">
        <el-input
          class="el-search"
          size="small"
          placeholder="请输入内容"
          v-model="input"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <!-- 头像 登录/注册 -->
      <div class="user clear-fix">
        <div class="avaitor">
          <el-avatar icon="el-icon-user-solid"></el-avatar>
        </div>
        <!-- 个人信息 -->
        <div class="userInfo" v-if="login">
          <div class="item">
            <a class="link" href="javascript:;">个人主页</a>
          </div>
          <div class="item">
            <a class="link" href="javascript:;">修改地址</a>
          </div>
          <div class="item">
            <a class="link" href="javascript:;">我的订单</a>
          </div>
          <div class="item">
            <a class="link" @click="logout" href="javascript:;">退出登录</a>
          </div>
        </div>
        <router-link v-if="!login" class="link login" to="/login"
          >登录</router-link
        >
        <router-link v-if="!login" class="link register" to="/register"
          >注册</router-link
        >
      </div>
      <!-- 购物车 -->
      <div class="cart">
        <div class="icon el-icon-shopping-cart-full"></div>
        <div class="cartInfo">
          <div class="cartList">
            <div class="item" v-for="(item, i) in cartList" :key="i">
              <a
                href="javascript:;"
                @click="delGoods(item.goodsid)"
                class="delGoods"
              >
                x
              </a>
              <div class="img">
                <img :src="item.imagebig" alt="" />
              </div>
              <div class="goodsInfo">
                <div class="title">{{ item.name }}</div>
                <div class="price">
                  ￥{{ item.price }} <i>x{{ item.count }}</i>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="count">共{{ goodsCount }}件商品</div>
              <div class="sum">
                合计:<i>￥{{ sumPrice }}</i>
              </div>
              <el-button class="cartBtn" @click="()=>$router.push('/order')">去购物车</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import mixin from "@/mixin/mixin.js";
export default {
  data() {
    return {
      // 搜索框
      input: "",
      // 导航栏
      navList: [
        {
          name: "首页",
          path: "/home",
        },
        {
          name: "全部商品",
          path: "/goods",
        },
        {
          name: "个人中心",
          path: "/user",
        },
        {
          name: "购物车",
          path: "/order",
        },
        {
          name: "下载APP",
          path: "/",
        },
      ],
    };
  },
  mixins: [mixin],
  computed: {
    // 登录状态 购物车数据
    ...mapState(["login", "cartList"]),
    goodsCount() {
      return this.cartList.length;
    },
    sumPrice() {
      let price = 0;
      this.cartList.forEach((ele) => {
        price += ele.price * ele.count;
      });
      return price;
    },
  },
  methods: {
    ...mapMutations(["LOGIN", "CARTLIST"]),
    // 退出登录
    logout() {
      // 清空localstorage
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cartList");
      // 提交登录状态到vuex
      this.LOGIN();
      // 清空购物车
      this.CARTLIST();
    },
  },
  created() {
    this.getCartList();
  },
};
</script>

<style scoped lang="scss">
$height: 6rem;
.header {
  position: fixed;
  z-index: 1111;
  top: 0;
  width: 100%;
  height: 6rem;
  background-color: #e6a23c;
  .wrap {
    height: $height;
    line-height: $height;
    font-size: 1.4rem;
    padding: 0 2rem;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .navList {
      height: 100%;
      .link {
        margin: 0 0.5rem;
      }
    }
    .search {
      @media screen and (max-width: 768px) {
        display: none;
      }
      flex-grow: 1;
      text-align: center;
      .el-search {
        max-width: 45rem;
      }
    }
    .user {
      position: relative;
      &:hover {
        .userInfo {
          height: 20rem;
        }
      }
      .avaitor {
        margin-right: 2rem;
        float: left;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .userInfo {
        overflow: hidden;
        width: 15rem;
        height: 0;
        background-color: #fff;
        position: absolute;
        top: 6rem;
        right: 50%;
        transform: translateX(50%);
        transition: 0.2s;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-bottom-right-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        .item {
          width: 100%;
          height: 5rem;
          text-align: center;
          border-bottom: 1px solid #eee;
          &:hover {
            background: rgba(0, 0, 0, 0.1);
            .link {
              color: red;
            }
          }
          .link {
            display: block;
            width: 100%;
            height: 100%;
            line-height: 5rem;
            color: #666;
          }
        }
      }
      .login,
      .register {
        margin: 0 1rem;
      }
    }
    .cart {
      width: 3rem;
      height: 100%;
      position: relative;
      cursor: pointer;
      color: #fff;
      .icon {
        font-size: 2rem;
        line-height: 6rem;
      }

      .cartInfo {
        display: none;
        position: absolute;
        top: 6rem;
        right: 0rem;
        width: 36rem;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        transition: height 0.5s;
        .item {
          height: 12rem;
          padding: 2rem;
          border-bottom: 1px solid #eee;
          display: flex;
          position: relative;
          .delGoods {
            display: block;
            color: #ccc;
            position: absolute;
            right: 5rem;
            top: 50%;
            width: 2rem;
            height: 2rem;
            text-align: center;
            line-height: 2rem;
            &:hover {
              color: red;
            }
            // transform: translateY(-50%);
          }
          .img {
            width: 8rem;
            height: 8rem;
            display: block;
            border-radius: 0.5rem;
            border: 1px solid #ccc;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .goodsInfo {
            width: 0;
            flex-grow: 1;
            margin-left: 2rem;
            .title {
              font-size: 1.4rem;
              line-height: 2rem;
              color: #000;
              margin: 1rem 0;
            }
            .price {
              font-size: 1.4rem;
              line-height: 2rem;
              color: red;
              i {
                margin-left: 1rem;
                font-size: 1.2rem;
                color: #666;
              }
            }
          }
        }
        .bottom {
          height: 8rem;
          padding: 2rem;
          position: relative;
          line-height: 2rem;
          .count {
            font-size: 1.2rem;
            color: #ccc;
          }
          .sum {
            color: #000;
            font-size: 1.6rem;
            i {
              margin-left: 1rem;
              font-weight: 700;
              color: red;
            }
          }
        }
        .cartBtn {
          position: absolute;
          top: 50%;
          right: 2rem;
          transform: translateY(-50%);
          background-color: #5c84e3;
          color: #fff;
        }
      }
      &:hover .cartInfo {
        display: block;
      }
    }
  }
}
.link {
  color: #fff;
  &:hover {
    color: #409eff;
  }
}
</style>
