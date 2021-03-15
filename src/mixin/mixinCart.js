import {
    mapState,
} from "vuex";
export default {
    computed: {
        ...mapState(['login'])
    },
    methods: {
        // 加入购物车
        addCart(productId, count = 1) {
            if (Date.now - this.pre < 200) {
                return;
            }
            if (this.login) {
                this.$http.post("/user/addCart", {
                    uid: JSON.parse(localStorage.getItem("userInfo")).id,
                    productId,
                    count,
                });
            } else {}
            this.pre = Date.now();
        },
        // 修改购物车
        updateCart(productId, count) {
            if (Date.now - this.pre < 200) {
                return;
            }
            if (this.login) {
                this.$http.post("/user/updateCart", {
                    uid: JSON.parse(localStorage.getItem("userInfo")).id,
                    productId,
                    count,
                });
            } else {}
            this.pre = Date.now();
        },
    }
}