<template>
  <div class="dropdown">
    <MISATooltip content="Chọn số bản ghi"
      ><MISAButton
        type="btn-selection"
        icon="ms-8 ms-icon-arrow-down-bold"
        :text="selectedValue"
        @click="handleClick"
        tabindex="-1"
        v-clickOutside="
          () => {
            isShow = false
          }
        "
      ></MISAButton
    ></MISATooltip>
    <div class="dropdown__content" v-if="isShow">
      <div
        class="dropdown__item"
        v-for="(option, index) in options"
        :key="index"
        @click="handleClickItem(option)"
        :class="{
          'dropdown__item--active': option.key === selectedValue,
        }"
      >
        {{ option.value }}
      </div>
    </div>
  </div>
</template>

<script>
import MISATooltip from './MISATooltipV1.vue'
import vClickOutside from 'click-outside-vue3'
import MISAButton from './MISAButton.vue'
export default {
  name: 'MISADropdown',
  components: {
    MISAButton,
    MISATooltip,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    selectedValue: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isShow: false, // Trạng thái hiển thị dropdown
    }
  },
  methods: {
    /**
     * @description: Thực hiện xử lí sự kiện click vào dropdown
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 01/06/2023
     */
    handleClick() {
      this.isShow = !this.isShow
    },

    /**
     * @description: Thực hiện xử lí sự kiện click vào item trong dropdown
     * @param: {option}: option được chọn
     * @return: {any}
     * @author: NguyetKTB 01/06/2023
     */
    handleClickItem(option) {
      this.$emit('changeDropdown', option)
      this.isShow = false
    },
  },
}
</script>

<style scoped>
.dropdown {
  position: relative;
}
.dropdown__content {
  display: flex;
  flex-direction: column-reverse;
  position: absolute;
  top: -160px;
  background-color: #fff;
  width: 70px;
  z-index: 12;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  gap: 2px;
  overflow: hidden;
}
.dropdown__item {
  padding: 10px 0px;
  cursor: pointer;
  padding-left: 20px;
}
.dropdown__item:hover {
  background-color: #d1edf4;
}
.dropdown__item--active {
  background-color: #9dddec;
}
button[type='btn-selection'] {
  box-shadow: none;
  cursor: pointer;
  width: 70px !important;
  min-width: 70px !important;
  height: 30px !important;
  background-color: #fff;
  outline: none;
  border: 1px solid #afafaf;
  border-radius: 4px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  gap: 15px;
}
</style>