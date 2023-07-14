<template>
  <div class="sidebar" ref="sidebar">
    <div class="logo">
      <div class="ms-icon ms-36 ms-icon-logo" id="logo_image"></div>
      <div class="img__logo--text">MISA QLTS</div>
    </div>
    <div class="menu-bar">
      <ul class="menu-list">
        <MISATooltipV1 content="Tổng quan">
          <router-link class="menu-item tooltip" to="/overview">
            <div class="ms-24">
              <div class="ms-icon ms-22 ms-icon-computer"></div>
            </div>
            <div class="menu-item__text">{{ $t("SideBar.Overview") }}</div>
          </router-link>
        </MISATooltipV1>
        <div class="menu-item__content">
          <MISATooltipV1 content="Tài sản">
            <router-link class="menu-item tooltip" to="/asset">
              <div class="ms-24">
                <div class="ms-icon ms-24 ms-icon-car"></div>
              </div>
              <div class="menu-item__text">{{ $t("SideBar.Asset") }}</div>
              <div class="ms-icon ms-24 ms-icon-arrow-down" @click="isShowAssetMenu = !isShowAssetMenu"></div>
            </router-link>
          </MISATooltipV1>
          <div class="menu-item--list" v-if="isShowAssetMenu">
            <router-link to="/asset/increase-asset">{{ $t("SideBar.Increase") }}</router-link>
            <router-link to="/asset/change-information">{{ $t("SideBar.ChangeInformation") }}</router-link>
            <router-link to="/asset/change-information">{{ $t("SideBar.Revaluation") }}</router-link>
            <router-link to="/asset/change-information">{{ $t("SideBar.Depreciation") }}</router-link>
            <router-link to="/asset/change-information">{{ $t("SideBar.AssetTransfer") }}</router-link>
            <router-link to="/asset/change-information">{{ $t("SideBar.Decrease") }}</router-link>
            <router-link to="/asset/change-information">{{ $t("SideBar.Stocktaking") }}</router-link>
            <router-link to="/asset/change-information">{{ $t("SideBar.Others") }}</router-link>
          </div>
        </div>

        <MISATooltipV1 content="Tài sản Hệ Thống-Đường Bộ">
          <router-link class="menu-item tooltip" to="/asset2">
            <div class="ms-24">
              <div class="ms-icon ms-24 ms-icon-road"></div>
            </div>
            <div class="menu-item__text">{{ $t("SideBar.FixedAssets") }}</div>
            <div class="ms-icon ms-24 ms-icon-arrow-down"></div>
          </router-link>
        </MISATooltipV1>
        <MISATooltipV1 content="Công cụ dụng cụ">
          <router-link class="menu-item tooltip" to="/tool">
            <div class="ms-24">
              <div class="ms-icon ms-22 ms-icon-tool"></div>
            </div>
            <div class="menu-item__text"> {{ $t("SideBar.ToolsAndEquipment") }}</div>
            <div class="ms-icon ms-24 ms-icon-arrow-down"></div>
          </router-link>
        </MISATooltipV1>
        <MISATooltipV1 content="Danh mục">
          <router-link class="menu-item tooltip" to="/category">
            <div class="ms-24">
              <div class="ms-icon ms-22 ms-icon-category"></div>
            </div>
            <div class="menu-item__text"> {{ $t("SideBar.Category") }}</div>
          </router-link>
        </MISATooltipV1>
        <MISATooltipV1 content="Tra cứu">
          <router-link class="menu-item tooltip" to="/search">
            <div class="ms-24">
              <div class="ms-icon ms-22 ms-icon-search-gray"></div>
            </div>
            <div class="menu-item__text"> {{ $t("SideBar.Search") }}</div>
            <div class="ms-icon ms-24 ms-icon-arrow-down"></div>
          </router-link>
        </MISATooltipV1>
        <MISATooltipV1 content="Báo cáo">
          <router-link class="menu-item tooltip" to="/report">
            <div class="ms-24">
              <div class="ms-icon ms-24 ms-icon-report"></div>
            </div>
            <div class="menu-item__text"> {{ $t("SideBar.Report") }}</div>
            <div class="ms-icon ms-24 ms-icon-arrow-down"></div>
          </router-link>
        </MISATooltipV1>
      </ul>
    </div>
    <div class="bottom-bar">
      <MISATooltipV1 :content="iconToogleMessage">
        <div
          class="ms-icon ms-24 ms-icon-arrow-left-border"
          @click="toggleSideBar"
        ></div>
      </MISATooltipV1>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheSideBar",
  data() {
    return {
      iconToogleMessage: "Thu gọn",
      isShowAssetMenu: false,
    };
  },
  methods: {
    toggleSideBar() {
      this.$refs.sidebar.classList.toggle("active");
      if (this.$refs.sidebar.classList.contains("active")) {
        this.isShowAssetMenu = false;
        this.iconToogleMessage = "Mở rộng";
      } else {
        this.iconToogleMessage = "Thu gọn";
      }
    },
  },
};
</script>

<style scoped>
.menu-item--list {
  background-color: #33455b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 4px;
}
.menu-item--list a {
  padding-left: 44px;
  color: #aeacac;
  font-size: 14px;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 4px;
}
.menu-item--list a:hover,
.menu-item--list .router-link-active{
  background-color: #48586c;
  color: white;
}

@import url(@/css/layouts/sidebar/sidebar.css);
</style>