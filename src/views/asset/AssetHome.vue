<template>
  <div class="content">
    <div class="content-top">
      <div class="filter">
        <div class="filter__search--input">
          <div class="ms-36">
            <div class="ms-icon ms-22 ms-icon-search-black"></div>
          </div>
          <MISAInput
            type="text"
            placeholder="Tìm kiếm tài sản"
            className="input__field text-style-italic"
            :isValidate="false"
            v-model="filter[0].value"
          ></MISAInput>
        </div>
        <MISACombobox
          iconLeft="ms-18 ms-icon-filter"
          iconRight="ms-8 ms-icon-arrow-down-bold"
          inputType="text"
          inputClass="input__field"
          inputPlaceholder="Loại tài sản"
          id="department_code-filter"
          name="department_code-filter"
          primaryKey="fixed_asset_category_id"
          v-model="filter[2].value"
          :data="fixedAssetCategories"
          :column="fixedAssetCategoryColumns"
          @clickIcon="handleData"
        ></MISACombobox>
        <MISACombobox
          iconLeft="ms-18 ms-icon-filter"
          iconRight="ms-8 ms-icon-arrow-down-bold"
          inputType="text"
          inputClass="input__field"
          inputPlaceholder="Bộ phận sử dụng"
          primary-key="department_id"
          v-model="filter[1].value"
          :data="departments"
          :column="departmentColumns"
          @clickIcon="handleData"
        ></MISACombobox>
        <!-- <MISANumberPicker inputType="text" inputPlaceholder="Số lượng" inputClass="input__field"></MISANumberPicker> -->
      </div>
      <div class="data-action">
        <MISAButton
          class="button button__main"
          text="Thêm tài sản"
          icon="ms-icon-plus ms-8"
          @click="showFormModal"
        ></MISAButton>
        <div class="action-item flex column tooltip">
          <MISATooltipV1 content="Xuất">
            <MISAButton
              class="button__icon ms-36"
              icon="ms-icon-excel ms-24"
              @click="onClickExport"
            ></MISAButton>
          </MISATooltipV1>
        </div>
        <div class="action-item flex column tooltip">
          <MISATooltipV1 content="Xóa">
            <MISAButton
              ref="deleteButton"
              class="button__icon ms-36"
              icon="ms-icon-trash-red ms-24"
              @click="onClickDelete"
              :disabled="selectedItems.length === 0 ? true : false"
            ></MISAButton>
          </MISATooltipV1>
        </div>
      </div>
    </div>
    <div class="content-bottom">
      <MISATable
        :listData="fixedAssets"
        :listColumn="tableColumns"
        v-model="selectedItems"
        @dblClick="handleDblClickRow"
        @edit="handleEditRow"
      ></MISATable>
      <MISAPagination @changePaging="getFixedAssetByPaging"></MISAPagination>
    </div>
    <router-view
      :departmentColumns="departmentColumns"
      :fixedAssetCategoryColumns="fixedAssetCategoryColumns"
      @show-dialog="showDialog"
      @show-popup="showPopup"
    ></router-view>
    <MISAPopup
      :popupMessage="popupInformation.popupMessage"
      v-if="popupInformation.isShowPopup"
    ></MISAPopup>
    <MISADialog
      ref="dialog"
      v-if="dialogInformation.isShowDialog"
      :dialogMessages="dialogInformation.messages"
      :buttonList="dialogInformation.buttonList"
    ></MISADialog>
    <ShortcutGuide :isShowShortcutGuide="isShowShortcutGuide"></ShortcutGuide>
    <MISALoading v-if="isLoading"></MISALoading>
  </div>
</template>
<script>
/* eslint-disable */
// script file
import dialog from "@/js/dialog.js";
import Enum from "@/js/enum.js";
import column from "@/js/column.js";
// import form from "@/js/form.js";
import MISADialog from "@/components/base/MISADialog.vue";
import dataExample from "@/js/data.js";

