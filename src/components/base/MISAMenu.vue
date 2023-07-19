<template>
  <div class="context__menu" id="context-menu" :style="style">
    <div
      class="context__menu__item"
      v-for="(option, index) in options"
      :key="index"
      @click="handleClick(option)"
    >
      <div class="context__menu__item__text">
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISAMenu",
  props: {
    options: {
      type: Array,
      default: () => [{}],
    },
    style: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    /**
     * @description: Thực hiện hành động khi click vào item
     * @param: {item}: item được click
     * @return: {any}
     * @author: NguyetKTB 02/06/2023
     */
    handleClick(item) {
      this.$emit("clickItem", item.action);
    },
  },
};
</script>

<style scoped>
.context__menu {
  position: fixed;
  width: 150px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 2px 0 rgba(77, 74, 74, 0.2);
  z-index: 100;
  overflow: hidden;
}
.context__menu__item {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 16px;
  cursor: pointer;
}
.context__menu__item:hover {
  background-color: #d1edf4;
}

@import url(@/css/components/icon.css);
</style>
