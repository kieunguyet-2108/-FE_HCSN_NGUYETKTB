<template>
  <!-- POPUP MESSAGE ( SAME TOAST MESSAGE) -->
  <div class="popup popup-success" id="popup">
    <div class="popup-content flex row">
      <div class="popup-icon mr-20">
        <div class="ms-32">
          <div class="ms-icon-2 ms-32 ms-icon-check-green"></div>
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
    }, 
};
</script>

<style>
@import url("@/css/components/popup.css");
</style>