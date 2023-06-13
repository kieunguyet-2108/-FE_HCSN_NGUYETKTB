<template>
  <!-- HEADER PAGE  -->
  <div class="header flex row space-between align-items-center">
    <div class="text-bold">Danh sách tài sản</div>
    <div class="header-action flex row align-items-center justify-content-end">
      <div>Sở tài chính</div>
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
      <MISATooltipV1 content="Người dùng">
        <div class="ms-24 header-icon">
          <div class="ms-icon ms-18 ms-icon-user"></div>
        </div>
      </MISATooltipV1>
      <div class="ms-24 header-icon">
        <div class="ms-icon ms-8 ms-icon-arrow-down-bold"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MISATooltipV1 from "@/components/base/MISATooltipV1.vue";
export default {
  name: "TheHeader",
  components: {
    MISATooltipV1,
  },
};
</script>

<style scoped>
/* .header-item {
  display: flex;
  align-items: center;
  margin-left: 14px;
} */
@import url(@/css/layouts/header/header.css);
</style>