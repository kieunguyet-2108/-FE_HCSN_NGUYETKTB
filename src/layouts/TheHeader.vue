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
      <div class="ms-24 header-icon tooltip">
        <div class="ms-icon ms-20 ms-icon-bell"></div>
        <MISATooltip text="Thông báo" class="tooltip-element" style="left:-60px;margin-top: 60px;width: 100px;" ></MISATooltip>
      </div>
      <div class="ms-24 header-icon">
        <div class="ms-icon ms-18 ms-icon-four-square"></div>
      </div>
      <div class="ms-24 header-icon">
        <div class="ms-icon ms-18 ms-icon-ask"></div>
      </div>
      <div class="ms-24 header-icon">
        <div class="ms-icon ms-18 ms-icon-user"></div>
      </div>
      <div class="ms-24 header-icon">
        <div class="ms-icon ms-8 ms-icon-arrow-down-bold"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MISATooltip from '@/components/base/MISATooltip.vue';
export default {
  name: "TheHeader",
    components: {
      MISATooltip,
    },
};
</script>

<style scoped>
@import url(@/css/layouts/header/header.css);
</style>