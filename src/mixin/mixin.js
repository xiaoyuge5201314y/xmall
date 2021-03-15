import {
    mapState,
    mapMutations
} from "vuex";
export default {
    computed: {
        ...mapState(['login'])
    },
    methods: {
        ...mapMutations(['LOGIN', 'CARTLIST']),
        // 删除商品
        async delGoods(productId) {
            // 已登录
            if (this.login) {
                console.log(1)
                const uid = JSON.parse(localStorage.getItem("userInfo")).id;
                this.$http.get(
                    `/user/delGoods?uid=${uid}&productId=${productId}`
                );
                this.getCartList();
            } else {}
        }, // 获取购物车数据并存储在本地
        async getCartList() {
            // 提交登录状态
            this.LOGIN();
            // 已登录
            if (this.login) {
                let cartListData = localStorage.getItem("carList");
                // // 判断本地是否保存了购物车数据
                if (!cartListData) {
                    // 获取用户id发送请求
                    const id = JSON.parse(localStorage.getItem("userInfo")).id;
                    const res = await this.$http.get("/user/userCart?id=" + id);
                    cartListData = res.data;
                }
                // 将购物车数据存储在本地
                localStorage.setItem("cartList", JSON.stringify(cartListData));
                // 将购物车数据提交到vuex
                this.CARTLIST();
                // 未登录 不做操作
            } else {}
        },
    }
}