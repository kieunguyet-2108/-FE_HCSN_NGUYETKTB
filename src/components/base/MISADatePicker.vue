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
        v-model="dateValue"
        :typeable="true"
        :inputFormat="format"
        :placeholder="format"
        @blur="handleClosed"
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
import moment from 'moment' // gọi moment để format date
import datepicker from 'vue3-datepicker' // gọi datepicker
export default {
  name: 'MISADatePicker',
  components: {
    datepicker,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    format: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
    tabIndex: {
      type: Number,
      default: 0,
    },
    isTodayDefault: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isError: false, // trạng thái validate
      errorMessage: '', // thông báo validate
      date: null, // giá trị ngày tháng năm
    }
  },
  computed: {
    /**
     * @description: Lấy giá trị ngày tháng năm 
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 18/07/2023
     */
    dateValue: {
      get() {
        if (this.modelValue) {
          return moment(new Date(this.modelValue), this.format).toDate()
        }
        return null
      },
      set(value) {
        if (value) {
          const parsedDate = moment(value, this.format)
          if (parsedDate.isValid()) {
            this.$emit('update:modelValue', parsedDate.toISOString(true))
          }
        } else {
          this.$emit('update:modelValue', null)
        }
      },
    },
  },
  mounted() {
    // nếu ngày hiện tại là ngày mặc định
    if (this.isTodayDefault) {
      this.dateValue = moment(new Date(), this.format).toDate()
    }
    this.$nextTick(() => {
      this.$refs[this.name].inputRef.addEventListener('keydown', (e) => {
        if (e.keyCode === 9) {
          this.$refs[this.name].inputRef.blur()
        }
      })
    })
  },
  beforeUnmount() {
    this.$refs[this.name].inputRef.removeEventListener('keydown', (e) => {
      if (e.keyCode === 9) {
        this.$refs[this.name].inputRef.blur()
      }
    })
  },
  methods: {
    /**
     * @description: Hàm lấy ra ngày hiện tại
     * @param: {any}
     * @return: {currentDate}: ngày hiện tại dạng dd/mm/yyyy
     * @author: NguyetKTB 01/05/2023
     */
    getCurrentDate() {
      let date = new Date()
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      return `${day}/${month}/${year}`
    },
    /**
     * @description: Hàm xử lý khi click vào icon calendar
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 02/05/2023
     */
    handleOpen() {
      this.$refs[this.name].inputRef.focus()
    },

    /**
     * @description: Hàm xử lý khi click vào ngoài input
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 04/05/2023
     */
    handleClosed() {
      if (!this.isFormatDate(this.$refs[this.name].inputRef.value)) {
        this.isError = true
        this.errorMessage = this.$msResource.VALIDATE.Invalid.format(this.label)
        this.dateValue = null
      } else {
        this.isError = false
        this.errorMessage = ''
      }
    },

    /**
     * @description: Hàm xử lý khi người dùng chọn ngày
     * @param: {modelData}: ngày được chọn
     * @return: {any}
     * @author: NguyetKTB 01/05/2023
     */
    handleDate(modelData) {
      this.date = modelData
      if (modelData) {
        this.isError = false
        this.errorMessage = ''
        this.$emit('update:modelValue', moment(this.date, this.format).toDate())
      }
    },

    /**
     * @description: Hàm format ngày theo định dạng dd/mm/yyyy
     * @param: {any}
     * @return: {any} ngày được format theo định dạng dd/mm/yyyy có đúng không
     * @author: NguyetKTB 01/05/2023
     */
    isFormatDate(date) {
      const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/
      return regex.test(date)
    },
  },
}
</script>
<style>
@import url(@/css/components/datepicker.css);
</style>