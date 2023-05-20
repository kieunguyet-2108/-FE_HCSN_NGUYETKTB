<template >
  <div :class="tooltipClass" :style="style">
    <span class="tooltip-text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "MISATooltip",
  props: {
    text: {
      type: String,
      default: "",
    },
    tooltipClass: {
      type: String,
      default: "",
    },
    style:{
      type: String,
      default: "",
    }
  },
  components: {},
};
</script>

<style scoped>
@import url(@/css/components/tooltip.css);
</style>