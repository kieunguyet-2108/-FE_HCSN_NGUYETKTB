<template>
  <div
    class="ms-tooltip"
    @mousemove="onMouseOver"
    @mouseleave="onMouseLeave"
    @mousedown="onMouseDown"
  >
    <a
      v-if="content"
      class="ms-tooltip__text"
      ref="tooltip"
      :class="isShow ? 'show' : ''"
    >
      {{ content }}
    </a>
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
    }
  },
  methods: {
    /**
     * @description: Thực hiện ẩn tooltip khi hover ra và set lại giá trị isMouseDown = false để cho phép hiển thị tooltip khi hover vào
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 20/05/2023
     */
    onMouseLeave() {
      this.isShow = false
      this.isMouseDown = false
    },
    /**
     * @description: Thực hiện ẩn tooltip khi click vào và set lại giá trị isMouseDown = true để không cho phép hiển thị tooltip khi hover vào
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 20/05/2023
     */
    onMouseDown() {
      this.isShow = false
      this.isMouseDown = true
    },

    /**
     * @description: hiển thị tooltip khi hover vào
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 20/05/2023
     */
    onMouseOver(event) {
      if (!this.isMouseDown) {
        // nếu isMouseDown là false thì  cho phép hiển thị tooltip
        this.isShow = true
        // lấy tọa độ của chuột
        const { clientX, clientY } = event
        const tooltip = this.$refs.tooltip
        if (tooltip) {
          // tạo tooltip ở dưới vị trí của chuột
          tooltip.style.top = clientY + this.top + 'px'
          tooltip.style.left = clientX + this.left + 'px'
          // nếu tooltip bị tràn ra ngoài màn hình thì đưa về trở về vị trí ban đầu
          if (tooltip.getBoundingClientRect().right > window.innerWidth) {
            tooltip.style.left = clientX - tooltip.offsetWidth + 'px'
          }
          if (tooltip.getBoundingClientRect().bottom > window.innerHeight) {
            tooltip.style.top = clientY - tooltip.offsetHeight + 'px'
          }
        }
      }
    },
  },
}
</script>
<style scoped lang="css">

@import url(@/css/components/tooltip.css);
</style>