<template>
  <!-- POPUP MESSAGE ( SAME TOAST MESSAGE) -->
  <div class="popup popup-success" id="popup">
    <div class="popup-content flex row">
      <div class="popup-icon mr-20">
        <div class="ms-32">
          <div class="ms-icon-2 ms-32 ms-icon-check-green"
          v-if="popupMode == this.$msEnum.MS_POPUP_MODE.Success"
          ></div>
          <div class="ms-icon-2 ms-32 ms-icon-warning-popup"
          v-if="popupMode == this.$msEnum.MS_POPUP_MODE.Warning"
          ></div>
          <div class="ms-icon-2 ms-32 ms-icon-error-popup"
          v-if="popupMode == this.$msEnum.MS_POPUP_MODE.Error"
          ></div>
        </div>
      </div>
      <div
        class="popup-main flex row justify-content-center align-items-center"
      >
        <div class="popup-message">{{ popupMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "MISAPopup",
    props: {
        popupMessage: {
            type: String,
            default: "",
        },
        popupMode: {
            type: String,
            default: "",
        },
    }, 
};
</script>

<style>
@import url("@/css/components/popup.css");
</style>