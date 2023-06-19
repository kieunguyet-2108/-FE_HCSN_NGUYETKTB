<template>
  <div
    class="number__picker"
    @keydown="onKeydownNumberPicker($event)"
    :class="{ 'validate-error': errorMessage }"
  >
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
        :value="valueFormatted"
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
      <div class="error-message" v-html="errorMessage"></div>
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
      default: Number.MIN_SAFE_INTEGER,
    },
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER,
    },
    isAllowDecimal: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    isAllowFormatter: {
      type: Boolean,
      default: true,
    },
    isFocus: {
      type: Boolean,
      default: false,
    },
    tempValue: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isError: false,
      errorMessage: "",
    };
  },
  mounted() {
    // nếu có giá trị mặc định thì set giá trị mặc định
    this.$nextTick(() => {
      if (this.isFocus) {
        this.$refs.input.focus();
      }
    });
  },
  computed: {
    /**
     * @description: Giá trị được format theo định dạng tiền tệ
     * @param: {any}
     * @return: {any}
     */
    valueFormatted() {
      const self = this;
      let tempValue = self.modelValue;
      if (self.value) {
        tempValue = self.value;
        self.$emit("update:modelValue", self.value);
      }
      if (self.isAllowFormatter) {
        return (
          new Intl.NumberFormat("vi-VN", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(tempValue) || 0
        );
      } else {
        return tempValue;
      }
    },
  },
  methods: {
    /**
     * @description: Hàm xử lí khi người dùng thực hiện bấm mũi tên lên - xuống
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 09/05/2023
     */
    onKeydownNumberPicker(event) {
      const self = this;
      if (event.keyCode == self.$msEnum.KeyCode.ArrowUp) {
        self.increaseValue();
      }
      if (event.keyCode == self.$msEnum.KeyCode.ArrowDown) {
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
      this.removeError();
      try {
        //lấy ra giá trị của ô input hiện tại
        let value = event.target.value;

        if (!value) {
          self.$emit("update:modelValue", 0);
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

        if (value.includes(",")) {
          if (value.split(",")[1].length > 2) {
            value = value.split(",")[0] + "," + value.split(",")[1].slice(0, 2);
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
        self.$emit("update:modelValue", Number(originNumber));
      } catch (error) {
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
      let self = this,
        newVal = this.modelValue + 1;
      if (self.min || self.max) {
        if (newVal < self.min || newVal > self.max) {
          return;
        }
      }
      this.$emit("update:modelValue", newVal);
    },

    /**
     * @description: giảm giá trị của ô input đi 1 đơn vị
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 03/05/2023
     */
    decreaseValue() {
      let self = this,
        newVal = this.modelValue - 1;
      if (self.min || self.max) {
        if (newVal < self.min || newVal > self.max) {
          return;
        }
      }
      this.$emit("update:modelValue", newVal);
    },

    /**
     * @description: Xóa lỗi khi người dùng nhập vào ô input
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/05/2023
     */
    removeError() {
      this.isError = false;
      this.errorMessage = "";
    },
  },
};
</script>
  
  <style scoped>
@import url(@/css/components/numberpicker.css);
</style>