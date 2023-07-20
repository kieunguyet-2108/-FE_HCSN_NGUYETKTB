<template>
  <!-- HEADER PAGE  -->
  <div class="header flex row space-between align-items-center">
    <div class="text-bold">Danh sách tài sản</div>
    <div class="header-action flex row align-items-center justify-content-end">
      <div class="text-bold">Sở tài chính</div>
      <div class="number-picker-group">
        <div>Năm</div>
        <div class="text-bold">2021</div>
        <div>
          <div class="ms-icon w-8 h-5 mb-4 ms-icon-arrow-up-bold"></div>
          <div class="ms-icon w-8 h-5 ms-icon-arrow-down-bold"></div>
        </div>
      </div>
      <MISATooltipV1 content="Thông báo">
        <div class="ms-24 header-icon">
          <div class="ms-icon ms-20 ms-icon-bell"></div>
        </div>
      </MISATooltipV1>
      <MISATooltipV1 content="Tính năng">
        <div class="ms-24 header-icon">
          <div class="ms-icon ms-18 ms-icon-four-square"></div>
        </div>
      </MISATooltipV1>
      <MISATooltipV1 content="Trợ giúp">
        <div class="ms-24 header-icon">
          <div class="ms-icon ms-18 ms-icon-ask"></div>
        </div>
      </MISATooltipV1>
      <div
        v-clickOutside="
          () => {
            isShowHeaderMenu = false
          }
        "
      >
        <MISATooltipV1 content="Người dùng">
          <div
            class="header-icon header-icon--user"
            @click="isShowHeaderMenu = !isShowHeaderMenu"
          >
            <div class="ms-icon ms-18 ms-icon-user"></div>
            <div class="ms-icon ms-8 ms-icon-arrow-down-bold"></div>
          </div>
        </MISATooltipV1>
        <div class="header-menu" v-if="isShowHeaderMenu">
          <router-link class="header-menu--item" to="/user/login">{{
            $t('Common.UserInformation')
          }}</router-link>
          <div class="header-menu--item" @click="onChangeLanguage">
            {{ currentLanguage }}
          </div>
          <div class="header-menu--item" @click="logout">
            {{ $t('Common.Logout') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import vClickOutside from 'click-outside-vue3'
import MISATooltipV1 from '@/components/base/MISATooltipV1.vue'
export default {
  name: 'TheHeader',
  components: {
    MISATooltipV1,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      isShowHeaderMenu: false,
      language: localStorage.getItem('qlts-language'),
    }
  },
  computed: {
    currentLanguage() {
      return this.language === 'vi'
        ? 'Chuyển sang tiếng Anh'
        : 'Switch to Vietnamese'
    },
  },
  methods: {
    /**
     * @description: Hàm thay đổi ngôn ngữ
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 18/07/2023
     */
    onChangeLanguage() {
      this.isShowHeaderMenu = false
      this.isShowPopupChangeLanguage = true
      let language = localStorage.getItem('qlts-language')
      if (language === 'vi') {
        this.$i18n.locale = 'en'
        localStorage.setItem('qlts-language', 'en')
        this.language = 'en'
      } else {
        this.$i18n.locale = 'vi'
        localStorage.setItem('qlts-language', 'vi')
        this.language = 'vi'
      }
    },
    /**
     * @description: Hàm đăng xuất
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 18/07/2023
     */
    async logout() {
      await this.$store.dispatch('removeToken')
      await this.$router.push('/user/login')
    },
  },
}
</script>

<style scoped>
.header-menu {
  position: fixed;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  flex-direction: column;
  align-items: flex-start;
  z-index: 999;
  right: 23px;
  top: 40px;
  display: flex;
  flex-direction: column;
}
.header-menu .header-menu--item {
  cursor: pointer;
  width: 100%;
  padding: 10px 15px;
  color: black;
}
.header-menu .header-menu--item:hover {
  background-color: #d1edf4;
}
@import url(@/css/layouts/header/header.css);
</style>