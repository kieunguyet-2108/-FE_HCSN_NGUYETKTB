<template>
  <div class="modal">
    <div class="modal-content" :style="style">
      <slot></slot>
    </div>
  </div>
</template>


<script>
export default {
  name: "MISAModal",
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    style: {
      type: String,
      default: "",
    },
  },
};
</script>
<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.resize {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  height: 679px;
  min-height: 679px;
  max-width: 100%;
  max-height: 100vh;
  overflow: auto;
  resize: both;
}
@import url(@/css/components/modal.css);
</style>