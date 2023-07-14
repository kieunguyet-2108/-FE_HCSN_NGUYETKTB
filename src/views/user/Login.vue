<template>
  <div class="login">
    <div
      class="login__message"
      :style="{
        visibility: loginMessage !== '' ? 'visible' : 'hidden',
      }"
    >
      {{ loginMessage }}
    </div>
    <div class="login__content">
      <div class="login__content--left">
        <img
          src="@/assets/Image_Login.jpg"
          alt=""
          style="border-radius: 8px 0px 0px 8px"
        />
      </div>
      <div class="login__content--right">
        <div class="login__header">
          <div class="login__header--image MISA_logo"></div>
          <div class="login__header--title">
            Đăng nhập để làm việc với
            <b>MISA QLTS</b>
          </div>
        </div>
        <div class="login__form">
          <div class="login__form--username">
            <MISAInput
              type="text"
              placeholder="Username, email hoặc số điện thoại"
              className="input__field"
              :maxLength="100"
              :minLength="1"
              :isValidate="false"
              v-model="loginInformation.userName"
            ></MISAInput>
          </div>
          <div class="login__form--password">
            <MISAInput
              ref="inputPassword"
              :type="passwordInformation.passwordType"
              placeholder="Mật khẩu"
              className="input__field"
              :maxLength="100"
              :minLength="1"
              :isValidate="false"
              :icon="passwordInformation.passwordIcon"
              v-model="loginInformation.password"
              @clickInputIcon="clickIconPassword"
            ></MISAInput>
          </div>
          <div class="login__form--button">
            <MISAButton
              class="button-login"
              text="Đăng nhập"
              @click="handeLogin"
            ></MISAButton>
          </div>
          <div class="forgot-password">Quên mật khẩu?</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MISAInput from "@/components/base/MISAInput.vue";
import MISAButton from "@/components/base/MISAButton.vue";
/* eslint-disable */
export default {
  name: "Login",
  components: {
    MISAInput,
    MISAButton,
  },
  data() {
    return {
      passwordInformation: {
        passwordType: "password",
        passwordIcon: "ms-icon-3 ms-icon-eye-close",
      },
      loginInformation: {
        userName: "",
        password: "",
      },
      loginMessage: "",
    };
  },
  methods: {
    /**
     * @description: Thực hiện gọi api login và xử lý kết quả trả về
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 22/06/2023
     */
    async handeLogin() {
      const me = this;
      if(me.loginInformation.userName == "" || me.loginInformation.password == "") {
        me.loginMessage = "Vui lòng nhập đầy đủ thông tin đăng nhập";
        return;
      }
      try {
        const result = await me.$msApi.account.login(
          me.loginInformation.userName,
          me.loginInformation.password
        );
        if (result.status == me.$msEnum.MS_CODE.SUCCESS) {
          await this.$store.dispatch("setToken", result.data.data);
          await me.$router.push("/asset");
        } else {
          me.loginMessage = "Tên đăng nhập hoặc mật khẩu không đúng";
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/06/2023
     */
    clickIconPassword() {
      const me = this;
      if (me.passwordInformation.passwordType === "password") {
        me.passwordInformation.passwordType = "text";
        me.passwordInformation.passwordIcon = "ms-icon ms-icon-eye-open";
      } else {
        me.passwordInformation.passwordType = "password";
        me.passwordInformation.passwordIcon = "ms-icon-3 ms-icon-eye-close";
      }
    },
  },
};
</script>

<style>
@font-face {
  font-family: MISA Font;
  src: url(@/assets/font/Roboto/Roboto-Regular.ttf);
}
.MISA_logo {
  background: url("@/assets/MS_logo.svg") no-repeat no-repeat -3px 0;
  width: 114px;
  height: 46px;
}
.login {
  font-family: MISA Font;
  background-image: url("@/assets/MS_Background.jpg");
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  z-index: 9999;
  gap: 20px;
}
.login .login__message {
  padding: 6px 20px;
  position: fixed;
  background-color: #f65335;
  border-radius: 4px;
  color: #fff;
  visibility: hidden;
  min-width: 250px;
  text-align: center;
  top: 50px;
}
.login__header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin-bottom: 30px;
}
.login__header .login__header--title {
  font-size: 15px;
}
.login__header .login__header--title b {
  font-weight: 700;
}
.login__content {
  display: flex;
  align-items: center;
  background-color: #fff;
  width: 770px;
  height: 560px;
  border-radius: 8px;
}
.login__form .input__field::placeholder {
  font-style: normal;
  font-size: 14px;
}
.login__form .input__field {
  width: 100%;
  padding: 0px 20px;
  height: 42px;
  max-height: 42px;
  background-color: rgb(232, 240, 254);
}
.login__form .input-group__content {
  margin-top: 16px;
  border: 1px solid #dadce0;
}
.login__form .input-group__content .input-group__icon {
  height: 42px;
  width: 42px;
  background-color: rgb(232, 240, 254);
}
.login__form--password .input-group__content {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.login__content--right {
  flex: 1;
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.login__form--button {
  margin-top: 16px;
}
.button-login {
  width: 100%;
  height: 44px;
  border-radius: 4px;
  font-size: 16px !important;
  outline: none;
  border: none;
  background-color: #1a73e8;
  color: #fff;
  cursor: pointer;
}
.button-login > div:first-child {
  font-size: 16px;
}
.forgot-password {
  margin-top: 16px;
  text-align: center;
  color: #1a73e8;
}
</style>