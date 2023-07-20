<template>
  <MISAModal>
    <form action="">
      <div class="form__header">
        <div class="form__title">
          Sửa tài sản xe {{ budgetItem.fixed_asset_name }}
        </div>
        <MISATooltipV1 content="Đóng">
          <div class="ms-24" @click="closeForm">
            <div class="ms-icon ms-18 ms-icon-arrow-close"></div>
          </div>
        </MISATooltipV1>
      </div>
      <div class="form__content">
        <div class="form__content--item form__content--item-budget">
          <div class="form__group form__group--budget">
            <MISAInput
              ref="department_name"
              type="text"
              className="input__field "
              id="department_name"
              name="department_name"
              label="Bộ phận sử dụng"
              v-model="budgetItem.department_name"
              :disabled="true"
            ></MISAInput>
          </div>
        </div>
        <div
          class="flex space-between align-items-center form__content--item-budget"
        >
          <div class="form__content--title">Nguyên giá</div>
          <div v-if="caculateBudgetList.length == 0" style="margin-top: 15px">
            <MISATooltipV1 content="Thêm nguồn chi phí">
              <MISAButton
                type="sub"
                text="Thêm"
                @click="addBudgetItem"
              ></MISAButton>
            </MISATooltipV1>
          </div>
        </div>
        <div class="form__content--header">
          <div class="form__content--item" v-if="caculateBudgetList.length > 0">
            <div class="form__group">Nguồn hình thành</div>
            <div class="form__group">Giá trị</div>
            <div class="form__group form__group--btnIcon"></div>
          </div>
        </div>
        <div
          class="form__content--main"
          ref="contentMain"
          @scroll="handleScrollParent"
        >
          <div
            ref="budgetItem"
            class="form__content--item"
            v-for="(budget, index) in caculateBudgetList"
            :key="index"
          >
            <div class="form__group">
              <MISACombobox
                :ref="'budget_category_code' + index"
                iconRight="ms-8 ms-icon-arrow-down-bold"
                inputType="text"
                inputClass="input__field "
                inputPlaceholder="Chọn nguồn hình thành"
                primaryKey="budget_category_id"
                id="budget_category_code"
                name="budget_category_code"
                :isValidate="true"
                :containHeader="false"
                :data="budgetCategoryList"
                :column="budgetCategoryColumns"
                v-model="budget.budget_category_id"
                @selectedItem="selectedItem(index, $event)"
              ></MISACombobox>
            </div>
            <div class="form__group">
              <MISANumberPickerV1
                :ref="'budget_value' + index"
                type="text"
                className="input__field"
                placeholder="0"
                :min="1"
                v-model="budget.budget_value"
              ></MISANumberPickerV1>
            </div>
            <div class="form__group form__group--btnIcon">
              <MISATooltipV1 content="Thêm nguồn chi phí">
                <MISAButton
                  type="btn-icon"
                  icon="ms-icon-add-square"
                  tabindex="-1"
                  @click="addBudgetItem"
                ></MISAButton>
              </MISATooltipV1>
              <MISATooltipV1 content="Xóa nguồn chi phí">
                <MISAButton
                  type="btn-icon"
                  icon="ms-icon-subtract-circle"
                  tabindex="-1"
                  @click="removeBudgetItem(index, budget)"
                ></MISAButton>
              </MISATooltipV1>
            </div>
          </div>
        </div>
        <div class="form__content--summary">
          <div class="form__content--item">
            <div class="form__group">
              <MISAInput
                type="text"
                className="input__field "
                :disabled="true"
                placeholder="Tổng`"
              ></MISAInput>
            </div>
            <div class="form__group">
              <MISANumberPickerV1
                type="text"
                className="input__field"
                placeholder="0"
                v-model="totalBudgetValue"
                :disabled="true"
              ></MISANumberPickerV1>
            </div>
            <div class="form__group form__group--btnIcon"></div>
          </div>
        </div>
      </div>
      <div class="form__footer gap-10">
        <!-- flex row justify-content-end -->

        <MISATooltipV1 content="Lưu">
          <MISAButton
            ref="saveButton"
            type="main"
            text="Lưu"
            @onClickButton="submitForm"
          ></MISAButton>
        </MISATooltipV1>
        <MISATooltipV1 content="Hủy">
          <MISAButton
            ref="cancelButton"
            type="outline"
            text="Hủy"
            @onClickButton="closeForm"
          ></MISAButton>
        </MISATooltipV1>
      </div>
    </form>
  </MISAModal>
  <MISAPopup
    :style="{
      'z-index': '9999999',
    }"
    :popupMessage="popupInformation.popupMessage"
    :popupMode="popupInformation.popupMode"
    v-if="popupInformation.isShowPopup"
  ></MISAPopup>
