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
            className="input__field text-style-italic box-shadow-none"
            :isValidate="false"
            v-model="filterObj.textSearchFilter"
          ></MISAInput>
        </div>
        <MISACombobox
          iconLeft="ms-18 ms-icon-filter"
          iconRight="ms-8 ms-icon-arrow-down-bold"
          inputType="text"
          inputClass="input__field placeholder-color-black"
          inputPlaceholder="Loại tài sản"
          id="department_code-filter"
          name="department_code-filter"
          primaryKey="fixed_asset_category_id"
          v-model="filterObj.categoryFilter"
          :data="fixedAssetCategories"
          :column="fixedAssetCategoryColumns"
          @selectedItem="handleCategoryFilterItem"
        ></MISACombobox>
        <MISACombobox
          iconLeft="ms-18 ms-icon-filter"
          iconRight="ms-8 ms-icon-arrow-down-bold"
          inputType="text"
          inputClass="input__field placeholder-color-black"
          inputPlaceholder="Bộ phận sử dụng"
          primary-key="department_id"
          v-model="filterObj.departmentFilter"
          :data="departments"
          :column="departmentColumns"
          @selectedItem="handleDepartmentFilterItem"
        ></MISACombobox>
      </div>
      <div class="data-action">
        <MISAButton
          class="button button__main"
          text="Thêm tài sản"
          icon="ms-icon-plus ms-8"
          @click="showFormModal"
        ></MISAButton>
        <div class="action-item flex column tooltip">
          <MISATooltipV1 content="Nhập">
            <MISAButton
              class="button__icon ms-36"
              icon="ms-icon-excel ms-24"
              @click="onClickImport"
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
        @edit="handleEditRow"
        @duplicate="handleDuplicateRow"
        @changePaging="changePaging"
        @changeDropdown="changeDropdown"
        :pagingOptions="pagingOptions"
        :summary="summary"
        :totalRecord="totalRecord"
        :pageNumber="pageNumber"
        :pageSize="pageSize"
        @selectMenuItem="selectMenuItem"
      ></MISATable>
    </div>
    <router-view
      :departmentColumns="departmentColumns"
      :fixedAssetCategoryColumns="fixedAssetCategoryColumns"
      @show-popup="showPopup"
      @insertAsset="insertAsset"
      @updateAsset="updateAsset"
      @importAsset="importAsset"
    ></router-view>
    <MISAPopup
      :popupMessage="popupInformation.popupMessage"
      :popupMode="popupInformation.popupMode"
      v-if="popupInformation.isShowPopup"
    ></MISAPopup>
    <MISADialog
      ref="dialog"
      v-if="dialogInformation.isShowDialog"
      :dialogMessages="dialogInformation.messages"
      :buttonList="dialogInformation.buttonList"
      :styleIcon="dialogInformation.styleIcon"
    ></MISADialog>
    <ShortcutGuide :isShowShortcutGuide="isShowShortCut"></ShortcutGuide>
    <MISALoading v-if="isLoading"></MISALoading>
  </div>
</template>
<script>
/* eslint-disable */
// script file
import Enum from "@/js/enum.js";
import column from "@/js/column.js";
import MISADialog from "@/components/base/MISADialog.vue";

