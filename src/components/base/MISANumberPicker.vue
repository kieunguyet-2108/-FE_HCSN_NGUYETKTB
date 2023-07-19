<template>
  <div class="number__picker" @keydown="onKeydownNumberPicker($event)">
    <div class="number__picker--label" v-if="label">
      <label :for="name">
        {{ label }}
        <span v-if="required" class="required-sign">*</span>
      </label>
    </div>
    <div class="number-picker-group">
      <input
        ref="input"
        :type="type"
        :placeholder="placeholder"
        :class="className"
        :id="id"
        autocomplete="off"
        :name="name"
        :disabled="disabled"
        :value="modelValue"
        @input="onInputNumber($event)"
        @blur="onBlurNumberPicker($event)"
      />
      <div class="number-picker-icon" v-if="hasIcon">
        <div
          class="ms-icon ms-icon-arrow-up-bold ms-8"
          @click="increaseValue"
        ></div>
        <div
          class="ms-icon ms-icon-arrow-down-bold ms-8"
          @click="decreaseValue"
        ></div>
      </div>
    </div>
    <div class="number__picker--error" v-if="isError">
      <div class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import validate from "@/js/validation.js";
export default {
  name: "MISANumberPicker",
  components: {},
  props: {
    type: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },
    isAllowDecimal: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      default: null,
    },
    isAllowFormatter: {
      type: Boolean,
      default: true,
    },
    tempValue: {
      default: null,
    },
    isFocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isError: false,
      errorMessage: "",
      valueInstance: "",
    };
  },
  watch: {
    tempValue: function (newVal) {
      if (newVal && typeof newVal === "number") {
        console.log(newVal);
        this.$emit(
          "update:modelValue",
          new Intl.NumberFormat("vi-VN", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(newVal)
        );
      }
    },
  },
  mounted() {
    // nếu có giá trị mặc định thì set giá trị mặc định
    if (this.isFocus) {
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    }
    // if (this.modelValue) {
    //   this.$emit(
    //     "update:modelValue",
    //     new Intl.NumberFormat("vi-VN", {
    //       minimumFractionDigits: 0,
    //       maximumFractionDigits: 4,
    //     }).format(newVal)
    //   );
    // }
  },
  methods: {
    /**
     * @description: Hàm xử lí khi người dùng thực hiện bấm mũi tên lên - xuống
     * @param: {*} event : sự kiện keydown
     * @return: {any}
     * @author: NguyetKTB 09/05/2023
     */
    onKeydownNumberPicker(event) {
      const self = this;
      if (event.keyCode == self.$msEnum.KEY_CODE.ArrowUp) {
        self.increaseValue();
      }
      if (event.keyCode == self.$msEnum.KEY_CODE.ArrowDown) {
        self.decreaseValue();
      }
    },
    /**
     * @description: Xử lí input nhập vào khi người dùng nhập vào ô input
     * @param {*} event : sự kiện input
     * @author NguyetKTB 05.01.2023
     */
    onInputNumber(event) {
      const self = this;
      try {
        //lấy ra giá trị của ô input hiện tại
        let value = event.target.value;
        if (value === "") {
          self.$emit("update:modelValue", "0");
          return;
        }
        // kiểm tra nếu người dùng nhập dấu ','
        if (self.isAllowDecimal) {
          if (event.data === ",") {
            // nếu người dùng nhập dấu , và không có dấu , nào đã tồn tại => đang nhập số thập phân
            if ((value.match(/,/g) || []).length <= 1) {
              // không xử lí gì thêm và tiếp tục nhập
              return;
            }
          }
        } else {
          if (event.data === ",") {
            // loại bỏ dấu , vừa nhập vào
            value = value.replace(/,/g, "");
          }
        }

        let originNumber = 0; // giá trị là số chưa được format
        event.target.value = validate.formatCurrency(value, (value) => {
          originNumber = value;
        }); // đây là nhập trong ô input

        if (self.min || self.max) {
          if (originNumber < self.min || originNumber > self.max) {
            event.target.value = this.modelValue;
            return;
          }
        }
        self.$emit("originNumber", originNumber);
        // cập nhật lại giá trị cho modelValue
        self.$emit("update:modelValue", event.target.value); // đây là giá trị binding ra bên ngoài
      } catch (error) {
        console.log("Có lỗi xảy ra");
        console.log(error);
      }
    },
    /**
     * @description: Xử lí input nhập vào khi người dùng blur ra ngoài
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 01/05/2023
     */
    onBlurNumberPicker(event) {
      // nếu có dấu , cuối cùng thì xóa đi
      if (
        event.target.value.lastIndexOf(",") ===
        event.target.value.length - 1
      ) {
        event.target.value = event.target.value.substring(
          0,
          event.target.value.length - 1
        );
      }
    },

    /**
     * @description: tăng giá trị của ô input lên 1 đơn vị
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 01/05/2023
     */
    increaseValue() {
      let inputValue = this.modelValue || `${this.min}`;
      inputValue = inputValue.replaceAll(".", "");
      inputValue = inputValue.replaceAll(",", ".");
      inputValue = parseFloat(inputValue);
      if (inputValue >= this.max && this.max) {
        inputValue = this.max;
      } else {
        inputValue = inputValue + 1;
      }
      inputValue = new Intl.NumberFormat("vi-VN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(inputValue);
      this.$emit("update:modelValue", inputValue);
    },

    /**
     * @description: giảm giá trị của ô input đi 1 đơn vị
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 03/05/2023
     */
    decreaseValue() {
      let inputValue = this.modelValue || `${this.min}`;
      inputValue = inputValue.replaceAll(".", "");
      inputValue = inputValue.replaceAll(",", ".");
      inputValue = parseFloat(inputValue);
      if (!isNaN(this.min)) {
        if (inputValue <= this.min) {
          inputValue = this.min;
        } else {
          inputValue = inputValue - 1;
        }
      }
      inputValue = new Intl.NumberFormat("vi-VN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(inputValue);
      this.$emit("update:modelValue", inputValue);
    },
  },
};
</script>

<style scoped>
@import url(@/css/components/numberpicker.css);
</style>