</template>

<script>
/* eslint-disable */
import MISAPopup from '@/components/base/MISAPopup.vue'
import column from '@/js/column'
import MISAInput from '@/components/base/MISAInput.vue'
import MISAModal from '@/components/base/MISAModal.vue'
import MISAButton from '@/components/base/MISAButton.vue'
import MISATooltipV1 from '@/components/base/MISATooltipV1.vue'
import MISACombobox from '@/components/base/MISACombobox.vue'
import MISANumberPickerV1 from '@/components/base/MISANumberPickerV1.vue'
import _ from 'lodash'
export default {
  name: 'BudgetAssetForm',
  components: {
    MISAModal,
    MISAButton,
    MISATooltipV1,
    MISAInput,
    MISACombobox,
    MISANumberPickerV1,
    MISAPopup,
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      },
    },
    budgetInfomation: {
      type: Array,
      default: () => {
        return []
      },
    },
    voucherInfo: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  async created() {
    this.budgetItem = this.item
    this.budgetCategoryColumns = column.budgetCategoryColumns
    await this.getBudgetCategoryList()
  },
  mounted() {
    this.$nextTick(() => {
      this.budgetList = _.cloneDeep(this.budgetInfomation)
    })
  },
  computed: {
    totalBudgetValue() {
      let total = 0
      this.budgetList.forEach((budget) => {
        total += budget.budget_value
      })
      return total
    },
    caculateBudgetList() {
      const data = this.budgetList
      console.log('data', data)
      let list = []
      // chỉ lấy các bản ghi có action không phải là delete
      data.forEach((item) => {
        if (item.action !== this.$msEnum.MS_ACTION_TYPE.Delete) {
          list.push(item)
        }
      })
      return list
    },
  },
  data() {
    return {
      budgetItem: {}, // thông tin nguồn chi phí
      budgetList: [], // danh sách nguồn chi phí 
      budgetCategoryColumns: [], // danh sách cột nguồn chi phí
      budgetCategoryList: [], // danh sách nguồn chi phí
      budgetDetailList: [], // danh sách chi tiết nguồn chi phí
      popupInformation: { // thông tin popup
        isShowPopup: false,
        popupMessage: '',
        popupMode: '',
      },
    }
  },
  methods: {
    /**
     * @description: Thực hiện xử lí khi bắt sự kiện scroll component cha và ẩn combobox data
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 19/07/2023
     */
    handleScrollParent(event) {
      const comboboxDataList =
        this.$refs.contentMain.querySelectorAll('.combobox-data')
      comboboxDataList.forEach((comboboxData) => {
        comboboxData.style.display = 'none'
      })
    },
    /**
     * @description: Thực hiện xử lí hành động khi người dùng chọn một item trong combobox
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/07/2023
     */
    selectedItem(index, item) {
      let me = this
      //tìm kiếm trong mảng budgetList xem có bản ghi nào có budget_category_id = item.budget_category_id không
      let budgetItem = me.budgetList.find(
        (budget) =>
          budget.budget_category_id == item.budget_category_id &&
          index != me.budgetList.indexOf(budget) &&
          budget.action !== this.$msEnum.MS_ACTION_TYPE.Delete
      )
      //nếu có thì thay đổi giá trị của bản ghi đó
      if (budgetItem) {
        // waring
        me.showPopup('Loại ngân sách đã tồn tại.', 'warning')
        // tìm lại trong danh sách budgetCategoryList xem có bản ghi nào có budget_category_id = item.budget_category_id không
        let budgetCategoryItem = me.budgetCategoryList.find(
          (budgetCategory) =>
            me.budgetList[index].budget_category_name ==
              budgetCategory.budget_category_name &&
            me.budgetList[index].budget_category_code ==
              budgetCategory.budget_category_code
        )
        // nếu có thì gán lại giá trị cho bản ghi
        if (budgetCategoryItem) {
          me.budgetList[index].budget_category_id =
            budgetCategoryItem.budget_category_id
          this.$refs['budget_category_code' + index][0].inputValue =
            budgetCategoryItem.budget_category_name
        } else {
          me.budgetList[index].budget_category_id = ''
          me.budgetList[index].budget_category_name = ''
          me.budgetList[index].budget_category_code = ''
        }

        return
      } else {
        me.budgetList[index].budget_category_id = item.budget_category_id
        me.budgetList[index].budget_category_name = item.budget_category_name
        me.budgetList[index].budget_category_code = item.budget_category_code
      }
    },

    /**
     * @description: Thực hiện show popup
     * @param: {message, popupCase}: message: nội dung popup, popupCase: trạng thái popup
     * @return: {any}
     * @author: NguyetKTB 04/05/2023
     */
    async showPopup(message, popupMode) {
      // load data xong show popup
      this.popupInformation.isShowPopup = true
      this.popupInformation.popupMessage = message
      this.popupInformation.popupMode = popupMode
      setTimeout(() => {
        this.popupInformation.isShowPopup = false
      }, 3000)
    },
    /**
     * @description: Thực hiện đóng form
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 30/06/2023
     */
    closeForm() {
      this.$emit('close')
    },
    /**
     * @description: Thực hiện xử lí kiểm tra dữ liệu và emit danh sách chi phí đã chọn sang component cha
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 10/07/2023
     */
    submitForm() {
      const me = this
      // kiểm tra dữ liệu nhập vào
      let isValid = me.validateData()
      if (!isValid) return
      else {
        const list = me.handleData()
        this.$emit('submitBudgetDetail', list, this.budgetItem.fixed_asset_id)
      }
    },
    /**
     * @description: Thực hiện xử lí dữ liệu theo nghiệp vụ nhất định
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 19/07/2023
     */
    validateData() {
      const me = this
      let errorMessage = []
      // kiểm tra dữ liệu nhập vào
      me.budgetList.forEach((item) => {
        if (!item.budget_category_id) {
          errorMessage.push({
            field: 'budget_category_code' + me.budgetList.indexOf(item),
            content: 'Thông tin không được để trống.',
          })
        }
        if (!item.budget_value) {
          errorMessage.push({
            field: 'budget_value' + me.budgetList.indexOf(item),
            content: 'Thông tin không được để trống.',
          })
        }
      })
      if (errorMessage.length > 0) {
        // hiển thị thông báo lỗi
        me.showPopup('Vui lòng nhập đầy đủ thông tin.', 'warning')
        errorMessage.forEach((message) => {
          // thêm class error vào control lỗi
          this.$refs[message.field][0].isError = true
          this.$refs[message.field][0].errorMessage = message.content
        })
        return false
      }
      return true
    },
    /**
     * @description: Thực hiện xử lí danh sách dữ liệu trước khi emit sang component cha
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/07/2023
     */
    handleData() {
      const me = this
      // lấy ra danh sach các bản ghi đã xóa
      var deletedList = []
      me.budgetInfomation.forEach((item) => {
        let findItem = me.budgetList.find(
          (budget) => budget.budget_detail_id == item.budget_detail_id
        )
        if (!findItem) {
          item.action = me.$msEnum.MS_ACTION_TYPE.Delete
          deletedList.push(item)
        }
      })
      // lấy ra danh sách các bản ghi đã thêm mới
      var addedList = me.budgetList.filter(
        (item) => item.action == me.$msEnum.MS_ACTION_TYPE.Add
      )
      // lấy ra danh sách các bản ghi đã sửa: so sánh giá trị cũ và giá trị mới
      var editList = []
      me.budgetList.forEach((item) => {
        let findItem = me.budgetInfomation.find(
          (budget) => budget.budget_detail_id == item.budget_detail_id
        )
        if (findItem) {
          if (
            findItem.budget_category_id != item.budget_category_id ||
            findItem.budget_value != item.budget_value
          ) {
            item.action = me.$msEnum.MS_ACTION_TYPE.Edit
            editList.push(item)
          }
        }
      })
      // lấy ra dánh sách bản ghi không thay đổi
      var noChangeList = []
      me.budgetList.forEach((item) => {
        let findItem = me.budgetInfomation.find(
          (budget) => budget.budget_detail_id == item.budget_detail_id
        )
        if (findItem) {
          if (
            findItem.budget_category_id == item.budget_category_id &&
            findItem.budget_value == item.budget_value && findItem.action == null
          ) {
            noChangeList.push(item)
          }
        }
      })
      console.log('addedList', addedList);
      console.log('editList', editList);
      console.log('deletedList', deletedList);
      console.log('noChangeList', noChangeList);
      // gộp 3 danh sách lại
      return [...addedList, ...editList, ...deletedList, ...noChangeList]
    },
    /**
     * @description: Thực hiện thêm mới nguồn chi phí khi người dùng click vào nút thêm mới
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 30/06/2023
     */
    addBudgetItem() {
      if (this.budgetList.length == this.budgetCategoryList.length) {
        this.showPopup(
          'Số lượng nguồn chi phí đã đạt tối đa.',
          this.$msEnum.MS_POPUP_MODE.Warning
        )
      } else if (this.budgetList.length < this.budgetCategoryList.length) {
        let item = {
          budget_detail_id: '',
          budget_category_id: '',
          budget_category_code: '',
          budget_category_name: '',
          fixed_asset_id: this.budgetItem.fixed_asset_id,
          budget_value: '',
        }
        item.action = this.$msEnum.MS_ACTION_TYPE.Add
        this.budgetList.push(item)
      }
    },
    /**
     * @description: Thực hiện xóa nguồn chi phí ở vị trí người dùng chọn
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 30/06/2023
     */
    removeBudgetItem(index) {
      const me = this
      me.budgetList.splice(index, 1)
    },
    /**
     * @description: Lấy ra thông tin danh sách nguồn chi phí
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 30/06/2023
     */
    async getBudgetCategoryList() {
      const me = this
      const result = await me.$msApi.budget_category.getBudgetCategories()
      if (result == null) {
        me.budgetCategoryList = []
      } else if (result.status == me.$msEnum.MS_CODE.SUCCESS) {
        me.budgetCategoryList = result.data.data
      }
    },
  },
}
</script>

<style scoped>
.form__group--btnIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  min-width: 72px;
}
.form__content--header {
  min-height: 20px;
  max-height: 20px;
  margin-bottom: 10px;
}
.form__group--btnIcon .button__icon {
  width: 36px;
  height: 36px;
}
.form__content--item {
  height: 70px !important;
  width: 750px;
}
.form__content--item-budget {
  width: 660px !important;
}
.form__content--item .form__group:first-child {
  flex: 2 !important;
}
.form__content--item .form__group:nth-child(2) {
  flex: 1 !important;
}
.form__content--title {
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  margin-top: 20px;
  margin-bottom: 15px;
}
.form__content--main {
  min-height: 250px;
  max-height: 250px;
  overflow-y: auto;
}
.button__icon:hover .ms-icon.ms-icon-add-square {
  background-position: -419px -419px !important;
  background-color: #333333;
}
button[type='btn-icon'] {
  box-shadow: none !important;
}
.form__group .form__content--item.is-clicked .form__group {
  pointer-events: none;
}
</style>