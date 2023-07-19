<template>
  <div class="input-group" :class="{ 'validate-error': errorMessage }">
    <div class="input-group__label" v-if="label">
      <label :for="name">
        {{ label }}
        <span v-if="required" class="required-sign">*</span>
      </label>
    </div>
    <div class="input-group__content">
      <input
        ref="input"
        :type="type"
        :style="style"
        autocomplete="off"
        :placeholder="placeholder"
        :class="className"
        :id="id"
        :name="name"
        :disabled="disabled"
        v-model="model"
        @input="onInputText"
        @blur="onInputText"
      />
      <div class="input-group__icon" v-if="icon">
        <div :class="icon" @click="clickInputIcon"></div>
      </div>
    </div>
    <div class="input-group__error" v-if="isError">
      <div class="error-message" v-html="errorMessage"></div>
    </div>
  </div>
</template>

<script>
import validate from "@/js/validation.js";
export default {
  name: "MISAInput",
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
    style: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: Number,
      default: 0,
    },
    minLength: {
      type: Number,
      default: 0,
    },
    isFocus: {
      type: Boolean,
      default: false,
    },
    isValidate: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isError: false,
      errorMessage: "",
    };
  },
  computed: {
    model: {
      get() {
        return this.$attrs["modelValue"];
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  mounted() {
    if (this.isFocus) {
      this.$refs.input.focus();
    }
  },
  methods: {
    /**
     * @description: Hàm xử lý khi click icon input
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/06/2023
     */
    clickInputIcon() {
      this.$emit("clickInputIcon");
    },
    /**
     * @description: Hàm xử lý khi nhập text
     * @param: {event}: event
     * @return: {any}
     * @author: NguyetKTB 02/05/2023
     */
    onInputText(event) {
      const me = this;
      try {
        var inputValue = event.target.value;
        if (me.isValidate) {
          if (validate.isValidLength(inputValue, me.minLength, me.maxLength)) {
            me.isError = false;
            me.errorMessage = "";
            me.$emit("update:modelValue", inputValue);
          } else if (inputValue == "") {
            me.isError = true;
            me.errorMessage = me.$msResource.VALIDATE.Required.format(me.label);
          } else {
            me.isError = true;
            me.errorMessage = me.$msResource.VALIDATE.MaxLength.format(
              me.label,
              me.maxLength
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.input-group__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 4px;
  height: 36px;
  width: 36px;
}
.input-group__content {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
}
@import url(@/css/components/input.css);
</style>