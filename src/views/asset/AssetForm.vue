<template >
  <div>
    <div>
      <MISAModal @keydown.esc="cancelForm" type="default">
        <form action="">
          <div class="form__header">
            <div class="form__title">{{ title }}</div>
            <MISATooltipV1 content="Esc">
              <div class="ms-24" @click="closeModal">
                <div class="ms-icon ms-18 ms-icon-arrow-close"></div>
              </div>
            </MISATooltipV1>
          </div>
          <div class="form__content">
            <div class="form__content--item">
              <div class="form__group">
                <MISAInput
                  ref="fixed_asset_code"
                  type="text"
                  placeholder="Mã tài sản"
                  className="input__field "
                  id="fixed_asset_code"
                  name="fixed_asset_code"
                  label="Mã tài sản"
                  :required="true"
                  :maxLength="100"
                  :minLength="1"
                  :isFocus="true"
                  v-model="assetItem.fixed_asset_code"
                ></MISAInput>
              </div>
              <div class="form__group">
                <MISAInput
                  ref="fixed_asset_name"
                  type="text"
                  placeholder="Nhập tên tài sản"
                  className="input__field "
                  id="fixed_asset_name"
                  name="fixed_asset_name"
                  label="Tên tài sản"
                  :required="true"
                  :maxLength="255"
                  :minLength="1"
                  v-model="assetItem.fixed_asset_name"
                ></MISAInput>
              </div>
            </div>
            <div class="form__content--item">
              <div class="form__group">
                <MISACombobox
                  ref="department_code"
                  iconRight="ms-8 ms-icon-arrow-down-bold"
                  inputType="text"
                  inputClass="input__field "
                  inputPlaceholder="Chọn mã bộ phận sử dụng"
                  label="Mã bộ phận sử dụng"
                  :required="true"
                  id="department_code"
                  name="department_code"
                  primaryKey="department_id"
                  v-model="assetItem.department_id"
                  :data="departments"
                  :isValidate="true"
                  :column="departmentColumns"
                  @selectedItem="updateDepartment"
                ></MISACombobox>
              </div>
              <div class="form__group">
                <MISAInput
                  ref="department_name"
                  type="text"
                  className="input__field "
                  id="department_name"
                  name="department_name"
                  label="Tên bộ phận sử dụng"
                  :disabled="true"
                  v-model="assetItem.department_name"
                ></MISAInput>
              </div>
            </div>
            <div class="form__content--item">
              <div class="form__group">
                <MISACombobox
                  ref="fixed_asset_category_code"
                  iconRight="ms-8 ms-icon-arrow-down-bold"
                  inputType="text"
                  inputClass="input__field "
                  inputPlaceholder="Chọn mã loại tài sản"
                  label="Mã loại tài sản"
                  :required="true"
                  id="fixed_asset_category_code"
                  name="fixed_asset_category_code"
                  primaryKey="fixed_asset_category_id"
                  v-model="assetItem.fixed_asset_category_id"
                  :isValidate="true"
                  :data="fixedAssetCategories"
                  :column="fixedAssetCategoryColumns"
                  @selectedItem="updateFixedAssetCategory"
                ></MISACombobox>
              </div>
              <div class="form__group">
                <MISAInput
                  ref="fixed_asset_category_name"
                  type="text"
                  className="input__field "
                  id="fixed_asset_category_name"
                  name="fixed_asset_category_name"
                  label="Tên loại tài sản"
                  :disabled="true"
                  v-model="assetItem.fixed_asset_category_name"
                ></MISAInput>
              </div>
            </div>
            <div class="form__content--item">
              <div class="form__group">
                <MISANumberPickerV1
                  ref="quantity"
                  type="text"
                  label="Số lượng"
                  className="input__field"
                  :required="true"
                  id="quantity"
                  name="quantity"
                  placeholder="0"
                  :hasIcon="true"
                  v-model="assetItem.quantity"
                  :min="1"
                ></MISANumberPickerV1>
              </div>
              <div class="form__group--element">
                <div class="form__group">
                  <MISANumberPickerV1
                    ref="cost"
                    inputType="text"
                    label="Nguyên giá"
                    className="input__field"
                    :required="true"
                    id="cost"
                    name="cost"
                    placeholder="0"
                    v-model="assetItem.cost"
                  ></MISANumberPickerV1>
                </div>
                <div class="form__group">
                  <MISANumberPickerV1
                    ref="life_time"
                    inputType="text"
                    label="Số năm sử dụng"
                    className="input__field"
                    :required="true"
                    id="life_time"
                    name="life_time"
                    placeholder="0"
                    v-model="assetItem.life_time"
                  ></MISANumberPickerV1>
                </div>
              </div>
            </div>
            <div class="form__content--item">
              <div class="form__group">
                <MISANumberPickerV1
                  ref="depreciation_rate"
                  inputType="text"
                  label="Tỉ lệ hao mòn (%)"
                  className="input__field"
                  :required="true"
                  id="depreciation_rate"
                  name="depreciation_rate"
                  placeholder="0"
                  :hasIcon="true"
                  v-model="assetItem.depreciation_rate"
                  :min="0"
                  :max="100"
                  :isAllowDecimal="true"
                ></MISANumberPickerV1>
              </div>
              <div class="form__group--element">
                <div class="form__group">
                  <MISANumberPickerV1
                    ref="depreciation_year"
                    inputType="text"
                    label="Giá trị hao mòn năm"
                    className="input__field"
                    :required="true"
                    id="depreciation_year"
                    name="depreciation_year"
                    placeholder="0"
                    v-model="this.assetItem.depreciation_year"
                    :tempValue="depreciationYear"
                  ></MISANumberPickerV1>
                </div>
                <div class="form__group">
                  <MISANumberPicker
                    ref="tracked_year"
                    inputType="text"
                    label="Năm theo dõi"
                    className="input__field"
                    id="tracked_year"
                    name="tracked_year"
                    :disabled="true"
                    :isAllowFormatter="false"
                    v-model="assetItem.tracked_year"
                  ></MISANumberPicker>
                </div>
              </div>
            </div>

            <div class="form__content--item">
              <div class="form__group">
                <MISADatePicker
                  ref="purchase_date"
                  label="Ngày mua"
                  :required="true"
                  format="dd/MM/yyyy"
                  id="purchase_date"
                  name="purchase_date"
                  v-model="assetItem.purchase_date"
                  isTodayDefault
                ></MISADatePicker>
              </div>
              <div class="form__group--element">
                <div class="form__group">
                  <MISADatePicker
                    ref="start_using_date"
                    label="Ngày bắt đầu sử dụng"
                    :required="true"
                    format="dd/MM/yyyy"
                    id="start_using_date"
                    name="start_using_date"
                    v-model="assetItem.start_using_date"
                    isTodayDefault
                  ></MISADatePicker>
                </div>
                <div class="form__group"></div>
              </div>
            </div>
            <!-- Chỗ này sẽ là date picker group -->
          </div>
          <div class="form__footer gap-10" @keydown="footerKeydown">
            <!-- flex row justify-content-end -->
            <MISATooltipV1 content="Ctrl + S">
              <MISAButton
                ref="saveButton"
                type="main"
                text="Lưu"
                @onClickButton="submitForm"
                :order="2"
              ></MISAButton>
            </MISATooltipV1>
            <MISATooltipV1 content="Esc">
              <MISAButton
                ref="cancelButton"
                type="outline"
                text="Hủy"
                @onClickButton="cancelForm"
                :order="1"
              ></MISAButton>
            </MISATooltipV1>
          </div>
        </form>
      </MISAModal>
    </div>
    <MISADialog
      ref="dialog"
      v-if="dialogInformation.isShowDialog"
      :dialogMessages="dialogInformation.messages"
      :buttonList="dialogInformation.buttonList"
      :styleIcon="dialogInformation.styleIcon"
    ></MISADialog>
    <MISAPopup
      :popupMessage="popupInformation.popupMessage"
      :popupMode="popupInformation.popupMode"
      v-if="popupInformation.isShowPopup"
    ></MISAPopup>
  </div>