// component
import MISAPagination from "@/components/base/MISAPagination.vue";
import MISALoading from "@/components/base/MISALoading.vue";
import MISAPopup from "@/components/base/MISAPopup.vue";
import MISAButton from "@/components/base/MISAButton.vue";
import MISATooltip from "@/components/base/MISATooltip.vue";
import MISAInput from "@/components/base/MISAInput.vue";
import MISACombobox from "@/components/base/MISACombobox.vue";
import MISATable from "@/components/base/MISATable.vue";
export default {
  name: "AssetHome",
  components: {
    MISAButton,
    MISATooltip,
    MISAInput,
    MISACombobox,
    MISATable,
    MISAPopup,
    MISADialog,
    MISALoading,
    MISAPagination,
  },
  created() {
    this.getFixedAssetList();
    this.getDepartmentList();
    this.getFixedAssetCategoryList();
    this.loadData();
    this.fixedAssetCategoryColumns = column.fixedAssetCategoryColumns;
    this.departmentColumns = column.departmentColumns;
    this.tableColumns = column.tableColumns;
  },
  data() {
    return {
      selectedDepartment: {},
      selectedFixedAssetCategory: {},
      isShowShortcutGuide: false,
      isLoading: false,
      selectedItems: [],
      fixedAssets: [],
      departments: [],
      fixedAssetCategories: [],
      departmentColumns: [],
      fixedAssetCategoryColumns: [],
      tableColumns: [],
      dialogInformation: {
        isShowDialog: false,
        messages: [{}],
        buttonList: [{}],
      },
      popupInformation: {
        isShowPopup: false,
        popupMessage: "",
        popupType: "",
      },
      pagination: {
        page: 1,
        pageSize: 15,
        totalRecord: 0,
        totalPage: 0,
      },
      filter: [
        {
          field: "fixed_asset_name",
          value: "",
          operator: this.$msEnum.MS_FILTER_OPERATOR.Like,
        },
        {
          field: "department_id",
          value: "",
          operator: this.$msEnum.MS_FILTER_OPERATOR.Equal,
        },
        {
          field: "fixed_asset_category_id",
          value: "",
          operator: this.$msEnum.MS_FILTER_OPERATOR.Equal,
        },
      ],
    };
  },
  mounted() {
    //focus vào content
    this.listSelected = [
      {
        fixed_asset_id: "2",
        fixed_asset_code: "TS00002",
        fixed_asset_name: "Máy in HP",
        fixed_asset_category_id: "3",
        fixed_asset_category_code: "MS3",
        fixed_asset_category_name: "Máy in",
        department_id: "2",
        department_code: "PB002",
        department_name: "Phòng nhân sự",
        quantity: "1",
        cost: "10.000.000",
        depreciation_rate: "20",
        remaining_amount: "8.800.000",
        depreciation_year: "1.200.000",
        life_time: "6",
        tracked_year: "2023",
        purchased_date: "18/04/2023",
        depreciation_start_date: "18/04/2023",
      },
    ];
  },
  methods: {
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 21/05/2023
     */
    async getFixedAssetByPaging(pageNumber, pageSize) {
      const me = this;
      // duyệt qua các phần tử trong  filterInfor để lấy ra các tham số cần thiết
      try {
        const rs = await this.$msApi.fixed_asset.getListByPagination(
          pageNumber,
          pageSize,
          me.filter
        );
      } catch (error) {}
    },
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
     * @author: NguyetKTB 22/05/2023
     */
    async deleteFixedAsset() {
      const me = this;
      try {
        const result = await this.$msApi.fixed_asset.deleteFixedAsset(
          me.selectedItems
        );
        console.log(result);
      } catch (error) {
        
      }
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/05/2023
     */
    handleDblClickRow(dataRow) {
      this.$router.push(`/asset/${dataRow.fixed_asset_id}`);
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/05/2023
     */
    handleEditRow(dataRow) {
      this.$router.push(`/asset/${dataRow.fixed_asset_id}`);
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 05/05/2023
     */
    loadData() {
      this.isLoading = true;
      // set time out 1s để tắt loading
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    /**
     * @description: Thực hiện show form thêm mới tài sản
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 04/05/2023
     */
    showFormModal() {
      this.$router.push("/asset/add");
    },

    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 05/05/2023
     */
    hideModal() {
      this.$router.push("/asset");
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 05/05/2023
     */
    showDialog(dialogInformation) {
      this.dialogInformation = dialogInformation;
    },

    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 05/05/2023
     */
    buttonMainOnclick() {
      if (Enum.FormMode == 1) {
        this.dialogInformation.isShowDialog = false;
        this.$refs.dialog.showDialog({});
        this.hideModal();
      } else if (Enum.FormMode == 2) {
        this.dialogInformation.isShowDialog = false;
        this.hideModal();
        this.showPopup("Chỉnh sửa dữ liệu thành công", "success");
      }
    },

    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 05/05/2023
     */
    buttonOutlineOnClick() {
      if (Enum.FormMode == 1) {
        this.dialogInformation.isShowDialog = false;
      } else if (Enum.FormMode == 2) {
        this.dialogInformation.isShowDialog = false;
      }
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 05/05/2023
     */
    buttonSubOnclick() {
      if (Enum.FormMode == 2) {
        this.dialogInformation.isShowDialog = false;
        this.hideModal();
      }
    },
    async onClickExport() {
      this.$msDialog.dialogOneButton(
        "Xuất dữ liệu",
        "Xuất dữ liệu thành công",
        "success"
      );
    },

    /**
     * @description: Thực hiện show popup
     * @param: {message, popupCase}: message: nội dung popup, popupCase: trạng thái popup
     * @return: {any}
     * @author: NguyetKTB 04/05/2023
     */
    showPopup(message, popupType) {
      this.popupInformation.isShowPopup = true;
      this.popupInformation.popupMessage = message;
      this.popupInformation.popupType = popupType;
      setTimeout(() => {
        this.popupInformation.isShowPopup = false;
      }, 2000);
    },

    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 05/05/2023
     */
    async onClickDelete(event) {
      let formatted = "Hello {0}! Welcome to {1}.".format("John", "New York");
      console.log(formatted);
      // kiểm tra trường hợp chưa chọn bản ghi nào
      if (this.selectedItems.length == 0) {
        event.preventDefault();
        // disable button xóa
      } else if (this.selectedItems.length == 1) {
        let item = this.selectedItems[0];
        this.dialogInformation = {
          ...this.dialogInformation,
          isShowDialog: true,
          messages: [
            {
              field: "message",
              content:
                `<div>${this.$msEnum.MS_MESSAGE_DELETE.ONE_RECORD}</div>`.format(
                  `<strong>${item.fixed_asset_code}</strong>`,
                  `<strong>${item.fixed_asset_name}</strong>`
                ),
              style: "",
            },
          ],
          buttonList: [
            {
              text: "Xóa",
              buttonClass: "button button__main",
              isFocus: true,
              onclick: async () => {
                // gọi api xóa dữ liệu
                
                this.dialogInformation.isShowDialog = false;
                this.selectedItems = [];
                this.showPopup("Xóa dữ liệu thành công", "success");
              },
            },
            {
              text: "Không",
              buttonClass: "button button__outline",
              onclick: () => {
                this.dialogInformation.isShowDialog = false;
              },
            },
          ],
        };
      } else {
        this.dialogInformation = {
          ...this.dialogInformation,
          isShowDialog: true,
          messages: [
            {
              field: "message",
              content:
                `<div>${this.$msEnum.MS_MESSAGE_DELETE.MULTI_RECORD}</div>`.format(
                  `<strong>${this.selectedItems.length}</strong>`
                ),
              style: "display: flex; flex-direction: row; ",
            },
          ],
          buttonList: [
            {
              text: "Xóa",
              buttonClass: "button button__main",
              isFocus: true,
              onclick: async () => {
                this.deleteFixedAsset();
                this.dialogInformation.isShowDialog = false;
                this.selectedItems = [];
                this.showPopup("Xóa tài sản thành công", "success");
              },
            },
            {
              text: "Không",
              buttonClass: "button button__outline",
              onclick: () => {
                this.dialogInformation.isShowDialog = false;
              },
            },
          ],
        };
      }
    },
    /**
     * @description: Thực hiện xử lí dữ liệu filter và paging trước khi gọi api
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 20/05/2023
     */
    handleData() {
      console.log(this.filterInfor);
    },
  },
};
</script>

<style scoped>
@import url(@/css/layouts/content/content.css);
</style>