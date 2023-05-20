<template >
  <MISAModal style="min-width: 400px; width: 1000px">
    <form action="">
      <div class="form__header">
        <div class="form__title">{{ title }}</div>
        <div class="ms-24" @click="closeModal">
          <div class="ms-icon ms-18 ms-icon-arrow-close"></div>
        </div>
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
              v-model="assetItem.fixed_asset_code"
              :isFocus="true"
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
              :min="0"
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
                :isAllowDecimal="true"
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
                :isAllowDecimal="true"
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
        <MISAButton
          ref="saveButton"
          class="button button__main"
          text="Lưu"
          @onClickButton="submitForm"
          :order="2"
        ></MISAButton>
        <MISAButton
          ref="cancelButton"
          class="button button__outline border-none"
          text="Hủy"
          @onClickButton="cancelForm"
          :order="1"
        ></MISAButton>
      </div>
    </form>
  </MISAModal>
</template>

<script>
/* eslint-disable */
import form from "@/js/form.js";
import validation from "@/js/validation";
import dataExam from "@/js/data.js";
import Enum from "@/js/enum.js";
import axios from "axios";
/* import component*/
import MISAButton from "@/components/base/MISAButton.vue";
import MISADatePicker from "@/components/base/MISADatePicker.vue";
import MISANumberPicker from "@/components/base/MISANumberPicker.vue";
import MISANumberPickerV1 from "@/components/base/MISANumberPickerV1.vue";
import MISACombobox from "@/components/base/MISACombobox.vue";
import MISAInput from "../../components/base/MISAInput.vue";
import MISAModal from "@/components/base/MISAModal.vue";
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
  },
  props: {
    asset_id: {
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
    this.getFixedAssetList();
    this.getDepartmentList();
    this.getFixedAssetCategoryList();
    if (this.asset_id) {
      this.formMode = this.$msEnum.FormMode.Edit;
      this.title = "Sửa tài sản";
      this.getFixedAssetById(this.asset_id);
    } else {
      this.formMode = this.$msEnum.FormMode.Add;
      this.title = "Thêm mới tài sản";
      // // set năm hiện tại cho trường năm theo dõi
      // this.assetItem.tracked_year = new Date().getFullYear();
      // // get current date
      // let date = new Date();
      // // set ngày mua cho trường ngày mua
      // this.assetItem.purchase_date = date;
      // // set ngày bắt đầu sử dụng cho trường ngày bắt đầu sử dụng
      // this.assetItem.start_using_date = date;
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
  data() {
    return {
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
        quantity: "", // số lượng
        cost: 0, // nguyên giá
        life_time: "", // số năm sử dụng
        depreciation_rate: 0, // tỉ lệ hao mòn
        depreciation_year: 0, // giá trị hao mòn nămfmessages
        tracked_year: "", // năm bắt đầu theo dõi
        purchase_date: "", // ngày mua
        start_using_date: "", // ngày bắt đầu sử dụng
      },
      selectedDepartment: {},
      selectedFixedAssetCategory: {},
      title: "",
      dialogInformation: {
        isShowDialog: false,
        messages: [{}],
        buttonList: [{}],
      },
      fixedAssets: [],
      departments: [],
      fixedAssetCategories: [],
      formMode: "",
    };
  },
  methods: {
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/05/2023
     */
    async getFixedAssetList() {
      const me = this;
      try {
        const result = await this.$msApi.fixed_asset.getFixedAssets();
        if (result.status == this.$msEnum.MS_CODE.SUCCESS) {
          me.fixedAssets = result.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/05/2023
     */
    async getDepartmentList() {
      const me = this;
      try {
        const result = await this.$msApi.department.getDepartments();
        if (result.status == this.$msEnum.MS_CODE.SUCCESS) {
          me.departments = result.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/05/2023
     */
    async getFixedAssetCategoryList() {
      const me = this;
      try {
        const result =
          await this.$msApi.fixed_asset_category.getFixedAssetCategories();
        if (result.status == this.$msEnum.MS_CODE.SUCCESS) {
          me.fixedAssetCategories = result.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 20/05/2023
     */
    async getFixedAssetById(id) {
      const me = this;
      try {
        const result = await this.$msApi.fixed_asset.getFixedAssetById(id);
        if (result.status == this.$msEnum.MS_CODE.SUCCESS) {
          me.assetItem = result.data;
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
        this.assetItem.department_code = department.department_code;
        this.assetItem.department_name = department.department_name;
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
     * @description: Thực hiện kiểm tra dữ liệu trước khi submit form
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 02/05/2023
     */
    async submitForm() {
      var item = this.assetItem;
      this.dialogInformation.messages = [];
      this.messages = [];
      // validate mã tài sản
      if (item.fixed_asset_code == null || item.fixed_asset_code == "") {
        this.messages.push({
          field: "fixed_asset_code",
          content: "<p>Mã tài sản không được để trống</p>",
          style: "padding: 0px 0px 4px 0px;",
        });
      } else if (!validation.isValidLength(item.fixed_asset_code, 0, 100)) {
        this.messages.push({
          field: "fixed_asset_code",
          content: "<p>Mã tài sản không được quá 100 ký tự</p>",
          style: "padding:  0px 0px 4px 0px;",
        });
      }
      // Trường hợp form là form add thì phải kiểm tra mã tài sản có trùng hay không
      if (Enum.FormMode.Add) {
        // kiểm tra mã tài sản trùng hay không
        if (form.getFixedAsset(item.fixed_asset_code) != null) {
          this.messages.push({
            field: "fixed_asset_code",
            content: "<p>Mã tài sản đã tồn tại</p>",
            style: "padding:  0px 0px 4px 0px;",
          });
        }
      } else if (Enum.FormMode.Edit) {
        if (form.getFixedAsset(item.fixed_asset_code) != null) {
          this.messages.push({
            field: "fixed_asset_code",
            content: "<p>Không được phép sửa mã trùng với mã tài sản khác</p>",
            style: "padding:  0px 0px 4px 0px;",
          });
        }
      }
      // validate tên tài sản
      if (item.fixed_asset_name == null || item.fixed_asset_name == "") {
        this.messages.push({
          field: "fixed_asset_name",
          content: "<p>Tên tài sản không được để trống</p>",
          style: "padding:  0px 0px 4px 0px;",
        });
      } else if (!validation.isValidLength(item.fixed_asset_name, 0, 255)) {
        this.messages.push({
          field: "fixed_asset_name",
          content: "<p>Tên tài sản không được quá 255 ký tự</p>",
          style: "padding: 0px 0px 4px 0px;",
        });
      }

      // validate mã bộ phận
      let departmentItem = this.departments.find(
        (x) => x.department_code == item.department_code
      );
      if (departmentItem == null) {
        this.messages.push({
          field: "department_code",
          content: "<p>Mã bộ phận không tồn tại</p>",
          style: "padding: 0px 0px 4px 0px;",
        });
      } else {
        if (departmentItem.department_name != item.department_name) {
          this.messages.push({
            field: "department_name",
            content: "<p>Tên bộ phận không đúng với mã bộ phận</p>",
            style: "padding: 0px 0px 4px 0px;",
          });
        }
      }

      // //validate mã loại tài sản
      let fixedAssetCategoryItem = this.fixedAssetCategories.find(
        (x) => x.fixed_asset_category_code == item.fixed_asset_category_code
      );
      if (fixedAssetCategoryItem == null) {
        this.messages.push({
          field: "fixed_asset_category_code",
          content: "<p>Mã loại tài sản không tồn tại</p>",
          style: "padding: 0px 0px 4px 0px;",
        });
      } else {
        if (
          fixedAssetCategoryItem.fixed_asset_category_name !=
          item.fixed_asset_category_name
        ) {
          this.messages.push({
            field: "fixed_asset_category_name",
            content: "<p>Tên loại tài sản không đúng với mã loại tài sản</p>",
            style: "padding: 0px 0px 4px 0px;",
          });
        }
      }

      // validate quantity ( chưa có rule gì do format hết r)

      // nguyên giá ( chưa có rule gì do format hết r)

      // số năm sử dụng ( chưa có rule gì do format hết r)

      // tỉ lệ hao mòn (tỉ lệ HM / 100 = 1/ số năm sử dụng)
      if (item.depreciation_rate / 100 != 1 / item.life_time) {
        this.messages.push({
          field: "depreciation_rate",
          content: "<p>Tỉ lệ hao mòn phải bằng 1 / số năm sử dụng</p>",
          style: "padding: 0px 0px 4px 0px;",
        });
      }
      // giá trị hao mòn năm ( = tỉ lệ HM / 100 * nguyên giá)
      if (
        (item.depreciation_rate / 100) * item.cost !=
        item.depreciation_year
      ) {
        this.messages.push({
          field: "depreciation_year_value",
          content:
            "<p>Giá trị hao mòn năm phải bằng tỉ lệ HM / 100 * nguyên giá</p>",
          style: "padding: 0px 0px 4px 0px;",
        });
      }

      // validate ngày mua và ngày bắt đầu sử dụng
      if (this.messages.length > 0) {
        this.dialogInformation = {
          ...this.dialogInformation,
          isShowDialog: true,
          messages: this.messages,
          buttonList: [
            {
              text: "Đóng",
              buttonClass: "button button__main",
              isFocus: true,
              onclick: () => {
                this.dialogInformation.isShowDialog = false;
                //CHƯA FOCUS ĐƯỢC Ô ĐẦU TIÊN
                document.querySelector(`#${this.messages[0].field}`).focus();
                for (let index = 0; index < this.messages.length; index++) {
                  this.$refs[this.messages[index].field].isError = true;
                  this.$refs[this.messages[index].field].errorMessage =
                    this.messages[index].content;
                }
              },
            },
          ],
        };
        this.$emit("show-dialog", this.dialogInformation);
      } else {
        // show popup trong 500ms
        this.closeModal();
        if (Enum.FormMode.Add) {
          console.log("add");
          //create new guid
          this.assetItem.fixed_asset_id =
            "7b01963d-2bc0-5b15-82c3-d3ede7a72094";

          var res = await this.$msAxios.post(
            "http://localhost:8080/api/v1/FixedAsset",
            this.assetItem
          );
          console.log(res);
          this.isLoading = true;
          setTimeout(async () => {
            this.fixedAssets = await this.$msAxios.get(
              "http://localhost:8080/api/v1/FixedAsset/fixed-assets"
            );
            this.isLoading = false;
            this.$emit("show-popup", "Lưu dữ liệu thành công", "success");
          }, 1000);
        } else if (Enum.FormMode.Edit) {
          console.log("edit");
          // call api chỉnh sửa dữ liệu
          this.$emit("show-popup", "Chỉnh sửa dữ liệu thành công", "success");
        }
      }
    },

    /**
     * @description: Thực hiện thao tác khi người dùng click button "hủy" trên form
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 03/05/2023
     */
    cancelForm() {
      if (Enum.FormMode == 1) {
        this.dialogInformation = {
          ...this.dialogInformation,
          isShowDialog: true,
          messages: [
            {
              field: "1",
              content: "<p>Bạn có muốn hủy bỏ khai báo tài sản này? </p>",
              style: "",
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
        this.$emit("show-dialog", this.dialogInformation);
      }
      if (Enum.FormMode == 2) {
        this.dialogInformation = {
          ...this.dialogInformation,
          isShowDialog: true,
          messages: [
            {
              field: "1",
              content:
                "<p>Thông tin thay đổi sẽ không được cập nhật nếu bạn <br> không lưu. Bạn có muốn lưu các thay đổi này? </p>",
              style: "",
            },
          ],
          buttonList: [
            {
              text: "Lưu",
              buttonClass: "button button__main",
              isFocus: true,
              onclick: () => {
                this.dialogInformation.isShowDialog = false;
                this.closeModal();
                this.$emit("show-popup", "Sửa tài sản thành công", "success");
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
        this.$emit("show-dialog", this.dialogInformation);
      }
    },
  },
};
</script>

<style>
@import url(@/css/components/form.css);
</style>