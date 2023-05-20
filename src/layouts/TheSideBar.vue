<template>
  <div class="sidebar" ref="sidebar">
    <div class="logo">
      <div class="ms-icon ms-36 ms-icon-logo" id="logo_image"></div>
      <div class="img__logo--text">MISA QLTS</div>
    </div>
    <div class="menu-bar">
      <ul class="menu-list">
        <MISATooltipV1 content="Tổng quan">
          <router-link class="menu-item tooltip" to="/asset1">
            <div class="ms-24">
              <div class="ms-icon ms-22 ms-icon-computer"></div>
            </div>
            <div class="menu-item__text">Tổng quan</div>
          </router-link>
        </MISATooltipV1>
        <MISATooltipV1 content="Tài sản">
          <router-link class="menu-item tooltip" to="/asset">
            <div class="ms-24">
              <div class="ms-icon ms-24 ms-icon-car"></div>
            </div>
            <div class="menu-item__text">Tài sản</div>
            <div class="ms-icon ms-24 ms-icon-arrow-down"></div>
          </router-link>
        </MISATooltipV1>
        <MISATooltipV1 content="Tài sản HT-ĐB">
          <router-link class="menu-item tooltip" to="/asset2">
            <div class="ms-24">
              <div class="ms-icon ms-24 ms-icon-road"></div>
            </div>
            <div class="menu-item__text">Tài sản HT-ĐB</div>
            <div class="ms-icon ms-24 ms-icon-arrow-down"></div>
          </router-link>
        </MISATooltipV1>
        <MISATooltipV1 content="Công cụ dụng cụ">
          <router-link class="menu-item tooltip" to="/asset3">
            <div class="ms-24">
              <div class="ms-icon ms-22 ms-icon-tool"></div>
            </div>
            <div class="menu-item__text">Công cụ dụng cụ</div>
            <div class="ms-icon ms-24 ms-icon-arrow-down"></div>
          </router-link>
        </MISATooltipV1>
        <MISATooltipV1 content="Danh mục">
          <router-link class="menu-item tooltip" to="/asset4">
            <div class="ms-24">
              <div class="ms-icon ms-22 ms-icon-category"></div>
            </div>
            <div class="menu-item__text">Danh mục</div>
          </router-link>
        </MISATooltipV1>
        <MISATooltipV1 content="Tra cứu">
          <router-link class="menu-item tooltip" to="/asset5">
            <div class="ms-24">
              <div class="ms-icon ms-22 ms-icon-search-gray"></div>
            </div>
            <div class="menu-item__text">Tra cứu</div>
            <div class="ms-icon ms-24 ms-icon-arrow-down"></div>
          </router-link>
        </MISATooltipV1>
        <MISATooltipV1 content="Báo cáo">
          <router-link class="menu-item tooltip" to="/asset6">
            <div class="ms-24">
              <div class="ms-icon ms-24 ms-icon-report"></div>
            </div>
            <div class="menu-item__text">Báo cáo</div>
            <div class="ms-icon ms-24 ms-icon-arrow-down"></div>
          </router-link>
        </MISATooltipV1>
      </ul>
    </div>
    <div class="bottom-bar">
      <div
        class="ms-icon ms-24 ms-icon-arrow-left-border"
        @click="toggleSideBar"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheSideBar",
  data() {
    return {
      isHaveTooltip: false,
    };
  },
  methods: {
    toggleSideBar() {
      this.$refs.sidebar.classList.toggle("active");
      this.isHaveTooltip = !this.isHaveTooltip;
    },
  },
};
</script>

<style scoped>
@import url(@/css/layouts/sidebar/sidebar.css);
</style>