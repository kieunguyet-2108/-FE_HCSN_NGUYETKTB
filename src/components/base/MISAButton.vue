<template>
  <!-- props la cac giá trị của mảng buttonClass -->
  <button
    ref="button"
    :class="buttonClass"
    :tabindex="tabindex"
    :style="{ order: order }"
    @click="onClickButton"
    :disabled="disabled"
  >
    <div class="ms-icon" v-if="icon" :class="icon"></div>
    <div>{{ text }}</div>
  </button>
</template>

<script>
export default {
  name: "MISAButton",
  props: {
    icon: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    buttonClass: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tabindex: {
      type: Number,
      default: 0,
    },
    order: {
      type: Number,
      default: 0,
    },
    isFocus: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  methods: {
    /**
     * @description: Xử lý sự kiện click button
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 11/05/2023
     */
    onClickButton() {
      if (!this.disabled) {
        event.preventDefault();
        this.$emit("onClickButton");
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.isFocus) {
        this.$refs.button.focus();
      }
    });
  },
};
</script>

<style scoped>
@import url(@/css/components/button.css);
</style>