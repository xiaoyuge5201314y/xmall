<template>
  <div class="order">
    <my-header></my-header>
    <div class="table w" style="margin-top: 10rem">
      <div class="title">购物清单</div>
      <el-table :data="cartList" stripe style="width: 100%">
        <el-table-column label="商品图片" prop="imagebig" width="100">
          <template slot-scope="scope">
            <img
              :src="scope.row.imagebig"
              alt=""
              style="width: 50px; height: 50px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品信息"> </el-table-column>
        <el-table-column prop="price" label="价格" width="100">
        </el-table-column>
        <el-table-column prop="count" label="购买数量"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >修改数量</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="delCart(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="result">
        <p class="sum">
          应付总额：<span>￥{{ sumPrice }}</span>
        </p>
        <el-button type="primary" class="submit" @click="orderSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import { mapState } from "vuex";
import mixin from "@/mixin/mixin.js";
import mixinCart from "@/mixin/mixinCart.js";
export default {
  mixins: [mixin, mixinCart],
  computed: {
    ...mapState(["cartList"]),
    sumPrice() {
      let price = 0;
      this.cartList.forEach((element) => {
        price += Number(element.price) * Number(element.count);
      });
      return price;
    },
  },
  components: {
    MyHeader,
  },
  methods: {
    delCart(index, item) {
      this.delGoods(item.goodsid);
    },
    handleEdit(index, item) {
      this.$prompt("请输入购买数量", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[0-9]+$/,
        inputErrorMessage: "只能输入数字",
      })
        .then(({ value }) => {
          value = Number(value);
          this.updateCart(item.goodsid, value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    // 提交订单
    orderSubmit(){
        this.$message({
            type:'success',
            message:'购买成功'
        });
    }
  },
};
</script>

<style scoped lang="scss">
.table {
  border: 1px solid #ccc;
  border-radius: 1rem;
  overflow: hidden;
}
.title {
  height: 6rem;
  background-color: #f3f3f3;
  line-height: 6rem;
  color: #000;
  border-bottom: 1px solid #ccc;
  font-size: 2rem;
  font-weight: 400;
  text-indent: 2rem;
}
.result {
  height: 10rem;
  background-color: #f3f3f3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.4rem;
  .sum {
    margin-right: 2rem;
    span {
      color: #d44d44;
      font-size: 2.4rem;
      font-weight: 700;
      letter-spacing: 1px;
    }
  }
  .submit {
    margin: 0 2rem;
  }
}
</style>
