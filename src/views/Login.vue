<template>
  <div class="Login">
    <div action="" class="login-form">
      <h1 class="title">login</h1>
      <div class="txtb">
        <input
          type="text"
          class="focus"
          v-model="form.username"
          @input="inputHandle"
        />
        <span data-placeholder="username"></span>
      </div>
      <div class="txtb">
        <input
          type="password"
          class="focus"
          @input="inputHandle"
          v-model="form.password"
        />
        <span data-placeholder="password"></span>
      </div>
      <input type="button" value="login" @click="login" class="submit" />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      form: {
        username: "test",
        password: "test",
      },
    };
  },
  methods: {
    inputHandle(ev) {
      if (ev.path && ev.path[0] && ev.path[0].value) {
        ev.path[0].className += " focus";
      } else {
        ev.path[0].className = ev.path[0].className
          .split(" ")
          .filter((ele) => ele != "focus")
          .join(" ")
          .trim();
      }
    },
    login() {
      this.$http
        .post("/login", {
          username: this.form.username,
          password: this.form.password,
        })
        .then((res) => {
          // 登录成功
          if (res.code == 200) {
            // 将用户信息存储在本地
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            // 提交登录状态在vuex
            this.$store.commit("LOGIN");
            // 将用户信息存储在vuex
            this.$store.commit("USERINFO", res.data);
            // 跳转到之前的页面或首页
            let path = this.$route.query.redirect;
            path = path ? path : "/";
            this.$router.push({
              path,
            });
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
.Login {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background-image: radial-gradient(
    circle farthest-side,
    #2ecc71,
    #3498db,
    #9b59b6
  );
  .login-form {
    min-width: 32rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #e74c3c;
    padding: 80px 40px;
    border-radius: 10px;
    background-color: #fff;

    .title {
      margin: 0 0 80px;
      text-align: center;
    }

    .txtb {
      position: relative;
      margin: 30px 0;

      input {
        width: 100%;
        height: 40px;
        background-color: transparent;
        border: none;
        border-bottom: 2px solid #ccc;
        outline: none;
        text-indent: 10px;
        cursor: pointer;
        color: #e74c3c;
        font-size: 20px;
      }

      span {
        width: 100%;
        height: 2px;
        background-image: linear-gradient(120deg, #8e44ad, #f1c40f);
        background-position: 200%;
        &::before {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          content: attr(data-placeholder);
          text-indent: 12px;
          font-weight: 700;
          color: transparent;
          -webkit-text-stroke: 1px #2ecc71;
          z-index: -1;
          font-size: 20px;
          transition: 0.5s;
        }
        &::after {
          position: absolute;
          content: "";
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background-image: linear-gradient(120deg, #8e44ad, #f1c40f);
        }
      }
    }

    .focus + span::before {
      top: -5px;
    }

    .focus + span::after {
      width: 100%;
    }
  }

  .submit {
    width: 100%;
    height: 40px;
    border: none;
    background-image: linear-gradient(120deg, #8e44ad, #f1c40f, #3366ee);
    background-size: 200%;
    color: #fff;
    font-size: 22px;
    letter-spacing: 3px;
    cursor: pointer;
    border-radius: 5px;
    outline: none;
    margin-bottom: 20px;
    transition: 0.5s;
    &:hover {
      background-position: right;
    }
  }
}
</style>
