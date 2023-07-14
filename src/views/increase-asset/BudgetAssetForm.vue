<template>
  <MISAModal style="min-width: 800px; width: 800px">
    <form action="">
      <div class="form__header">
        <div class="form__title">
          Sửa tài sản xe {{ budgetItem.fixed_asset_name }}
        </div>
        <MISATooltipV1 content="Esc">
          <div class="ms-24" @click="closeForm">
            <div class="ms-icon ms-18 ms-icon-arrow-close"></div>
          </div>
        </MISATooltipV1>
      </div>
      <div class="form__content">
        <div class="form__content--item">
          <div class="form__group">
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
        <div class="flex space-between align-items-center">
          <div class="form__content--title">Nguyên giá</div>
          <div v-if="budgetList.length == 0" style="margin-top: 15px">
            <MISATooltipV1 content="Thêm nguồn chi phí">
              <MISAButton
                class="button__icon box-shadow-none"
                icon="ms-icon-add-square"
                @click="addBudgetItem"
              ></MISAButton>
            </MISATooltipV1>
          </div>
        </div>
        <div class="form__content--header">
          <div class="form__content--item" v-if="budgetList.length > 0">
            <div class="form__group">Nguồn hình thành</div>
            <div class="form__group">Giá trị</div>
            <div class="form__group form__group--btnIcon"></div>
          </div>
        </div>

        <div class="form__content--main">
          <div
            class="form__content--item"
            v-for="(budget, index) in caculateBudgetList"
            :key="index"
          >
            <div class="form__group">
              <MISACombobox
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
                  class="button__icon box-shadow-none"
                  icon="ms-icon-add-square"
                  @click="addBudgetItem"
                ></MISAButton>
              </MISATooltipV1>
              <MISATooltipV1 content="Xóa nguồn chi phí">
                <MISAButton
                  class="button__icon box-shadow-none"
                  icon="ms-icon-subtract-circle"
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
              ></MISANumberPickerV1>
            </div>
            <div class="form__group form__group--btnIcon"></div>
          </div>
        </div>
      </div>
      <div class="form__footer gap-10" @keydown="footerKeydown">
        <!-- flex row justify-content-end -->
        <MISATooltipV1 content="Ctrl + S">
          <MISAButton
            ref="saveButton"
            class="button button__main"
            text="Lưu"
            @onClickButton="submitForm"
          ></MISAButton>
        </MISATooltipV1>
        <MISATooltipV1 content="Esc">
          <MISAButton
            ref="cancelButton"
            class="button button__outline border-none"
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
      budgetItem: {},
      budgetList: [],
      budgetCategoryColumns: [],
      budgetCategoryList: [],
      budgetDetailList: [],
      popupInformation: {
        isShowPopup: false,
        popupMessage: '',
        popupMode: '',
      },
    }
  },
  methods: {
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/07/2023
     */
    selectedItem(index, item) {
      let me = this
      // kiểm tra item đã tồn tại trong budget list chưa
      for (let i = 0; i < me.budgetList.length; i++) {
        if (
          me.budgetList[i].budget_category_id == item.budget_category_id &&
          i != index && 
          me.budgetList[i].action !== me.$msEnum.MS_ACTION_TYPE.Delete
        ) {
          // me.budgetList[index].budget_category_id = '';
          me.showPopup(
            'Nguồn chi phí đã tồn tại trong danh sách.',
            me.$msEnum.MS_POPUP_MODE.Warning
          )
          return
        }
      }
      // kiểm tra item đã tồn tại trong budget infomation chưa
      let buggetItem = me.budgetList[index]
      let findItem = me.budgetInfomation.find(
        (budget) => budget.budget_detail_id == buggetItem.budget_detail_id
      )
      me.budgetList[index].budget_category_id = item.budget_category_id
      me.budgetList[index].budget_category_code = item.budget_category_code
      me.budgetList[index].budget_category_name = item.budget_category_name
      if (findItem) {
        me.budgetList[index].action = me.$msEnum.MS_ACTION_TYPE.Edit
      } else {
        me.budgetList[index].action = me.$msEnum.MS_ACTION_TYPE.Add
      }
      console.log(me.budgetList)
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
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 10/07/2023
     */
    submitForm() {
      const me = this;
      console.log(me.budgetList);
      // kiểm tra dữ liệu nhập vào
      let isValid = me.handleData()
      if (!isValid) return
      else {
        this.$emit(
          'submitBudgetDetail',
          this.budgetList,
          this.budgetItem.fixed_asset_id
        )
      }
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/07/2023
     */
    handleData() {
      // kiểm tra dữ liệu nhập vào
      if (this.budgetList.length > 0) {
        for (let i = 0; i < this.budgetList.length; i++) {
          if (
            this.budgetList[i].budget_category_id == '' ||
            this.budgetList[i].budget_value == ''
          ) {
            this.showPopup(
              'Vui lòng nhập đầy đủ thông tin nguồn chi phí.',
              this.$msEnum.MS_POPUP_MODE.Warning
            )
            // focus vào ô đang nhập
            return false;
          }
        }
        return true
      } else {
        return true
      }
    },
    /**
     * @description: Thêm mới budget item
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
     * @description: Xóa budget item
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 30/06/2023
     */
    removeBudgetItem(index, budgetItem) {
      const me = this
      if (budgetItem.budget_category_id == '') {
        me.budgetList.splice(index, 1)
        return
      }
      let findItem = me.budgetInfomation.find(
        (budget) => budget.budget_category_id == budgetItem.budget_category_id
      )
      if (findItem.action == me.$msEnum.MS_ACTION_TYPE.Add ) {
        me.budgetList.splice(index, 1)
      } else {
        me.budgetList[index].action = me.$msEnum.MS_ACTION_TYPE.Delete
      }
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
</style>