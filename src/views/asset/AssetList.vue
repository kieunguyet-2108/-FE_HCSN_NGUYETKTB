<template>
  <div class="content" tabindex="0" @keydown="handleEvent">
    <div class="content-top">
      <div class="filter">
        <div class="filter__search--input">
          <MISAInput
            type="text"
            placeholder="Tìm kiếm tài sản"
            className="input__field box-shadow-none"
            :isValidate="false"
            v-model="filterObj.textSearchFilter"
            icon="ms-icon ms-22 ms-icon-search-black"
          ></MISAInput>
        </div>
        <MISACombobox
          iconLeft="ms-18 ms-icon-filter"
          iconRight="ms-8 ms-icon-arrow-down-bold"
          inputType="text"
          inputClass="input__field placeholder-black"
          inputPlaceholder="Loại tài sản"
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
          inputClass="input__field placeholder-black"
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
          type="main"
          text="Thêm tài sản"
          icon="ms-icon-plus ms-8"
          @click="handleAction(this.$msEnum.MS_ACTION.Add)"
        ></MISAButton>
        <div class="action-item flex column tooltip">
          <MISATooltipV1 content="Nhập">
            <MISAButton
              type="btn-icon"
              icon="ms-icon-excel ms-24"
              @click="handleAction(this.$msEnum.MS_ACTION.Import)"
            ></MISAButton>
          </MISATooltipV1>
        </div>
        <div class="action-item flex column tooltip">
          <MISATooltipV1 content="Xóa">
            <MISAButton
              ref="deleteButton"
              type="btn-icon"
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
        @add="handleAction"
        @edit="handleAction"
        @delete="handleAction"
        @duplicate="handleAction"
        @changePaging="changePaging"
        @changeDropdown="changeDropdown"
        :pagingOptions="pagingOptions"
        :summary="summary"
        :totalRecord="totalRecord"
        :pageNumber="pageNumber"
        :pageSize="pageSize"
        :menuOptions="menuOptions"
      ></MISATable>
      <MISALoading
        v-if="isLoading"
        :style="{
          top: '38px',
          left: '1px',
          right: '1px',
          bottom: '80px',
        }"
      ></MISALoading>
    </div>
    <router-view
      :departmentColumns="departmentColumns"
      :fixedAssetCategoryColumns="fixedAssetCategoryColumns"
      @show-popup="showPopup"
      @insertAsset="insertAsset"
      @updateAsset="updateAsset"
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
  </div>
</template>
<script>
/* eslint-disable */
import column from '@/js/column.js'
import MISADialog from '@/components/base/MISADialog.vue'

