<template>
  <div
    class="v-tooltip"
    @mousemove="onMouseOver"
    @mouseleave="onMouseLeave"
    @mousedown="onMouseDown"
  >
    <span
      v-if="content"
      class="v-tooltip__text"
      ref="tooltip"
      :class="isShow ? 'show' : ''"
    >
      {{ content }}
    </span>
    <slot></slot>
  </div>
</template>
  
<script>
export default {
  props: {
    content: {
      type: String,
    },
    top: {
      type: Number,
      default: 10,
    },
    left: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      isShow: false,
      isMouseDown: false,
    };
  },
  methods: {
    /**
     * @description: Hàm này dùng để ẩn tooltip khi hover ra và set lại giá trị isMouseDown = false để cho phép hiển thị tooltip khi hover vào
     * Author: KTBN 17.05.23
     */
    onMouseLeave() {
      this.isShow = false;
      this.isMouseDown = false;
    },
    /**
     * @description: Hàm này dùng để ẩn tooltip khi click vào và set lại giá trị isMouseDown = true để không cho phép hiển thị tooltip khi hover vào
     * Author: KTBN 17.05.23
     */
    onMouseDown() {
      this.isShow = false;
      this.isMouseDown = true;
    },
    /**
     * @description: Hàm này dùng để hiển thị tooltip khi hover vào
     * Author: KTBN 17.05.23
     */
    onMouseOver(event) {
      if (!this.isMouseDown) {
        // nếu isMouseDown = false thì mới cho phép hiển thị tooltip
        this.isShow = true;
        const { clientX, clientY } = event; // lấy tọa độ của chuột
        const tooltip = this.$refs.tooltip;
        if (tooltip) {
          // tạo tooltip ở dưới vị trí của chuột
          tooltip.style.top = clientY + this.top + "px";
          tooltip.style.left = clientX + this.left + "px";
          // nếu tooltip bị tràn ra ngoài màn hình thì đưa về vị trí ban đầu
          if (tooltip.getBoundingClientRect().right > window.innerWidth) {
            tooltip.style.left = clientX - tooltip.offsetWidth + "px";
          }
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
.v-tooltip__text {
  z-index: 9999;
  display: none;
  text-align: center;
  position: fixed;
  pointer-events: none;
  padding: 4px 8px;
  opacity: 0;
  line-height: 1.5;
  font-weight: 400;
  font-size: 14px;
  font-family: inherit;
  color: white;
  box-shadow: 0 1em 2em -0.5em rgba(0, 0, 0, 0.35);
  border-radius: 4px;
  background-color: #4f4f4f;

  &.show {
    display: block;
    opacity: 0.9;
  }
}
</style>