</template>

<script>
/* eslint-disable */
import validation from '@/js/validation'
/* import component*/
import MISAButton from '@/components/base/MISAButton.vue'
import MISADatePicker from '@/components/base/MISADatePicker.vue'
import MISANumberPicker from '@/components/base/MISANumberPicker.vue'
import MISANumberPickerV1 from '@/components/base/MISANumberPickerV1.vue'
import MISACombobox from '@/components/base/MISACombobox.vue'
import MISAInput from '../../components/base/MISAInput.vue'
import MISAModal from '@/components/base/MISAModal.vue'
import MISADialog from '@/components/base/MISADialog.vue'
import MISATooltipV1 from '@/components/base/MISATooltipV1.vue'
import MISAPopup from '@/components/base/MISAPopup.vue'
export default {
  name: 'AssetForm',
  components: {
    MISAInput,
    MISACombobox,
    MISANumberPicker,
    MISANumberPickerV1,
    MISAModal,
    MISADatePicker,
    MISAButton,
    MISADialog,
    MISATooltipV1,
    MISAPopup,
  },
  props: {
    asset_id: {
      type: String,
      default: null,
    },
    duplicate_id: {
      type: String,
      default: null,
    },
    departmentColumns: {
      type: Array,
      default: () => [],
    },
    fixedAssetCategoryColumns: {
      type: Array,
      default: () => [],
    },
  },
  async created() {
    const me = this
    me.getDepartmentList()
    me.getFixedAssetCategoryList()
    // get current date
    var date = new Date()
    if (me.asset_id != null) {
      me.formMode = me.$msEnum.FORM_MODE.Edit
      me.title = 'Sửa tài sản'
      me.assetItem = await me.getFixedAssetById(me.asset_id)
      me.assetItem.modified_date = date
      me.assetItem.depreciation_rate = me.assetItem.depreciation_rate * 100
    } else {
      me.formMode = me.$msEnum.FORM_MODE.Add
      me.title = 'Thêm mới tài sản'
      me.assetItem = {
        ...me.assetItem,
        tracked_year: new Date().getFullYear(),
      }
      me.assetItem.fixed_asset_code = await me.getNewCode()
    }
    if (me.duplicate_id != null) {
      me.formMode = me.$msEnum.FORM_MODE.Duplicate
      me.title = 'Nhân bản tài sản'
      me.assetItem = await me.getFixedAssetById(me.duplicate_id)
      me.assetItem.fixed_asset_code = await me.getNewCode()
      me.assetItem.depreciation_rate = me.assetItem.depreciation_rate * 100
    }
  },
  computed: {
    // tính toán giá trị hao mòn năm
    depreciationYear: {
      get() {
        let a = validation.convertStringToNumber(this.assetItem.cost)
        let b = validation.convertStringToNumber(
          this.assetItem.depreciation_rate
        )
        let result = a * (b / 100)
        this.assetItem.depreciation_year = result
        return result
      },
      set(value) {
        this.assetItem.depreciation_year = value
      },
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleEvent)
  },
  data() {
    return {
      formMode: null,
      assetItem: {
        fixed_asset_id: '', // id tài sản
        fixed_asset_code: '', // mã tài sản
        fixed_asset_name: '', // tên tài sản
        fixed_asset_category_id: '', // id loại tài sản
        fixed_asset_category_code: '', // mã loại tài sản
        fixed_asset_category_name: '', // tên loại tài sản
        department_id: '', // id bộ phận sử dụng
        department_code: '', // mã bộ phận sử dụng
        department_name: '', // tên bộ phận sử dụng
        quantity: 1, // số lượng
        cost: 0, // nguyên giá
        life_time: '', // số năm sử dụng
        depreciation_rate: 0, // tỉ lệ hao mòn
        depreciation_year: 0, // giá trị hao mòn nămfmessages
        tracked_year: '', // năm bắt đầu theo dõi
        purchase_date: '', // ngày mua
        start_using_date: '', // ngày bắt đầu sử dụng
        created_date: '',
        modified_date: '',
      },
      // phòng ban được chọn
      selectedDepartment: {},
      // loại tài sản được chọn
      selectedFixedAssetCategory: {},
      // tiêu đề của form
      title: '',
      // thông tin dialog hiển thị khi có sự kiện trong form
      dialogInformation: {},
      // danh sách tài sản
      fixedAssets: [],
      // danh sách phòng ban
      departments: [],
      // danh sách loại tài sản
      fixedAssetCategories: [],
      popupInformation: {}, // thông tin popup
      errorMessages: [], // danh sách thông báo lỗi
    }
  },
  methods: {
    /**
     * @description: Hàm xử lí phím tắt
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 01/06/2023
     */
    handleEvent(event) {
      const me = this
      // Nếu nhấn phím Ctrl
      if (event.ctrlKey) {
        switch (event.keyCode) {
          case me.$msEnum.KEY_CODE.Save: // Ctrl + S: lưu và đóng form
            event.preventDefault()
            me.submitForm() // thực hiện validate -> lưu dữ liệu -> đóng form
            break
          case me.$msEnum.KEY_CODE.Escape: // Esc: Hủy bỏ
            event.preventDefault()
            me.cancelForm()
            break
          default:
            break
        }
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
     * @description: Hàm này dùng để lấy ra mã tài sản mới
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 29/05/2023
     */
    async getNewCode() {
      const me = this
      try {
        const result = await this.$msApi.fixed_asset.getNewAssetCode()
        if (result == null) return null
        if (result.status == this.$msEnum.MS_CODE.SUCCESS) {
          return result.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * @description: Hàm này dùng để lấy thông tin tài sản theo id
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/05/2023
     */
    async getDepartmentList() {
      const me = this
      try {
        const result = await this.$msApi.department.getDepartments()
        if (result == null) return null
        if (result.status == this.$msEnum.MS_CODE.SUCCESS) {
          me.departments = result.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * @description: Hàm này dùng để lấy thông tin phòng ban theo id
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 31/05/2023
     */
    async getDepartmentById(id) {
      const me = this
      try {
        const result = await this.$msApi.department.getDepartmentById(id)
        if (result == null) return null
        if (result.status == this.$msEnum.MS_CODE.SUCCESS) {
          return result.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * @description: Hàm này dùng để lấy danh sách loại tài sản
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/05/2023
     */
    async getFixedAssetCategoryList() {
      const me = this
      try {
        const result =
          await this.$msApi.fixed_asset_category.getFixedAssetCategories()
        if (result == null) return null
        if (result.status == this.$msEnum.MS_CODE.SUCCESS) {
          me.fixedAssetCategories = result.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * @description: Hàm này dùng để lấy thông tin loại tài sản theo id
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 31/05/2023
     */
    async getFixedAssetCategoryById(id) {
      const me = this
      try {
        const result =
          await this.$msApi.fixed_asset_category.getFixedAssetCategoryById(id)
        if (result == null) return null
        if (result.status == this.$msEnum.MS_CODE.SUCCESS) {
          return result.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * @description: Hàm này dùng để lấy thông tin tài sản theo id
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 20/05/2023
     */
    async getFixedAssetById(id) {
      const me = this
      try {
        const result = await this.$msApi.fixed_asset.getFixedAssetById(id)
        if (result == null) return null
        if (result.status == this.$msEnum.MS_CODE.SUCCESS) {
          return result.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * @description: Hàm này dùng để unfocus control đang focus trong form
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/05/2023
     */
    processUnfocusLastControl(e, fn) {
      if (e.which === 13 && e.target == document.activeElement) return
      if (e.which === 9 && !e.shiftKey) {
        let cur = e.target
        let els = e.currentTarget.querySelectorAll('*')
        var flag = true
        for (let i = 0; i < els.length; i++) {
          if (els[i] === cur) {
            flag = false
            continue
          }
          if (flag) {
            continue
          }
          els[i].focus()
          if (els[i] === document.activeElement) {
            e.preventDefault()
            return
          }
        }
      }
      e.preventDefault()
      fn()
    },

    /**
     * @description: Hàm này dùng để lấy control đầu tiên trong form để focus
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/05/2023
     */
    getFirstControlFocus(parent) {
      const obj = parent || document,
        selector = [
          'input:not([disabled]):not([tabindex="-1"])',
          'select:not([disabled]):not([tabindex="-1"])',
          'textarea:not([disabled]):not([tabindex="-1"])',
          'button:not([disabled]):not([tabindex="-1"])',
          'a:not([disabled]):not([tabindex="-1"])',
        ].join(', ')
      const items = obj.querySelectorAll(selector)
      if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].offsetParent !== null) {
            items[i].focus()
            return items[i]
          }
        }
      }
    },
    /**
     * @description: Hàm này dùng để focus vào control đầu tiên trong form
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/05/2023
     */
    focusFirstControl(scope) {
      if (scope) {
        const me = this
        me.$nextTick(() => {
          let input
          if (
            scope.type === 'text' ||
            (scope.hasAttribute &&
              scope.hasAttribute('type') &&
              scope.getAttribute('type') === 'text')
          ) {
            input = scope
          } else {
            input = this.getFirstControlFocus(scope)
          }
          if (input) {
            input.focus()
          }
        })
      }
    },
    /**
     * @description: Hàm này thực hiện các xử lí khi người dùng nhấn phím tab ở control cuối cùng trong form
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/05/2023
     */
    footerKeydown(e) {
      const me = this
      if (e.keyCode == me.$msEnum.KEY_CODE.Tab) {
        this.processUnfocusLastControl(e, () => {
          me.focusFirstControl(me.$el)
        })
      }
    },
    /**
     * @description: Đóng modal form bằng cách chuyển về trang asset
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 01/05/2023
     */
    closeModal() {
      this.$router.push('/asset')
    },
    /**
     * @description: Thực hiện update các thông tin của bộ phận sử dụng
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 02/05/2023
     */
    updateDepartment(department) {
      if (department) {
        this.assetItem.department_id = department.department_id
        this.assetItem.department_name = department.department_name
        this.assetItem.department_code = department.department_code
      }
    },

    /**
     * @description: Thực hiện update các thông tin của loại tài sản
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 02/05/2023
     */
    updateFixedAssetCategory(fixedAssetCategory) {
      if (fixedAssetCategory) {
        this.assetItem.fixed_asset_category_id =
          fixedAssetCategory.fixed_asset_category_id
        this.assetItem.fixed_asset_category_code =
          fixedAssetCategory.fixed_asset_category_code
        this.assetItem.fixed_asset_category_name =
          fixedAssetCategory.fixed_asset_category_name
        this.assetItem.depreciation_rate = fixedAssetCategory.depreciation_rate
        this.assetItem.life_time = fixedAssetCategory.life_time
      }
    },
    /**
     * @description: Tạo mới mã uuid
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 24/05/2023
     */
    getUuid() {
      var temp_url = URL.createObjectURL(new Blob())
      var uuid = temp_url.toString()
      URL.revokeObjectURL(temp_url)
      return uuid.substr(uuid.lastIndexOf('/') + 1)
    },

    /**
     * @description: Thực hiện kiểm tra dữ liệu trước khi submit form
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 02/05/2023
     */
    async submitForm() {
      const me = this
      // validate dữ liệu
      await me.handleData(this.assetItem)
      // nếu có lỗi thì hiển thị message lỗi cho người dùng
      const messages = me.errorMessages
      if (messages.length > 0) {
        me.showErrorMessage()
        return
      }
      // nếu không có lỗi thì thực hiện lưu dữ liệu
      else {
        if (
          me.formMode == this.$msEnum.FORM_MODE.Add ||
          me.formMode == this.$msEnum.FORM_MODE.Duplicate
        ) {
          let result = await me.insertData()
          if (result != null) {
            me.assetItem.fixed_asset_id = result
            me.$emit('insertAsset', me.assetItem)
          }
        } else {
          console.log(me.assetItem)
          let result = await me.updateData()
          if (result) {
            me.$emit(
              'updateAsset',
              'Cập nhật dữ liệu thành công',
              me.$msEnum.MS_POPUP_MODE.Success,
              me.assetItem
            )
          } else {
            me.$emit(
              'updateAsset',
              'Cập nhật dữ liệu thất bại',
              me.$msEnum.MS_POPUP_MODE.Error,
              me.assetItem
            )
          }
        }
      }
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 29/06/2023
     */
    showErrorMessage() {
      const me = this
      const messages = me.errorMessages
      if (messages.length > 0) {
        me.dialogInformation = {
          isShowDialog: true,
          styleIcon: 'align-items: flex-start;',
          messages: messages,
          buttonList: [
            {
              text: 'Đóng',
              type: 'main',
              isFocus: true,
              onclick: () => {
                me.dialogInformation.isShowDialog = false
                // duyệt message để focus vào control lỗi đầu tiên
                messages.forEach((message) => {
                  // thêm class error vào control lỗi
                  this.$refs[message.field].isError = true
                  this.$refs[message.field].errorMessage = message.content
                })
                me.$nextTick(() => {
                  // focus vào control lỗi đầu tiên
                  me.focusFirstControl(me.$el.querySelector('.validate-error'))
                })
              },
            },
          ],
        }
      }
    },
    /**
     * @description: Thực hiện gọi tới api để lưu dữ liệu vào db và xử lí kết quả trả về
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 21/06/2023
     */
    async updateData() {
      const me = this
      let tempAssetItem = me.assetItem
      tempAssetItem.depreciation_rate = me.assetItem.depreciation_rate / 100
      try {
        let result = await me.$msApi.fixed_asset.updateFixedAsset(
          tempAssetItem,
          me.assetItem.fixed_asset_id
        )
        if (result.status == me.$msEnum.MS_CODE.SUCCESS) {
          return true
        }
      } catch (error) {
        console.log(error)
      }
      return false
    },

    /**
     * @description: Thực hiện gọi tới api để lưu dữ liệu vào db và xử lí kết quả trả về
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 21/06/2023
     */
    async insertData() {
      const me = this
      // gán id tài sản cho assetItem
      // me.assetItem.fixed_asset_id = me.getUuid();
      // chuyển đổi tỉ lệ HM
      me.assetItem.depreciation_rate = me.assetItem.depreciation_rate / 100
      try {
        // call api insert
        let result = await me.$msApi.fixed_asset.insertFixedAsset(me.assetItem)
        if (result.status == me.$msEnum.MS_CODE.CREATED) {
          // gán mã tài sản cho assetItem
          return result.data.data
        }
      } catch (error) {
        console.log(error)
      }
      return null
    },

    /**
     * @description: Thực hiện thao tác khi người dùng click button "hủy" trên form
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 03/05/2023
     */
    async cancelForm() {
      if (
        this.formMode == this.$msEnum.FORM_MODE.Add ||
        this.formMode == this.$msEnum.FORM_MODE.Duplicate
      ) {
        this.dialogInformation = await {
          isShowDialog: true,
          messages: [
            {
              field: '1',
              content:
                this.$msResource.DIALOG_MESSAGE.Cancel_Add.format('tài sản'),
              style: 'display: flex; flex-direction: column;',
            },
          ],
          buttonList: [
            {
              text: 'Hủy bỏ',
              type: 'main',
              isFocus: true,
              onclick: () => {
                this.dialogInformation.isShowDialog = false
                this.closeModal()
              },
            },
            {
              text: 'Không',
              type: 'outline',
              onclick: () => {
                this.dialogInformation.isShowDialog = false
                //focus vào ô đầu tiên
                document.querySelector('#fixed_asset_code').focus()
              },
            },
          ],
        }
      }
      if (this.formMode == this.$msEnum.FORM_MODE.Edit) {
        this.dialogInformation = {
          isShowDialog: true,
          messages: [
            {
              field: '1',
              content: this.$msResource.DIALOG_MESSAGE.Cancel_Edit,
              style: 'display: flex; flex-direction: column;',
            },
          ],
          buttonList: [
            {
              text: 'Lưu',
              type: 'main',
              isFocus: true,
              onclick: () => {
                this.submitForm()
              },
            },
            {
              text: 'Không lưu',
              type: 'sub',
              onclick: () => {
                this.dialogInformation.isShowDialog = false
                this.closeModal()
              },
            },
            {
              text: 'Hủy bỏ',
              type: 'outline',
              onclick: () => {
                this.dialogInformation.isShowDialog = false
                document.querySelector('#fixed_asset_code').focus()
              },
            },
          ],
        }
      }
    },
    /**
     * @description: Thực hiện validate các dữ liệu trong form khi submit
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 22/05/2023
     */
    async handleData(item) {
      const me = this
      var errors = []
      // kiểm tra độ dài mã tài sản
      if (item.fixed_asset_code == '') {
        errors.push({
          field: 'fixed_asset_code',
          content: me.$msResource.VALIDATE.Required.format('Mã tài sản'),
        })
      } else if (item.fixed_asset_code.length > 100) {
        // nếu mã tài sản dài hơn 100 ký tự
        errors.push({
          field: 'fixed_asset_code',
          content: me.$msResource.VALIDATE.MaxLength.format(' Mã tài sản', 100),
        })
      }
      let isDuplicate = await me.checkExistCode(item)
      if (!isDuplicate) {
        errors.push({
          field: 'fixed_asset_code',
          content: me.$msResource.VALIDATE.Duplicate.format(' Mã tài sản'),
        })
      }
      // kiểm tra độ dài tên tài sản
      if (item.fixed_asset_name == '') {
        // nếu tên tài sản rỗng
        errors.push({
          field: 'fixed_asset_name',
          content: me.$msResource.VALIDATE.Required.format(' Tên tài sản'),
        })
      } else if (item.fixed_asset_name.length > 255) {
        // nếu tên tài sản dài hơn 100 ký tự
        errors.push({
          field: 'fixed_asset_name',
          content: me.$msResource.VALIDATE.MaxLength.format(
            ' Tên tài sản',
            255
          ),
        })
      }
      // kiểm tra độ dài bộ phận sử dụng
      if (item.department_code == '' || item.department_code == null) {
        errors.push({
          field: 'department_code',
          content: me.$msResource.VALIDATE.Required.format(
            ' Mã bộ phận sử dụng '
          ),
        })
      } else if (item.department_code.length > 50) {
        errors.push({
          field: 'department_code',
          content: me.$msResource.VALIDATE.MaxLength.format(
            ' Mã bộ phận sử dụng ',
            20
          ),
        })
      }
      // kiểm tra độ dài ngày mua
      if (
        item.fixed_asset_category_code == '' ||
        item.fixed_asset_category_code == null
      ) {
        errors.push({
          field: 'fixed_asset_category_code',
          content: me.$msResource.VALIDATE.Required.format(' Mã Loại tài sản'),
        })
      } else if (item.fixed_asset_category_code.length > 50) {
        errors.push({
          field: 'fixed_asset_category_code',
          content: me.$msResource.VALIDATE.MaxLength.format(
            ' Mã Loại tài sản ',
            20
          ),
        })
      }

      // validate tỉ lệ HM = 1 / số năm sử dụng
      if (item.depreciation_rate / 100 != 1 / item.life_time) {
        errors.push({
          field: 'depreciation_rate',
          content: me.$msResource.VALIDATE_SERVICE.Invalid_DepreciationRate,
        })
      }
      // giá trị hao mòn năm ( = tỉ lệ HM / 100 * nguyên giá)
      if (
        (item.depreciation_rate / 100) * item.cost !=
        item.depreciation_year
      ) {
        errors.push({
          field: 'depreciation_year',
          content: me.$msResource.VALIDATE_SERVICE.Invalid_DepreciationValue,
        })
      } else {
        // làm tròn giá trị hao mòn năm về 2 chữ số thập phân
        item.depreciation_year = parseFloat(item.depreciation_year).toPrecision(
          12
        )
      }
      // kiểm tra ngày mua đúng định dạng
      if (item.purchase_date == null) {
        errors.push({
          field: 'purchase_date',
          content: me.$msResource.VALIDATE.Invalid.format(' Ngày mua'),
        })
      }
      // kiểm tra ngày mua đúng định dạng dd/mm/yyyy

      // kiểm tra ngày bắt đầu sử dụng đúng định dạng
      if (item.start_using_date == null) {
        errors.push({
          field: 'start_using_date',
          content: me.$msResource.VALIDATE.Invalid.format(' Ngày bắt đầu'),
        })
      }
      me.errorMessages = errors
    },

    /**
     * @description: Thực hiện kiểm tra mã code đã tồn tại hay chưa
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 29/06/2023
     */
    async checkExistCode(item) {
      const me = this
      try {
        const result = await me.$msApi.fixed_asset.checkDuplicateCode(
          item.fixed_asset_code,
          item.fixed_asset_id
        )
        if (result == null) return null
        else {
          return result.status == me.$msEnum.MS_CODE.SUCCESS ? true : false
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style>
@import url(@/css/components/form.css);
/* button have type = btn-selection -> tabindex = -1 */

</style>