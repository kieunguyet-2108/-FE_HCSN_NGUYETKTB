<template>
  <div class="date-picker-group" :class="{ 'validate-error': errorMessage }">
    <div class="date-picker-label">
      <label :for="name"
        >{{ label }}
        <span class="required-sign" v-if="required">*</span>
      </label>
    </div>
    <div class="date__picker">
      <datepicker
        :class="className"
        :ref="name"
        :id="id"
        :name="name"
        v-model="date"
        :typeable="true"
        :inputFormat="format"
        :placeholder="format"
        @blur="handleClosed"
        @update:modelValue="handleDate"
        autocomplete="off"
      >
      </datepicker>
      <div class="ms-36 date__picker--icon" @click="handleOpen">
        <div class="ms-icon ms-18 ms-icon-calendar"></div>
      </div>
    </div>

    <div class="date-picker-error" v-if="isError">
      <div class="error-message" v-html="errorMessage"></div>
    </div>
  </div>
</template>
  <script>
import moment from "moment"; // gọi moment để format date
import datepicker from "vue3-datepicker"; // gọi datepicker
export default {
  name: "MISADatePicker",
  components: {
    datepicker,
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    // MM/dd/yyyy
    // dd/MM/yyyy
    format: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
    tabIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isError: false,
      errorMessage: "",
      date: "",
    };
  },
  watch: {
    modelValue: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.date = moment(new Date(newVal), this.format).toDate();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.modelValue) {
        this.date = moment(this.modelValue, this.format).toDate();
      } else {
        this.date = moment(this.getCurrentDate(), this.format).toDate();
      }
      this.$refs[this.name].inputRef.addEventListener("keydown", (e) => {
        if (e.keyCode === 9) {
          this.$refs[this.name].inputRef.blur();
        }
      });
    });
  },
  beforeUnmount() {
    this.$refs[this.name].inputRef.removeEventListener("keydown", (e) => {
      if (e.keyCode === 9) {
        this.$refs[this.name].inputRef.blur();
      }
    });
  },
  methods: {
    /**
     * @description: Hàm lấy ra ngày hiện tại
     * @param: {any}
     * @return: {currentDate}: ngày hiện tại dạng dd/mm/yyyy
     * @author: NguyetKTB 01/05/2023
     */
    getCurrentDate() {
      let date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    /**
     * @description: Hàm xử lý khi click vào icon calendar
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 02/05/2023
     */
    handleOpen() {
      this.$refs[this.name].inputRef.focus();
    },

    /**
     * @description: Hàm xử lý khi click vào ngoài input
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 04/05/2023
     */
    handleClosed() {
      if (!this.isFormatDate(this.$refs[this.name].inputRef.value)) {
        this.$refs[this.name].input = this.date.toLocaleDateString("en-GB", { timeZone: 'Asia/Ho_Chi_Minh' });
      }
    },

    /**
     * @description: Hàm xử lý khi người dùng chọn ngày
     * @param: {modelData}: ngày được chọn
     * @return: {any}
     * @author: NguyetKTB 01/05/2023
     */
    handleDate(modelData) {
      this.date = modelData;
      if (this.isFormatDate(this.date.toLocaleDateString("en-GB", { timeZone: 'Asia/Ho_Chi_Minh' }))) {
        this.isError = false;
        this.errorMessage = "";
        this.$emit(
          "update:modelValue",
          moment(this.date, this.format).toDate()
        );
      }
    },

    /**
     * @description: Hàm format ngày theo định dạng dd/mm/yyyy
     * @param: {any}
     * @return: {any} ngày được format theo định dạng dd/mm/yyyy có đúng không
     * @author: NguyetKTB 01/05/2023
     */
    isFormatDate(date) {
      const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
      return regex.test(date);
    },
  },
};
</script>
<style>
@import url(@/css/components/datepicker.css);
</style>