// component
import MISAPopup from '@/components/base/MISAPopup.vue'
import MISAButton from '@/components/base/MISAButton.vue'
import MISATooltip from '@/components/base/MISATooltip.vue'
import MISAInput from '@/components/base/MISAInput.vue'
import MISACombobox from '@/components/base/MISACombobox.vue'
import MISATable from '@/components/base/MISATable.vue'
import ShortcutGuide from '../ShortcutGuide.vue'
import _ from 'lodash'
export default {
  name: 'AssetHome',
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
    this.loadData()
    this.getDepartmentList()
    this.getFixedAssetCategoryList()
    this.fixedAssetCategoryColumns = column.fixedAssetCategoryColumns
    this.departmentColumns = column.departmentColumns
    this.tableColumns = column.tableColumns
  },
  data() {
    return {
      isShowShortCut: false,
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
      pagingOptions:column.pagingOptions,
      summary: [
        {
          field: 'quantity',
          value: 0,
          width: '80px',
        },
        {
          field: 'cost',
          value: 0,
          width: '100px',
        },
        {
          field: '',
          value: 0,
          width: '100px',
        },
        {
          field: '',
          value: 0,
          width: '100px',
        },
      ],
      menuOptions: [
        {
          text: 'Thêm',
          action: this.$msEnum.MS_ACTION.Add,
        },
        {
          text: 'Sửa',
          action: this.$msEnum.MS_ACTION.Edit,
        },
        {
          text: 'Xóa',
          action: this.$msEnum.MS_ACTION.Delete,
        },
        {
          text: 'Nhân bản',
          action: this.$msEnum.MS_ACTION.Duplicate,
        },
      ],
    }
  },
  computed: {
    /**
     * @description: Thực hiện xử lí khi có sự thay đổi của các trường lọc
     * @param: {any}
     * @return: {any} totalRecord
     * @author: NguyetKTB 25/05/2023
     */
    filter() {
      let tmpFilter = []
      if (!_.isEmpty(this.filterObj.departmentFilter)) {
        tmpFilter.push({
          field: 'department_id',
          value: this.filterObj.departmentFilter,
          condition: this.$msEnum.MS_FILTER_CONDITION.Equal,
          operators: this.$msEnum.MS_FILTER_OPERATOR.And,
        })
      }
      if (!_.isEmpty(this.filterObj.categoryFilter)) {
        tmpFilter.push({
          field: 'fixed_asset_category_id',
          value: this.filterObj.categoryFilter,
          condition: this.$msEnum.MS_FILTER_CONDITION.Equal,
          operators: this.$msEnum.MS_FILTER_OPERATOR.And,
        })
      }
      if (this.filterObj.textSearchFilter) {
        tmpFilter.push({
          field: 'fixed_asset_name',
          value: this.filterObj.textSearchFilter,
          condition: this.$msEnum.MS_FILTER_CONDITION.Like,
          operators: this.$msEnum.MS_FILTER_OPERATOR.Or,
        })
        tmpFilter.push({
          field: 'fixed_asset_code',
          value: this.filterObj.textSearchFilter,
          condition: this.$msEnum.MS_FILTER_CONDITION.Like,
        })
      }
      return tmpFilter
    },
  },
  watch: {
    /**
     * @description: Thực hiện xử lí khi có sự thay đổi của các trường lọc
     * @param: {any}
     * @return: {any} totalRecord
     * @author: NguyetKTB 25/05/2023
     */
    'filterObj.textSearchFilter': _.debounce(function () {
      this.pageNumber = 1
      this.getFixedAssetByPaging(this.pageNumber, this.pageSize)
    }, 500),
    'filterObj.departmentFilter': function () {
      this.pageNumber = 1
      this.getFixedAssetByPaging(this.pageNumber, this.pageSize)
    },
    'filterObj.categoryFilter': function () {
      this.pageNumber = 1
      this.getFixedAssetByPaging(this.pageNumber, this.pageSize)
    },
  },
  methods: {
    /**
     * @description: Thực hiện nhảy tới component tùy thuộc vào action
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 21/06/2023
     */
    handleAction(action, dataRow = null) {
      const me = this
      switch (action) {
        case me.$msEnum.MS_ACTION.Add:
          me.$router.push('/asset/add')
          break
        case me.$msEnum.MS_ACTION.Edit:
          me.$router.push(`/asset/detail/${dataRow.fixed_asset_id}`)
          break
        case me.$msEnum.MS_ACTION.Duplicate:
          me.$router.push(`/asset/add/${dataRow.fixed_asset_id}`)
          break
        case me.$msEnum.MS_ACTION.Import:
          me.$router.push('/asset/import')
          break
        case me.$msEnum.MS_ACTION.Delete:
          me.selectedItems = [dataRow]
          me.onClickDelete()
          break
        default:
          break
      }
    },
    /**
     * @description: Thực hiện xử lí phím tắt trên trang chủ
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 10/06/2023
     */
    handleEvent(event) {
      const me = this
      if (event.keyCode == this.$msEnum.KEY_CODE.F1) {
        event.preventDefault()
        this.isShowShortCut = true
      }
      if (
        this.isShowShortCut &&
        event.keyCode == this.$msEnum.KEY_CODE.Escape
      ) {
        event.preventDefault()
        this.isShowShortCut = false
      }
      // kiểm tra nếu chỉ có ctrl được dữ
      if (event.ctrlKey) {
        switch (event.keyCode) {
          case me.$msEnum.KEY_CODE.R: // reload data : Ctrl + R
            event.preventDefault()
            me.getFixedAssetByPaging(me.pageNumber, me.pageSize)
            break
          case me.$msEnum.KEY_CODE.D: // xóa: Ctrl + D
            event.preventDefault()
            me.onClickDelete()
            break
          default:
            break
        }
      }
      // kiểm tra nếu ctrl và alt cùng được dữ
      if (event.ctrlKey && event.shiftKey) {
        switch (event.keyCode) {
          case me.$msEnum.KEY_CODE.A: // thêm mới: Ctrl + Alt + A
            event.preventDefault()
            me.showFormModal()
            break
          default:
            break
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
      this.pageNumber = pageNumber
      this.loadData()
    },
    /**
     * @description: thực hiện load lại data khi người dùng thay đổi dropdown trên filter
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 25/05/2023
     */
    changeDropdown(value) {
      this.pageSize = value.key
      this.pageNumber = 1
      this.loadData()
    },

    /**
     * @description: Hàm thực hiện xử lí gọi api lấy dữ liệu theo paging và filter
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 21/05/2023
     */
    async getFixedAssetByPaging(pageNumber, pageSize) {
      const me = this
      me.isLoading = true
      var filters = []
      me.filter.forEach((filter) => {
        if (filter.value != '') {
          filters.push(filter)
        }
      })
      try {
        // duyệt qua các phần tử trong  filterInfor để lấy ra các tham số cần thiết
        const rs = await me.$msApi.fixed_asset.getListByPagination(
          pageNumber,
          pageSize,
          filters
        )
        if (rs == null) {
          me.fixedAssets = []
          me.totalRecord = 0
          me.summary.find((x) => x.field == 'quantity').value = 0
          me.summary.find((x) => x.field == 'cost').value = 0
        } else if (rs.status == me.$msEnum.MS_CODE.SUCCESS) {
          me.fixedAssets = rs.data.data.data
          me.totalRecord = rs.data.data.totalRecord
          me.summary.find((x) => x.field == 'quantity').value =
            rs.data.data.summary.totalQuantity
          me.summary.find((x) => x.field == 'cost').value =
            rs.data.data.summary.totalOfCost
        }
      } catch (error) {
        console.log(error)
      }
      me.isLoading = false
    },
    /**
     * @description: Hàm thực hiện gọi api lấy ra tất cả dữ liệu bảng tài sản
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/05/2023
     */
    async getFixedAssetList() {
      const me = this
      const result = await me.$msApi.fixed_asset.getFixedAssets()
      if (result == null) {
        me.fixedAssets = []
      } else if (result.status == me.$msEnum.MS_CODE.SUCCESS) {
        me.fixedAssets = result.data.data
      }
    },

    /**
     * @description: Hàm thực hiện gọi api lấy ra tất cả dữ liệu bảng phòng ban
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/05/2023
     */
    async getDepartmentList() {
      const me = this
      const result = await me.$msApi.department.getDepartments()
      if (result == null) {
        me.departments = []
      } else if (result.status == me.$msEnum.MS_CODE.SUCCESS) {
        me.departments = result.data.data
      }
    },
    /**
     * @description: Hàm thực hiện gọi api lấy ra tất cả dữ liệu bảng loại tài sản
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/05/2023
     */
    async getFixedAssetCategoryList() {
      const me = this
      const result =
        await me.$msApi.fixed_asset_category.getFixedAssetCategories()
      if (result == null) {
        me.fixedAssetCategories = []
      } else if (result.status == me.$msEnum.MS_CODE.SUCCESS) {
        me.fixedAssetCategories = result.data.data
      }
    },
    /**
     * @description: Hàm thực hiện gọi api lấy dữ liệu theo paging và filter
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 05/05/2023
     */
    async loadData() {
      this.isLoading = true
      // set time out 1s để tắt loading
      await this.getFixedAssetByPaging(this.pageNumber, this.pageSize)
      this.isLoading = false
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
     * @description: Thực hiện xử lí sự kiện click vào button xóa
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 05/05/2023
     */
    async onClickDelete(event) {
      const me = this
      const items = me.selectedItems
      if (items.length == 0) return
      let assetInVoucherItem = await me.hanldeBeforeDelete(me.selectedItems)
      if (assetInVoucherItem > 0) {
        var message = ''
        if (items.length == 1) {
          message = `<div>${me.$msResource.DIALOG_MESSAGE.Delete_Warning_OneRecord}</div>`
        } else {
          message =
            `<div>${me.$msResource.DIALOG_MESSAGE.Delete_Warning_MultiRecord}</div>`.format(
              `<strong>${items.length}</strong>`
            )
        }
        me.dialogInformation = {
          isShowDialog: true,
          styleIcon: 'align-items: flex-start;',
          messages: [
            {
              field: 'message',
              content: message,
              style: 'display: flex; flex-direction: column;',
            },
          ],
          buttonList: [
            {
              text: 'Đóng',
              type: 'main',
              isFocus: true,
              onclick: () => {
                me.dialogInformation.isShowDialog = false
              },
            },
          ],
        }
      } else {
        let dialogMessage = ''
        // show message confirm
        if (items.length == 1) {
          let itemDelete = items[0]
          dialogMessage =
            `<div>${me.$msResource.DIALOG_MESSAGE.Delete_OneRecord}</div>`.format(
              `<strong>${itemDelete.fixed_asset_code}</strong>`,
              `<strong>${itemDelete.fixed_asset_name}</strong>`
            )
        } else {
          dialogMessage =
            `<div>${me.$msResource.DIALOG_MESSAGE.Delete_MultiRecord}</div>`.format(
              `<strong>${me.selectedItems.length}</strong>`
            )
        }
        me.dialogInformation = {
          isShowDialog: true,
          messages: [
            {
              field: 'message',
              content: dialogMessage,
              style: 'display: flex; flex-direction: column;',
            },
          ],
          buttonList: [
            {
              text: 'Xóa',
              type: 'main',
              isFocus: true,
              onclick: async () => {
                me.deleteFixedAsset(items)
              },
            },
            {
              text: 'Không',
              type: 'outline',
              onclick: () => {
                me.dialogInformation.isShowDialog = false
              },
            },
          ],
        }
      }
    },
    /**
     * @description: Thực hiện gọi api xóa dữ liệu
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 25/05/2023
     */
    async deleteFixedAsset(items) {
      const me = this
      var selectedList = []
      // thực hiện lấy ra danh sách id cần xóa
      items.forEach((item) => {
        selectedList.push(item.fixed_asset_id)
      })
      try {
        // gọi api xóa dữ liệu
        const result = await me.$msApi.fixed_asset.deleteFixedAsset(
          selectedList
        )
        // kiểm tra kết quả trả về
        if (result.status == me.$msEnum.MS_CODE.SUCCESS) {
          if (items.length == me.fixedAssets.length) {
            if (me.pageNumber > 1) {
              me.pageNumber = me.pageNumber - 1
            }
          }
          me.selectedItems = []
          me.showPopup(
            me.$msResource.POPUP_MESSAGE.Msg_Delete_Success.format('tài sản'),
            me.$msEnum.MS_POPUP_MODE.Success
          )
          me.loadData()
        } else {
          me.showPopup(
            me.$msResource.POPUP_MESSAGE.Msg_Delete_Failed.format('tài sản'),
            me.$msEnum.MS_POPUP_MODE.Error
          )
        }
      } catch (error) {
        console.log(error)
      }

      me.dialogInformation.isShowDialog = false
    },
    /**
     * @description: Thực hiện xử lí , kiểm tra dữ liệu trước khi xóa
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 10/07/2023
     */
    async hanldeBeforeDelete(items) {
      const me = this
      var selectedList = []
      // thực hiện lấy ra danh sách id cần xóa
      items.forEach((item) => {
        selectedList.push(item.fixed_asset_id)
      })
      try {
        const rs = await me.$msApi.fixed_asset.handleBeforeDelete(selectedList)
        return rs.data.data
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * @description: Thục hiện ẩn modal
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/06/2023
     */
    hideModal() {
      this.$router.push('/asset')
    },
    /**
     * @description: Thực hiện xử lí thông tin sau khi thêm mới và hiện thông báo cho người dùng
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 25/05/2023
     */
    insertAsset(asset) {
      const me = this
      if (asset) {
        me.hideModal()
        // me.loadData();
        me.fixedAssets.unshift(asset)
        me.totalRecord += 1
        me.summary.find((x) => x.field == 'quantity').value += asset.quantity
        me.summary.find((x) => x.field == 'cost').value += asset.cost
        me.showPopup(
          me.$msResource.POPUP_MESSAGE.Msg_Add_Success,
          me.$msEnum.MS_POPUP_MODE.Success
        )
      } else {
        me.hideModal()
        me.showPopup(
          me.$msResource.POPUP_MESSAGE.Msg_Add_Failed,
          me.$msEnum.MS_POPUP_MODE.Error
        )
      }
    },
    /**
     * @description: Thực hiện xử lí thông tin sau khi sửa và hiện thông báo cho người dùng
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 26/05/2023
     */
    updateAsset(message, popupMode, item) {
      const me = this
      me.hideModal()
      me.loadData()
      me.showPopup(message, popupMode)
    },
    /**
     * @description: Thực hiện xử lí khi người dùng thực hiện sự kiện chọn item trong combobox filter
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/06/2023
     */
    handleCategoryFilterItem(item) {
      const me = this
      me.filterObj.categoryFilter = item.fixed_asset_category_id
    },
    /**
     * @description: Thực hiện xử lí khi người dùng thực hiện sự kiện chọn item trong combobox filter
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/06/2023
     */
    handleDepartmentFilterItem(item) {
      const me = this
      me.filterObj.departmentFilter = item.department_id
    },
  },
}
</script>

<style scoped>
@import url(@/css/layouts/content/content.css);
</style>