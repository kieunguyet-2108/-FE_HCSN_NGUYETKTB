<template >
  <div>
    <div>
      <MISAModal
        @keydown.esc="cancelForm"
        style="min-width: 1000px; width: 1000px"
      >
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
                  :maxLength="10"
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
                  className="input__field text-style-italic"
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
                  inputClass="input__field text-style-italic"
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
                  placeholder="Tên bộ phận sử dụng"
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
                  inputClass="input__field text-style-italic"
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
                  placeholder="Tên loại tài sản"
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
                class="button button__main"
                text="Lưu"
                @onClickButton="submitForm"
                :order="2"
              ></MISAButton>
            </MISATooltipV1>
            <MISATooltipV1 content="Esc">
              <MISAButton
                ref="cancelButton"
                class="button button__outline border-none"
                text="Hủy"
                @onClickButton="cancelForm"
                :order="1"
              ></MISAButton>
            </MISATooltipV1>
          </div>
        </form>
      </MISAModal>
      <MISALoading v-if="isLoading"></MISALoading>
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
import moment from "moment"; // gọi moment để format date
import validation from "@/js/validation";
import Enum from "@/js/enum.js";
/* import component*/
import MISAButton from "@/components/base/MISAButton.vue";
import MISADatePicker from "@/components/base/MISADatePicker.vue";
import MISANumberPicker from "@/components/base/MISANumberPicker.vue";
import MISANumberPickerV1 from "@/components/base/MISANumberPickerV1.vue";
import MISACombobox from "@/components/base/MISACombobox.vue";
import MISAInput from "../../components/base/MISAInput.vue";
import MISAModal from "@/components/base/MISAModal.vue";
import MISADialog from "@/components/base/MISADialog.vue";
import MISATooltipV1 from "@/components/base/MISATooltipV1.vue";
import MISAPopup from "@/components/base/MISAPopup.vue";
export default {
  name: "AssetForm",
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
    this.getDepartmentList();
    this.getFixedAssetCategoryList();
    // get current date
    var date = new Date();
    if (this.asset_id != null) {
      this.formMode = this.$msEnum.FormMode.Edit;
      this.title = "Sửa tài sản";
      this.isLoading = true;
      this.assetItem = await this.getFixedAssetById(this.asset_id);
      this.assetItem.depreciation_rate = this.assetItem.depreciation_rate * 100;
      this.isLoading = false;
    }
    if (this.asset_id == null) {
      this.formMode = this.$msEnum.FormMode.Add;
      this.title = "Thêm mới tài sản";
      // set năm hiện tại cho trường năm theo dõi
      this.assetItem.tracked_year = new Date().getFullYear();
      // set ngày mua cho trường ngày mua
      this.assetItem.purchase_date = date;
      // set ngày bắt đầu sử dụng cho trường ngày bắt đầu sử dụng
      this.assetItem.start_using_date = date;
      this.assetItem.created_date = date;
      this.assetItem.modified_date = date;
      // tự sinh mã : CHƯA LÀM
      this.isLoading = true;
      this.assetItem.fixed_asset_code = await this.getNewCode();
      this.isLoading = false;
    }
    if (this.duplicate_id != null) {
      this.formMode == this.$msEnum.FormMode.Duplicate;
      this.title = "Nhân bản tài sản";
      this.isLoading = true;
      this.assetItem = await this.getFixedAssetById(this.duplicate_id);
      this.assetItem.fixed_asset_code = await this.getNewCode();
      this.assetItem.depreciation_rate = this.assetItem.depreciation_rate * 100;
      this.isLoading = false;
    }
  },
  computed: {
    // tính toán giá trị hao mòn năm
    depreciationYear: {
      get() {
        let a = validation.convertStringToNumber(this.assetItem.cost);
        let b = validation.convertStringToNumber(
          this.assetItem.depreciation_rate
        );
        let result = a * (b / 100);
        this.assetItem.depreciation_year = result;
        return result;
      },
      set(value) {
        this.assetItem.depreciation_year = value;
      },
    },
  },
  mounted() {
    window.addEventListener("keydown", this.handleEvent);
  },
  data() {
    return {
      formMode: 0,
      isLoading: false,
      assetItem: {
        fixed_asset_id: "", // id tài sản
        fixed_asset_code: "", // mã tài sản
        fixed_asset_name: "", // tên tài sản
        fixed_asset_category_id: "", // id loại tài sản
        fixed_asset_category_code: "", // mã loại tài sản
        fixed_asset_category_name: "", // tên loại tài sản
        department_id: "", // id bộ phận sử dụng
        department_code: "", // mã bộ phận sử dụng
        department_name: "", // tên bộ phận sử dụng
        quantity: 1, // số lượng
        cost: 0, // nguyên giá
        life_time: "", // số năm sử dụng
        depreciation_rate: 0, // tỉ lệ hao mòn
        depreciation_year: 0, // giá trị hao mòn nămfmessages
        tracked_year: "", // năm bắt đầu theo dõi
        purchase_date: "", // ngày mua
        start_using_date: "", // ngày bắt đầu sử dụng
        created_date: "",
        modified_date: "",
      },
      // phòng ban được chọn
      selectedDepartment: {},
      // loại tài sản được chọn
      selectedFixedAssetCategory: {},
      // tiêu đề của form
      title: "",
      // thông tin dialog hiển thị khi có sự kiện trong form
      dialogInformation: {},
      // danh sách tài sản
      fixedAssets: [],
      // danh sách phòng ban
      departments: [],
      // danh sách loại tài sản
      fixedAssetCategories: [],
      popupInformation: {}, // thông tin popup
    };
  },
  methods: {
    /**
     * @description: Hàm xử lí phím tắt
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 01/06/2023
     */
    handleEvent(event) {
      const me = this;
      // Nếu nhấn phím Ctrl
      if (event.ctrlKey) {
        switch (event.keyCode) {
          case me.$msEnum.KeyCode.Save: // Ctrl + S: lưu và đóng form
            event.preventDefault();
            me.submitForm(); // thực hiện validate -> lưu dữ liệu -> đóng form
            break;
          default:
            break;
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
      this.popupInformation.isShowPopup = true;
      this.popupInformation.popupMessage = message;
      this.popupInformation.popupMode = popupMode;
      setTimeout(() => {
        this.popupInformation.isShowPopup = false;
      }, 3000);
    },
    /**
     * @description: Hàm này dùng để lấy ra mã tài sản mới
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 29/05/2023
     */
    async getNewCode() {
      const me = this;
      try {
        const result = await this.$msApi.fixed_asset.getNewAssetCode();
        if (result.data.msCode == this.$msEnum.MS_CODE.SUCCESS) {
          return result.data.data;
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description: Lấy ra thông tin tài sản theo id và code
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 31/05/2023
     */
    async getFixedAssetByCode(code, id = null) {
      const me = this;
      try {
        const result = await me.$msApi.fixed_asset.getAssetByCode(code, id);
        if (result.data.msCode == me.$msEnum.MS_CODE.SUCCESS) {
          return result.data.data;
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description: Hàm này dùng để lấy thông tin tài sản theo id
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/05/2023
     */
    async getDepartmentList() {
      const me = this;
      try {
        const result = await this.$msApi.department.getDepartments();
        if (result.data.msCode == this.$msEnum.MS_CODE.SUCCESS) {
          me.departments = result.data.data;
        } else {
          me.departments = [];
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description: Hàm này dùng để lấy thông tin phòng ban theo id
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 31/05/2023
     */
    async getDepartmentById(id) {
      const me = this;
      try {
        const result = await this.$msApi.department.getDepartmentById(id);
        if (result.data.msCode == this.$msEnum.MS_CODE.SUCCESS) {
          return result.data.data;
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description: Hàm này dùng để lấy danh sách loại tài sản
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/05/2023
     */
    async getFixedAssetCategoryList() {
      const me = this;
      try {
        const result =
          await this.$msApi.fixed_asset_category.getFixedAssetCategories();
        if (result.data.msCode == this.$msEnum.MS_CODE.SUCCESS) {
          me.fixedAssetCategories = result.data.data;
        } else {
          me.fixedAssetCategories = [];
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description: Hàm này dùng để lấy thông tin loại tài sản theo id
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 31/05/2023
     */
    async getFixedAssetCategoryById(id) {
      const me = this;
      try {
        const result =
          await this.$msApi.fixed_asset_category.getFixedAssetCategoryById(id);
        if (result.data.msCode == this.$msEnum.MS_CODE.SUCCESS) {
          return result.data.data;
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description: Hàm này dùng để lấy thông tin tài sản theo id
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 20/05/2023
     */
    async getFixedAssetById(id) {
      const me = this;
      try {
        const result = await this.$msApi.fixed_asset.getFixedAssetById(id);
        if (result.data.msCode == this.$msEnum.MS_CODE.SUCCESS) {
          return result.data.data;
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description: Hàm này dùng để unfocus control đang focus trong form
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/05/2023
     */
    processUnfocusLastControl(e, fn) {
      if (e.which === 13 && e.target == document.activeElement) return;
      if (e.which === 9 && !e.shiftKey) {
        let cur = e.target;
        let els = e.currentTarget.querySelectorAll("*");
        var flag = true;
        for (let i = 0; i < els.length; i++) {
          if (els[i] === cur) {
            flag = false;
            continue;
          }
          if (flag) {
            continue;
          }
          els[i].focus();
          if (els[i] === document.activeElement) {
            e.preventDefault();
            return;
          }
        }
      }
      e.preventDefault();
      fn();
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
        ].join(", ");
      const items = obj.querySelectorAll(selector);
      if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].offsetParent !== null) {
            items[i].focus();
            return items[i];
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
        const me = this;
        me.$nextTick(() => {
          let input;
          if (
            scope.type === "text" ||
            (scope.hasAttribute &&
              scope.hasAttribute("type") &&
              scope.getAttribute("type") === "text")
          ) {
            input = scope;
          } else {
            input = this.getFirstControlFocus(scope);
          }
          if (input) {
            input.focus();
          }
        });
      }
    },
    /**
     * @description: Hàm này thực hiện các xử lí khi người dùng nhấn phím tab ở control cuối cùng trong form
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/05/2023
     */
    footerKeydown(e) {
      const me = this;
      if (e.keyCode == me.$msEnum.KeyCode.Tab) {
        this.processUnfocusLastControl(e, () => {
          me.focusFirstControl(me.$el);
        });
      }
    },
    /**
     * @description: Đóng modal form bằng cách chuyển về trang asset
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 01/05/2023
     */
    closeModal() {
      this.$router.push("/asset");
    },
    /**
     * @description: Thực hiện update các thông tin của bộ phận sử dụng
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 02/05/2023
     */
    updateDepartment(department) {
      if (department) {
        this.assetItem.department_id = department.department_id;
        this.assetItem.department_name = department.department_name;
        this.assetItem.department_code = department.department_code;
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
          fixedAssetCategory.fixed_asset_category_id;
        this.assetItem.fixed_asset_category_code =
          fixedAssetCategory.fixed_asset_category_code;
        this.assetItem.fixed_asset_category_name =
          fixedAssetCategory.fixed_asset_category_name;
        this.assetItem.depreciation_rate = fixedAssetCategory.depreciation_rate;
        this.assetItem.life_time = fixedAssetCategory.life_time;
      }
    },
    /**
     * @description: Tạo mới mã uuid
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 24/05/2023
     */
    getUuid() {
      var temp_url = URL.createObjectURL(new Blob());
      var uuid = temp_url.toString();
      URL.revokeObjectURL(temp_url);
      return uuid.substr(uuid.lastIndexOf("/") + 1);
    },

    /**
     * @description: Thực hiện kiểm tra dữ liệu trước khi submit form
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 02/05/2023
     */
    async submitForm() {
      const me = this;
      var item = this.assetItem;
      me.messages = await me.handleData(item);
      // nếu có lỗi thì hiển thị message lỗi cho người dùng
      if (me.messages.length > 0) {
        me.dialogInformation = {
          isShowDialog: true,
          styleIcon: "align-items: flex-start;",
          messages: me.messages,
          buttonList: [
            {
              text: "Đóng",
              buttonClass: "button button__main",
              isFocus: true,
              onclick: () => {
                me.dialogInformation.isShowDialog = false;
                // duyệt message để focus vào control lỗi đầu tiên
                me.messages.forEach((message) => {
                  // thêm class error vào control lỗi
                  this.$refs[message.field].isError = true;
                  this.$refs[message.field].errorMessage = message.content;
                });
                me.$nextTick(() => {
                  // focus vào control lỗi đầu tiên
                  me.focusFirstControl(me.$el.querySelector(".validate-error"));
                });
              },
            },
          ],
        };
      }
      // nếu không có lỗi sẽ thực hiện call api
      if (me.messages.length == 0) {
        // TH1: nếu formMode là add thì thực hiện insert
        if (
          me.formMode == Enum.FormMode.Add ||
          me.formMode == Enum.FormMode.Duplicate
        ) {
          // tạo mới mã guid cho tài sản
          me.assetItem.fixed_asset_id = me.getUuid();
          // chuyển đổi tỉ lệ HM
          me.assetItem.depreciation_rate = me.assetItem.depreciation_rate / 100;
          try {
            // call api insert
            let result = await me.$msApi.fixed_asset.insertFixedAsset(
              me.assetItem
            );
            if (result.data.msCode == me.$msEnum.MS_CODE.CREATED) {
              // gán mã tài sản cho assetItem
              me.assetItem.fixed_asset_id = result.data.data;
              // emit dữ liệu về component cha xong bắn ra msg
              me.$emit("insertAsset", me.assetItem);
              me.closeModal();
            } else {
              me.$emit("insertAsset", null);
              me.closeModal();
            }
          } catch (error) {
            console.log(error);
          }
        }
        // TH2: nếu formMode là edit thì thực hiện update
        if (me.formMode == Enum.FormMode.Edit) {
          let date = new Date();
          // call api update
          let tempAssetItem = me.assetItem;
          tempAssetItem.modified_date = date;
          tempAssetItem.depreciation_rate =
            me.assetItem.depreciation_rate / 100;
          try {
            let result = await me.$msApi.fixed_asset.updateFixedAsset(
              tempAssetItem,
              me.assetItem.fixed_asset_id
            );
            if (result.data.msCode == me.$msEnum.MS_CODE.SUCCESS) {
              me.$emit(
                "updateAsset",
                result.data.userMsg,
                me.$msEnum.MS_POPUP_MODE.Success,
                me.assetItem
              );
            } else {
              me.$emit(
                "updateAsset",
                result.data.userMsg,
                me.$msEnum.MS_POPUP_MODE.Error,
                me.assetItem
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    },
    /**
     * @description: Thực hiện thao tác khi người dùng click button "hủy" trên form
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 03/05/2023
     */
    async cancelForm() {
      if (
        this.formMode == Enum.FormMode.Add ||
        this.formMode == Enum.FormMode.Duplicate
      ) {
        this.dialogInformation = await {
          isShowDialog: true,
          messages: [
            {
              field: "1",
              content: this.$msEnum.MS_MESSAGE.MS_MSG_CANCEL_ADD,
              style: "display: flex; flex-direction: column;",
            },
          ],
          buttonList: [
            {
              text: "Hủy bỏ",
              buttonClass: "button button__main",
              isFocus: true,
              onclick: () => {
                this.dialogInformation.isShowDialog = false;
                this.closeModal();
              },
            },
            {
              text: "Không",
              buttonClass: "button button__outline",
              onclick: () => {
                this.dialogInformation.isShowDialog = false;
                //focus vào ô đầu tiên
                document.querySelector("#fixed_asset_code").focus();
              },
            },
          ],
        };
      }
      if (this.formMode == Enum.FormMode.Edit) {
        this.dialogInformation = {
          isShowDialog: true,
          messages: [
            {
              field: "1",
              content: this.$msEnum.MS_MESSAGE.MS_MSG_CANCEL_EDIT,
              style: "display: flex; flex-direction: column;",
            },
          ],
          buttonList: [
            {
              text: "Lưu",
              buttonClass: "button button__main",
              isFocus: true,
              onclick: () => {
                this.submitForm();
              },
            },
            {
              text: "Không lưu",
              buttonClass: "button button__sub",
              onclick: () => {
                this.dialogInformation.isShowDialog = false;
                this.closeModal();
              },
            },
            {
              text: "Hủy bỏ",
              buttonClass: "button button__outline",
              onclick: () => {
                this.dialogInformation.isShowDialog = false;
                document.querySelector("#fixed_asset_code").focus();
              },
            },
          ],
        };
      }
      console.log(this.dialogInformation);
    },
    /**
     * @description: Thực hiện validate các dữ liệu trong form khi submit
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 22/05/2023
     */
    async handleData(item) {
      const me = this;
      var errors = [];
      // validate trùng mã tài sản
      // validate fixassetcode
      if (item.fixed_asset_code == "") {
        // nếu mã tài sản rỗng
        errors.push({
          field: "fixed_asset_code",
          content: me.$msEnum.MS_VALIDATE_MSG.REQUIRED.format("Mã tài sản"),
          style: "margin-left: 10px;",
        });
      } else if (item.fixed_asset_code.length > 100) {
        // nếu mã tài sản dài hơn 100 ký tự
        errors.push({
          field: "fixed_asset_code",
          content: me.$msEnum.MS_VALIDATE_MSG.MAX_LENGTH.format(
            " Mã tài sản",
            100
          ),
          style: "margin-left: 10px;",
        });
      }
      // validate trùng mã tài sản
      var isDuplicate = await me.checkDuplicateCode(item);
      if (isDuplicate) {
        errors.push({
          field: "fixed_asset_code",
          content: me.$msEnum.MS_VALIDATE_MSG.DUPLICATE.format(" Mã tài sản"),
          style: "margin-left: 10px;",
        });
      }
      // validate tên tài sản
      if (item.fixed_asset_name == "") {
        // nếu tên tài sản rỗng
        errors.push({
          field: "fixed_asset_name",
          content: me.$msEnum.MS_VALIDATE_MSG.REQUIRED.format(" Tên tài sản"),
          style: "margin-left: 10px;",
        });
      } else if (item.fixed_asset_name.length > 255) {
        // nếu tên tài sản dài hơn 100 ký tự
        errors.push({
          field: "fixed_asset_name",
          content: me.$msEnum.MS_VALIDATE_MSG.MAX_LENGTH.format(
            " Tên tài sản",
            255
          ),
          style: "margin-left: 10px;",
        });
      }

      // thực hiện lấy department theo id
      let departmentItem = await me.getDepartmentById(item.department_id);
      // TH1: Nếu không có bộ phận chứng tỏ người dùng chưa chọn hoặc chọn sai
      if (departmentItem == null) {
        errors.push({
          field: "department_code",
          content: me.$msEnum.MS_VALIDATE_MSG.INVALID.format(" Mã bộ phận"),
          style: "margin-left: 10px;",
        });
      }
      // TH2: Nếu có bộ phận thì kiểm tra xem bộ phận đó có trùng với bộ phận đã chọn hay không
      else if (departmentItem.department_name != item.department_name) {
        errors.push({
          field: "department_code",
          content: me.$msEnum.MS_VALIDATE_MSG.INVALID.format(" Tên bộ phận"),
          style: "margin-left: 10px;",
        });
      }

      // thực hiện lấy loại tài sản theo id
      let categoryItem = await me.getFixedAssetCategoryById(
        item.fixed_asset_category_id
      );
      // TH1: Nếu không có loại tài sản chứng tỏ người dùng chưa chọn hoặc chọn sai
      if (categoryItem == null) {
        errors.push({
          field: "fixed_asset_category_code",
          content:
            me.$msEnum.MS_VALIDATE_MSG.INVALID.format(" Mã loại tài sản"),
          style: "margin-left: 10px;",
        });
      }
      // TH2: Nếu có loại tài sản thì kiểm tra xem loại tài sản đó có trùng với loại tài sản đã chọn hay không
      else if (
        categoryItem.fixed_asset_category_name != item.fixed_asset_category_name
      ) {
        errors.push({
          field: "fixed_asset_category_code",
          content:
            me.$msEnum.MS_VALIDATE_MSG.INVALID.format(" Tên loại tài sản"),
          style: "margin-left: 10px;",
        });
      }

      // validate tỉ lệ HM = 1 / số năm sử dụng
      if (item.depreciation_rate / 100 != 1 / item.life_time) {
        errors.push({
          field: "depreciation_rate",
          content: "Tỉ lệ hao mòn phải bằng 1 / số năm sử dụng.",
          style: "margin-left: 10px;",
        });
      }
      // giá trị hao mòn năm ( = tỉ lệ HM / 100 * nguyên giá)
      if (
        (item.depreciation_rate / 100) * item.cost !=
        item.depreciation_year
      ) {
        errors.push({
          field: "depreciation_year",
          content: "Giá trị HM năm phải bằng tỉ lệ HM*nguyên giá.",
          style: "margin-left: 10px;",
        });
      } else {
        // làm tròn giá trị hao mòn năm về 2 chữ số thập phân
        item.depreciation_year = parseFloat(item.depreciation_year).toPrecision(
          12
        );
      }
      return errors;
    },
    /**
     * @description: Hàm thực hiện kiểm tra mã code trùng
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 28/05/2023
     */
    async checkDuplicateCode(item) {
      const me = this;
      var itemDuplicate = await me.getFixedAssetByCode(
        item.fixed_asset_code,
        item.fixed_asset_id
      );
      if (itemDuplicate != null) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
@import url(@/css/components/form.css);
</style>