// component
import MISAPopup from "@/components/base/MISAPopup.vue";
import MISAButton from "@/components/base/MISAButton.vue";
import MISATooltip from "@/components/base/MISATooltip.vue";
import MISAInput from "@/components/base/MISAInput.vue";
import MISACombobox from "@/components/base/MISACombobox.vue";
import MISATable from "@/components/base/MISATable.vue";
import ShortcutGuide from "../ShortcutGuide.vue";
import _ from "lodash";
export default {
  name: "AssetHome",
  components: {
    MISAButton,
    MISATooltip,
    MISAInput,
    MISACombobox,
    MISAPopup,
    MISADialog,
    MISATable,
    ShortcutGuide,
  },
  created() {
    this.loadData();
    this.getDepartmentList();
    this.getFixedAssetCategoryList();
    this.fixedAssetCategoryColumns = column.fixedAssetCategoryColumns;
    this.departmentColumns = column.departmentColumns;
    this.tableColumns = column.tableColumns;
  },
  mounted() {
    window.addEventListener("keydown", this.handleEvent);
  },
  data() {
    return {
      formMode: null,
      isShowShortCut: false,
      activeItem: null,
      filterObj: {
        // thông tin lọc
        departmentFilter: null,
        categoryFilter: null,
        textSearchFilter: null,
      },
      isLoading: false, // trạng thái loading
      selectedItems: [], // danh sách asset được selected
      fixedAssets: [], // danh sách asset
      departments: [], // danh sách department
      fixedAssetCategories: [], // danh sách category
      departmentColumns: [], // danh sách cột department sẽ hiển thị trên combobox
      fixedAssetCategoryColumns: [], // danh sách cột category sẽ hiển thị trên combobox
      tableColumns: [], // danh sách cột sẽ hiển thị trên table
      dialogInformation: {}, // thông tin dialog
      popupInformation: {}, // thông tin popup
      pageNumber: 1,
      pageSize: 10,
      totalRecord: 0,
      pagingOptions: [
        { key: 10, value: 10 },
        { key: 20, value: 20 },
        { key: 50, value: 50 },
        { key: 100, value: 100 },
      ],
      summary: [
        {
          field: "quantity",
          value: 0,
          width: "80px",
        },
        {
          field: "cost",
          value: 0,
          width: "100px",
        },
        {
          field: "",
          value: 0,
          width: "100px",
        },
        {
          field: "",
          value: 0,
          width: "100px",
        },
      ],
    };
  },
  computed: {
    /**
     * @description:
     * @param: {any}
     * @return: {any} totalRecord
     * @author: NguyetKTB 25/05/2023
     */
    filter() {
      let tmpFilter = [];
      if (!_.isEmpty(this.filterObj.departmentFilter)) {
        tmpFilter.push({
          field: "department_id",
          value: this.filterObj.departmentFilter,
          condition: this.$msEnum.MS_FILTER_CONDITION.Equal,
          operators: this.$msEnum.MS_FILTER_OPERATOR.And,
        });
      }
      if (!_.isEmpty(this.filterObj.categoryFilter)) {
        tmpFilter.push({
          field: "fixed_asset_category_id",
          value: this.filterObj.categoryFilter,
          condition: this.$msEnum.MS_FILTER_CONDITION.Equal,
          operators: this.$msEnum.MS_FILTER_OPERATOR.And,
        });
      }
      if (this.filterObj.textSearchFilter) {
        tmpFilter.push({
          field: "fixed_asset_name",
          value: this.filterObj.textSearchFilter,
          condition: this.$msEnum.MS_FILTER_CONDITION.Like,
          operators: this.$msEnum.MS_FILTER_OPERATOR.Or,
        });
        tmpFilter.push({
          field: "fixed_asset_code",
          value: this.filterObj.textSearchFilter,
          condition: this.$msEnum.MS_FILTER_CONDITION.Like,
        });
      }
      return tmpFilter;
    },
  },
  watch: {
    /**
     * @description:
     * @param: {any}
     * @return: {any} totalRecord
     * @author: NguyetKTB 25/05/2023
     */
    "filterObj.textSearchFilter": _.debounce(function () {
      this.pageNumber = 1;
      this.getFixedAssetByPaging(this.pageNumber, this.pageSize);
    }, 500),
    "filterObj.departmentFilter": function () {
      this.pageNumber = 1;
      this.getFixedAssetByPaging(this.pageNumber, this.pageSize);
    },
    "filterObj.categoryFilter": function () {
      this.pageNumber = 1;
      this.getFixedAssetByPaging(this.pageNumber, this.pageSize);
    },
  },
  methods: {
    /**
     * @description: Thực hiện xử lí phím tắt trên trang chủ
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 10/06/2023
     */
    handleEvent(event) {
      const me = this;
      if (event.keyCode == this.$msEnum.KeyCode.F1) {
        event.preventDefault();
        this.isShowShortCut = true;
      }
      if (this.isShowShortCut && event.keyCode == this.$msEnum.KeyCode.Escape) {
        event.preventDefault();
        this.isShowShortCut = false;
      }
      // kiểm tra nếu chỉ có ctrl được dữ
      if (event.ctrlKey) {
        switch (event.keyCode) {
          case me.$msEnum.KeyCode.R: // reload data : Ctrl + R
            event.preventDefault();
            me.getFixedAssetByPaging(me.pageNumber, me.pageSize);
            break;
          case me.$msEnum.KeyCode.D: // xóa: Ctrl + D
            event.preventDefault();
            me.onClickDelete();
            break;
          default:
            break;
        }
      }
      // kiểm tra nếu ctrl và alt cùng được dữ
      if (event.ctrlKey && event.shiftKey) {
        switch (event.keyCode) {
          case me.$msEnum.KeyCode.A: // thêm mới: Ctrl + Alt + A
            event.preventDefault();
            me.showFormModal();
            break;
          default:
            break;
        }
      }
    },
    /**
     * @description: Thực hiện load lại data khi người dùng click paging dưới table
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 25/05/2023
     */
    changePaging(pageNumber) {
      this.pageNumber = pageNumber;
      this.loadData();
    },
    /**
     * @description: thực hiện load lại data khi người dùng thay đổi dropdown trên filter
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 25/05/2023
     */
    changeDropdown(value) {
      this.pageSize = value.key;
      this.pageNumber = 1;
      this.loadData();
    },

    /**
     * @description: Hàm thực hiện xử lí gọi api lấy dữ liệu theo paging và filter
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 21/05/2023
     */
    async getFixedAssetByPaging(pageNumber, pageSize) {
      const me = this;
      var filters = [];
      me.filter.forEach((filter) => {
        if (filter.value != "") {
          filters.push(filter);
        }
      });
      // duyệt qua các phần tử trong  filterInfor để lấy ra các tham số cần thiết
      try {
        me.isLoading = true;
        const rs = await me.$msApi.fixed_asset.getListByPagination(
          pageNumber,
          pageSize,
          filters
        );
        if (rs.data.msCode == me.$msEnum.MS_CODE.SUCCESS) {
          me.fixedAssets = rs.data.data.data;
          me.totalRecord = rs.data.data.totalRecord;
          me.summary.find((x) => x.field == "quantity").value =
            rs.data.data.summary.totalQuantity;
          me.summary.find((x) => x.field == "cost").value =
            rs.data.data.summary.totalOfCost;
          // me.selectedItems = [];
          me.isLoading = false;
        } else {
          me.fixedAssets = [];
          me.totalRecord = 0;
          me.summary.find((x) => x.field == "quantity").value = 0;
          me.summary.find((x) => x.field == "cost").value = 0;
          me.isLoading = false;
          // CO THONG BAO LOI
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description: Hàm thực hiện gọi api lấy ra tất cả dữ liệu bảng tài sản
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/05/2023
     */
    async getFixedAssetList() {
      const me = this;
      try {
        const result = await me.$msApi.fixed_asset.getFixedAssets();
        if (result.data.msCode == me.$msEnum.MS_CODE.SUCCESS) {
          me.fixedAssets = result.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description: Hàm thực hiện gọi api lấy ra tất cả dữ liệu bảng phòng ban
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/05/2023
     */
    async getDepartmentList() {
      const me = this;
      try {
        const result = await me.$msApi.department.getDepartments();
        if (result.data.msCode == me.$msEnum.MS_CODE.SUCCESS) {
          me.departments = result.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description: Hàm thực hiện gọi api lấy ra tất cả dữ liệu bảng loại tài sản
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/05/2023
     */
    async getFixedAssetCategoryList() {
      const me = this;
      try {
        const result =
          await me.$msApi.fixed_asset_category.getFixedAssetCategories();
        if (result.data.msCode == me.$msEnum.MS_CODE.SUCCESS) {
          me.fixedAssetCategories = result.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description: Hàm xử lí sự kiện click vào 1 dòng trong table
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/05/2023
     */
    handleEditRow(dataRow) {
      this.formMode = this.$msEnum.FormMode.Edit;
      this.$router.push(`/asset/${dataRow.fixed_asset_id}`);
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 28/05/2023
     */
    handleDuplicateRow(dataRow) {
      this.formMode = this.$msEnum.FormMode.Duplicate;
      this.$router.push(`/asset/add/${dataRow.fixed_asset_id}`);
    },
    /**
     * @description: Hàm thực hiện gọi api lấy dữ liệu theo paging và filter
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 05/05/2023
     */
    async loadData() {
      this.isLoading = true;
      // set time out 1s để tắt loading
      await this.getFixedAssetByPaging(this.pageNumber, this.pageSize);
      this.isLoading = false;
    },
    /**
     * @description: Thực hiện show form thêm mới tài sản
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 04/05/2023
     */
    showFormModal() {
      this.formMode = this.$msEnum.FormMode.Add;
      this.$router.push("/asset/add");
    },
    /**
     * @description: Thực hiện xử lí khi click button xuất
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 26/05/2023
     */
    async onClickImport() {
      const me = this;
      this.$router.push("/asset/import");
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
     * @description: Thực hiện xử lí sự kiện click vào button xóa
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 05/05/2023
     */
    async onClickDelete(event) {
      const me = this;
      // kiểm tra trường hợp chưa chọn bản ghi nào
      if (me.selectedItems.length == 0) {
        // disable button xóa
      } else if (me.selectedItems.length == 1) {
        let item = me.selectedItems[0];
        me.dialogInformation = {
          isShowDialog: true,
          messages: [
            {
              field: "message",
              content:
                `<div>${me.$msEnum.MS_MESSAGE_DELETE.ONE_RECORD}</div>`.format(
                  `<strong>${item.fixed_asset_code}</strong>`,
                  `<strong>${item.fixed_asset_name}</strong>`
                ),
              style: "display: flex; flex-direction: column;"
            },
          ],
          buttonList: [
            {
              text: "Xóa",
              buttonClass: "button button__main",
              isFocus: true,
              onclick: async () => {
                me.deleteFixedAsset(me.selectedItems);
                // kiểm tra lại nếu list item = 0
                console.log(me.fixedAssets);
              },
            },
            {
              text: "Không",
              buttonClass: "button button__outline",
              onclick: () => {
                me.dialogInformation.isShowDialog = false;
              },
            },
          ],
        };
      } else {
        me.dialogInformation = {
          isShowDialog: true,
          messages: [
            {
              field: "message",
              content:
                `<div>${me.$msEnum.MS_MESSAGE_DELETE.MULTI_RECORD}</div>`.format(
                  `<strong>${me.selectedItems.length}</strong>`
                ),
              style: "display: flex; flex-direction: column;"
            },
          ],
          buttonList: [
            {
              text: "Xóa",
              buttonClass: "button button__main",
              isFocus: true,
              onclick: async () => {
                me.deleteFixedAsset(me.selectedItems);
              },
            },
            {
              text: "Không",
              buttonClass: "button button__outline",
              onclick: () => {
                me.dialogInformation.isShowDialog = false;
              },
            },
          ],
        };
      }
    },
    /**
     * @description: Thực hiện gọi api xóa dữ liệu
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 25/05/2023
     */
    async deleteFixedAsset(items) {
      const me = this;
      var selectedList = [];
      items.forEach((item) => {
        selectedList.push(item.fixed_asset_id);
      });
      try {
        const result = await me.$msApi.fixed_asset.deleteFixedAsset(
          selectedList
        );
        if (result.data.msCode == me.$msEnum.MS_CODE.SUCCESS) {
          if (items.length == me.fixedAssets.length) {
            if (me.pageNumber > 1) {
              me.pageNumber = me.pageNumber - 1;
            }
          }
          me.dialogInformation.isShowDialog = false;
          me.selectedItems = [];
          me.showPopup(result.data.userMsg, me.$msEnum.MS_POPUP_MODE.Success);
          me.loadData();
        } else {
          me.dialogInformation.isShowDialog = false;
          me.showPopup(result.data.userMsg, me.$msEnum.MS_POPUP_MODE.Error);
        }
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/06/2023
     */
    hideModal() {
      this.$router.push("/asset");
    },
    /**
     * @description: Thực hiện xử lí thông tin sau khi thêm mới và hiện thông báo cho người dùng
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 25/05/2023
     */
    insertAsset(asset) {
      // nên load luôn dữ liệu mới nhất từ api về
      const me = this;
      if (asset) {
        me.hideModal();
        // me.loadData();
        me.fixedAssets.unshift(asset);
        me.totalRecord += 1;
        me.summary.find((x) => x.field == "quantity").value += asset.quantity;
        me.summary.find((x) => x.field == "cost").value += asset.cost;
        me.showPopup(
          me.$msEnum.MS_MESSAGE.MS_MSG_ADD_SUCCESS,
          me.$msEnum.MS_POPUP_MODE.Success
        );
      } else {
        me.hideModal();
        me.showPopup(
          me.$msEnum.MS_MESSAGE.MS_MSG_ADD_FAILED,
          me.$msEnum.MS_POPUP_MODE.Error
        );
      }
    },
    /**
     * @description: Thực hiện xử lí thông tin sau khi sửa và hiện thông báo cho người dùng
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 26/05/2023
     */
    updateAsset(message, popupMode, item) {
      const me = this;
      me.hideModal();
      me.loadData();
      me.showPopup(message, popupMode);
    },
    /**
     * @description: 
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 12/06/2023
     */
     importAsset(items){
      // const me = this;
      // // unshift là thêm vào đầu mảng
      // me.fixedAssets.unshift(...items);
      // me.totalRecord += items.length;
      // me.summary.find((x) => x.field == "quantity").value += items.reduce((sum, item) => sum + item.quantity, 0);
     },
    /**
     * @description: Hàm thực hiện xử lí khi người dùng chọn menu item
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 02/06/2023
     */
    selectMenuItem(action, item) {
      const me = this;
      switch (action) {
        case me.$msEnum.MS_ACTION.Add:
          me.showFormModal();
          break;
        case me.$msEnum.MS_ACTION.Edit:
          me.handleEditRow(item);
          break;
        case me.$msEnum.MS_ACTION.Delete:
          me.selectedItems = [item];
          me.onClickDelete();
          break;
        case me.$msEnum.MS_ACTION.Duplicate:
          me.handleDuplicateRow(item);
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
@import url(@/css/layouts/content/content.css);
</style>