<template>
  <div @keydown="handleEventKeyDown" class="main__content">
    <div class="content">
      <div class="content-top" style="height: 40px">
        <div class="content-top__title">Ghi tăng tài sản</div>
        <div class="data-action">
          <MISAButton
            type="main"
            text="Thêm"
            @click="handleAction(this.$msEnum.MS_ACTION.Add)"
          ></MISAButton>
          <div
            class="data-layout"
            v-clickOutside="
              () => {
                isShowLayoutMenu = false
              }
            "
            @click="isShowLayoutMenu = !isShowLayoutMenu"
          >
            <div class="layout-icon">
              <div :class="iconLayout.icon"></div>
            </div>
            <div class="layout-icon">
              <div class="ms-icon ms-icon-arrow-down-gray"></div>
            </div>
            <div class="layout-menu" v-if="isShowLayoutMenu">
              <div
                class="layout-menu__item"
                @click="handleLayout(option)"
                v-for="(option, index) in layoutOptions"
                :key="index"
              >
                <div class="layout-item__icon" :class="option.icon"></div>
                <div class="layout-item__text">{{ option.text }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container" ref="container">
        <div
          class="content-bottom box1"
          ref="voucherTable"
          :style="vourcherStyle"
        >
          <div class="content-bottom__filter">
            <MISAInput
              type="text"
              placeholder="Tìm kiếm theo số chứng từ, nội dung"
              className="input__field box-shadow-none flex-1"
              style="padding: 0px 12px 0px 0px !important"
              :isValidate="false"
              icon="ms-icon ms-22 ms-icon-search-black"
              v-model="voucherFilter.textSearchFilter"
            ></MISAInput>
            <div class="data-action--icon">
              <div
                class="action-item flex column tooltip"
                v-if="voucherSelected.length > 0"
              >
                <MISATooltipV1 content="Xóa">
                  <MISAButton
                    ref="deleteButton"
                    type="btn-icon"
                    icon="ms-icon-trash-red ms-24"
                    @click="onClickDeleteRow(voucherSelected)"
                  ></MISAButton>
                </MISATooltipV1>
              </div>
              <div class="action-item flex column tooltip">
                <MISATooltipV1 content="In">
                  <MISAButton
                    type="btn-icon"
                    icon="ms-icon ms-icon-print ms-18"
                  ></MISAButton>
                </MISATooltipV1>
              </div>
              <div class="action-item flex column tooltip">
                <MISATooltipV1 content="Tiện ích">
                  <MISAButton
                    type="btn-icon"
                    icon="ms-icon ms-icon-three-dot"
                  ></MISAButton>
                </MISATooltipV1>
              </div>
            </div>
          </div>
          <MISATable
            tableRef="voucherTable"
            :listData="listVoucher"
            :listColumn="voucherColumns"
            @delete="handleAction"
            @add="handleAction"
            @edit="handleAction"
            @clickRow="handleClickRow"
            primaryKey="voucher_id"
            :pagingOptions="voucherPagination.pagingOptions"
            :summary="summary"
            :totalRecord="totalRecord"
            :pageNumber="voucherPagination.pageNumber"
            :pageSize="voucherPagination.pageSize"
            v-model="voucherSelected"
            @changePaging="changePaging"
            @changeDropdown="changeDropdown"
            :isFocusFirstRow="true"
            :menuOptions="menuOptions"
          ></MISATable>
          <MISALoading
            v-if="isLoadingVoucher"
            :style="{
              top: '98px',
              left: '0px',
              right: '0px',
              bottom: '40px',
            }"
          ></MISALoading>
        </div>

        <div
          class="content-bottom content-bottom__sub box2"
          ref="assetTable"
          :style="assetStyle"
        >
          <MISATooltipV1 content="Kéo">
            <div
              class="handler"
              v-if="action != this.$msEnum.MS_INCREASE_ASSET_ACTION.ZoomIn"
            >
              <img
                src="@/assets/resize_icon.png"
                alt=""
                @mousedown="startResize"
              />
            </div>
          </MISATooltipV1>
          <div class="content-bottom__filter">
            <div class="content-bottom__sub__title">Thông tin chi tiết</div>
            <div class="data-action">
              <div class="action-item flex column tooltip">
                <MISATooltipV1 :content="iconZoom.text">
                  <MISAButton
                    ref="deleteButton"
                    type="btn-icon"
                    :icon="iconZoom.icon"
                    @click="handleZoom(iconZoom)"
                  ></MISAButton>
                </MISATooltipV1>
              </div>
            </div>
          </div>
          <MISATable
            :listData="listAsset"
            :listColumn="assetColumns"
            :isShowPagination="false"
            :isCheckEmpty="false"
          ></MISATable>
          <MISALoading
            v-if="isLoadingAsset"
            :style="{
              top: '75px',
              left: '0px',
              right: '0px',
              bottom: '30px',
            }"
          ></MISALoading>
        </div>
      </div>
    </div>
    <router-view
      @insertVoucher="insertVoucher"
      @updateVoucher="updateVoucher"
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
import _ from 'lodash'
import column from '@/js/column.js'
import vClickOutside from 'click-outside-vue3'
import MISATable from '@/components/base/MISATable.vue'
import MISAButton from '@/components/base/MISAButton.vue'
import MISAInput from '@/components/base/MISAInput.vue'
import MISALoading from '@/components/base/MISALoading.vue'
import MISADialog from '@/components/base/MISADialog.vue'
import MISAPopup from '@/components/base/MISAPopup.vue'
export default {
  name: 'AssetIncreaseRecording',
  components: {
    MISAButton,
    MISATable,
    MISAInput,
    MISALoading,
    MISADialog,
    MISAPopup,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      isLoadingVoucher: false,
      isLoadingAsset: false,
      vourcherStyle: {},
      assetStyle: {},
      isShowShortCut: false,
      dialogInformation: {}, // thông tin dialog
      popupInformation: {}, // thông tin popup
      isShowLayoutMenu: false,
      layoutOptions: [
        {
          icon: 'ms-icon ms-icon-vertical-layout',
          text: 'Giao diện dọc',
          action: this.$msEnum.MS_INCREASE_ASSET_ACTION.VerticalLayout,
        },
        {
          icon: 'ms-icon ms-icon-horizontal-layout',
          text: 'Giao diện ngang',
          action: this.$msEnum.MS_INCREASE_ASSET_ACTION.HorizontalLayout,
        },
      ],
      iconZoom: {
        icon: 'ms-icon-3 ms-icon-zoom-in',
        text: 'Phóng to',
        action: this.$msEnum.MS_INCREASE_ASSET_ACTION.ZoomIn,
      },
      iconLayout: {
        icon: 'ms-icon ms-icon-vertical-layout',
        text: 'Giao diện dọc',
        action: this.$msEnum.MS_INCREASE_ASSET_ACTION.VerticalLayout,
      },
      voucherColumns: [],
      assetColumns: [],
      listVoucher: [],
      listAsset: [],
      voucherSelected: [],
      summary: [
        {
          field: 'total_orgprice',
          value: 0,
          width: '80px',
        },
      ],
      voucherFilter: {
        textSearchFilter: '',
      },
      voucherPagination: {
        pageNumber: 1,
        pageSize: 10,
        totalRecord: 0,
        pagingOptions: column.pagingOptions,
      },
      voucherItem: {},
      container: null,
      startY: 0,
      box1Flex: 1,
      box2Flex: 1,
      isResizing: false,
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
      ],
    }
  },
  async created() {
    await this.getVourcherListByPaging()
  },
  mounted() {
    document.addEventListener('mousemove', this.handleResize)
    document.addEventListener('mouseup', this.stopResize)
    this.$nextTick(async () => {
      this.container = this.$refs['container']
      this.voucherColumns = column.vourcherColumns
      this.assetColumns = column.assetColumns
    })
  },
  beforeUnmount() {
    document.removeEventListener('mousemove', this.handleResize)
    document.removeEventListener('mouseup', this.stopResize)
  },
  computed: {
    action: {
      get() {
        return this.$store.getters.getActionStatus
      },
      set(value) {
        this.$store.commit('setActionStatus', value)
      },
    },
    filterVoucher() {
      let tempFilter = []
      if (
        this.voucherFilter.textSearchFilter != null ||
        this.voucherFilter.textSearchFilter != ''
      ) {
        tempFilter.push({
          field: 'voucher_code',
          value: this.voucherFilter.textSearchFilter,
          condition: this.$msEnum.MS_FILTER_CONDITION.Like,
          operators: this.$msEnum.MS_FILTER_OPERATOR.Or,
        })
        tempFilter.push({
          field: 'description',
          value: this.voucherFilter.textSearchFilter,
          condition: this.$msEnum.MS_FILTER_CONDITION.Like,
        })
      }
      return tempFilter
    },
  },
  watch: {
    action(action) {
      const me = this
      switch (action) {
        case me.$msEnum.MS_INCREASE_ASSET_ACTION.VerticalLayout: // giao diện dọc
          me.assetStyle = 'display: none'
          me.vourcherStyle = {
            display: 'flex',
            flex: '1 1 auto',
          }
          break
        case me.$msEnum.MS_INCREASE_ASSET_ACTION.HorizontalLayout: // giao diện ngang
          me.assetStyle = {
            display: 'flex',
            flex: '1 1 auto',
          }
          me.vourcherStyle = {
            display: 'flex',
            flex: '1 1 auto',
          }
          break
        case me.$msEnum.MS_INCREASE_ASSET_ACTION.ZoomIn: // phóng to
          me.assetStyle = {
            display: 'flex',
            flex: '1 1 auto',
          }
          me.vourcherStyle = 'display: none'
          break
        case me.$msEnum.MS_INCREASE_ASSET_ACTION.ZoomOut: // thu nhỏ
          me.assetStyle = {
            display: 'flex',
            flex: '1 1 auto',
          }
          me.vourcherStyle = {
            display: 'flex',
            flex: '1 1 auto',
          }
          break
        default:
          break
      }
    },
    'voucherFilter.textSearchFilter': _.debounce(function () {
      this.voucherPagination.pageNumber = 1
      this.getVourcherListByPaging()
    }, 500),
  },
  methods: {
    startResize(e) {
      this.isResizing = true
      this.startY = e.clientY
    },
    handleResize(e) {
      if (!this.isResizing) {
        return
      }

      const deltaY = e.clientY - this.startY
      const containerHeight = this.container.offsetHeight
      const totalFlex = this.box1Flex + this.box2Flex

      this.box1Flex += (deltaY / containerHeight) * totalFlex
      this.box2Flex -= (deltaY / containerHeight) * totalFlex

      // nếu box 2 có chiều cao gần bằng container thì ẩn box 1
      this.vourcherStyle = {
        flex: this.box1Flex,
      }
      this.assetStyle = {
        flex: this.box2Flex,
      }
      this.startY = e.clientY
    },
    stopResize() {
      this.isResizing = false
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 06/07/2023
     */
    async handleClickRow(item) {
      const me = this
      me.isLoadingAsset = true
      // set timeout 3s
      me.voucherItem = await item
      await me.getFixedAssetList()
      me.isLoadingAsset = false
    },
    /**
     * @description: Thực hiện xử lí các action thêm sửa xóa liên quan tới chứng từ
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 06/07/2023
     */
    handleAction(action, item) {
      const me = this
      switch (action) {
        case me.$msEnum.MS_ACTION.Add:
          me.$router.push('/asset/increase-asset/add-voucher')
          break
        case me.$msEnum.MS_ACTION.Edit:
          me.$router.push(
            `/asset/increase-asset/add-voucher/${item.voucher_id}`
          )
          break
        case me.$msEnum.MS_ACTION.Delete:
          me.onClickDeleteRow([item])
          break
        default:
          break
      }
    },
    /**
     * @description: Thực hiện xử lí hiển thị thông báo khi người dùng click vào nút xóa
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 29/06/2023
     */
    onClickDeleteRow(items) {
      const me = this
      let dialogMessage = ''
      // show message confirm
      if (items.length == 1) {
        let itemDelete = items[0]
        dialogMessage =
          `<div>${me.$msResource.DIALOG_MESSAGE.Voucher_Delete_OneRecord}</div>`.format(
            `<strong>${itemDelete.voucher_code}</strong>`
          )
      } else {
        dialogMessage =
          `<div>${me.$msResource.DIALOG_MESSAGE.Voucher_Delete_MultiRecord}</div>`.format(
            `<strong>${items.length}</strong>`
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
              me.deleteVoucher(items)
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
    },
    /**
     * @description: Thực hiện gọi api xóa dữ liệu
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 06/07/2023
     */
    async deleteVoucher(items) {
      const me = this
      var selectedList = []
      // thực hiện lấy ra danh sách id cần xóa
      items.forEach((item) => {
        selectedList.push(item.voucher_id)
      })
      try {
        // gọi api xóa dữ liệu
        const result = await me.$msApi.voucher.deleteVoucher(selectedList)
        // kiểm tra kết quả trả về
        if (result.status == me.$msEnum.MS_CODE.SUCCESS) {
          if (items.length == me.listVoucher.length) {
            if (me.voucherPagination.pageNumber > 1) {
              me.voucherPagination.pageNumber--
            }
          }
          me.voucherSelected = []
          me.showPopup(
            me.$msResource.POPUP_MESSAGE.Msg_Delete_Success,
            me.$msEnum.MS_POPUP_MODE.Success
          )
          me.loadData()
        } else {
          me.showPopup(
            me.$msResource.POPUP_MESSAGE.Msg_Delete_Failed,
            me.$msEnum.MS_POPUP_MODE.Error
          )
        }
      } catch (error) {
        console.log(error)
      }
      me.dialogInformation.isShowDialog = false
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
     * @description: Hàm thực hiện gọi api lấy dữ liệu theo paging và filter
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 05/05/2023
     */
    async loadData() {
      const me = this
      me.isLoadingVoucher = true
      // set time out 1s để tắt loading
      await me.getVourcherListByPaging()
      me.handleClickRow(me.listVoucher[0])
      me.isLoadingVoucher = false
    },
    /**
     * @description: Thực hiện gọi api lấy danh sách chứng từ
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 23/06/2023
     */
    async getVourcherListByPaging() {
      const me = this
      me.isLoadingVoucher = true
      var filters = []
      me.filterVoucher.forEach((filter) => {
        if (filter.value != '') {
          filters.push(filter)
        }
      })
      try {
        const result = await me.$msApi.voucher.getVouchersByPaging(
          me.voucherPagination.pageNumber,
          me.voucherPagination.pageSize,
          filters
        )
        if (result == null) {
          me.listVoucher = []
          me.totalRecord = 0
          me.summary.find((x) => x.field == 'total_orgprice').value = 0
        } else if (result.status == me.$msEnum.MS_CODE.SUCCESS) {
          me.listVoucher = await result.data.data.data
          me.totalRecord = await result.data.data.totalRecord
          me.summary.find((x) => x.field == 'total_orgprice').value =
            await result.data.data.summary.totalOfCost
        }
      } catch (error) {
        console.log(error)
      }
      me.isLoadingVoucher = false
    },

    /**
     * @description: Lấy danh sách tài sản cố định theo chứng từ
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 25/06/2023
     */
    async getFixedAssetList() {
      const me = this
      me.isLoadingAsset = true
      try {
        const result = await me.$msApi.fixed_asset.getAllByVoucher(
          me.voucherItem.voucher_id
        )
        if (result == null || result.status != me.$msEnum.MS_CODE.SUCCESS) {
          me.listAsset = []
        } else {
          me.listAsset = await result.data.data
        }
      } catch (error) {
        console.log(error)
      }
      me.isLoadingAsset = false
    },
    /**
     * @description: Thực hiện gọi api thêm mới chứng từ
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 10/07/2023
     */
    insertVoucher(voucher) {
      const me = this
      if (voucher != null) {
        me.hideModal()
        me.listVoucher.unshift(voucher)
        me.totalRecord += 1
        me.summary.find((x) => x.field == 'total_orgprice').value =
          me.summary.find((x) => x.field == 'total_orgprice').value +=
            voucher.total_orgprice
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
     * @description: Thực hiện gọi api cập nhật chứng từ
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 19/07/2023
     */
    async updateVoucher(voucher) {
      const me = this
      if (voucher != null) {
        me.hideModal()
        me.listVoucher.splice(me.voucherIndex, 1, voucher)
        me.showPopup(
          me.$msResource.POPUP_MESSAGE.Msg_Edit_Success,
          me.$msEnum.MS_POPUP_MODE.Success
        )
      } else {
        me.hideModal()
        me.showPopup(
          me.$msResource.POPUP_MESSAGE.Msg_Edit_Failed,
          me.$msEnum.MS_POPUP_MODE.Error
        )
      }
      me.loadData()
    },
    /**
     * @description: Thực hiện hiển thị form thêm mới chứng từ
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 20/06/2023
     */
    showWriteAssetForm() {
      this.$store.commit(
        'setActionStatus',
        this.$msEnum.MS_INCREASE_ASSET_ACTION.AddVoucher
      )
      this.$router.push('/asset/increase-asset/add-voucher')
    },
    /**
     * @description: Thực hiện xử lí khi người dùng click icon thay đổi layout
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 20/06/2023
     */
    handleLayout(option) {
      this.iconLayout = option
      this.$store.commit('setActionStatus', option.action)
    },
    /**
     * @description: Thục hiện ẩn modal
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/06/2023
     */
    hideModal() {
      this.$router.push('/asset/increase-asset')
    },
    /**
     * @description: Thực hiện xử lí khi người dùng click icon thay đổi zoom
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 20/06/2023
     */
    handleZoom(iconZoom) {
      this.$store.commit('setActionStatus', iconZoom.action)
      if (iconZoom.action === this.$msEnum.MS_INCREASE_ASSET_ACTION.ZoomIn) {
        this.iconZoom = {
          icon: 'ms-icon-3 ms-icon-zoom-out',
          text: 'Thu nhỏ',
          action: this.$msEnum.MS_INCREASE_ASSET_ACTION.ZoomOut,
        }
      } else {
        this.iconZoom = {
          icon: 'ms-icon-3 ms-icon-zoom-in',
          text: 'Phóng to',
          action: this.$msEnum.MS_INCREASE_ASSET_ACTION.ZoomIn,
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
      this.voucherPagination.pageNumber = pageNumber
      this.getVourcherListByPaging()
    },
    /**
     * @description: thực hiện load lại data khi người dùng thay đổi dropdown trên filter
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 25/05/2023
     */
    changeDropdown(value) {
      this.voucherPagination.pageSize = value.key
      this.voucherPagination.pageNumber = 1
      this.getVourcherListByPaging()
    },
  },
}
</script>

<style scoped>
.content-top__title {
  font-size: 22px;
  font-weight: 700;
  color: #333333;
}
.content-bottom__sub__title {
  font-size: 15px;
  font-weight: 700;
  color: #333333;
  display: flex;
  align-items: center;
}
.data-layout {
  display: flex;
  align-items: center;
  gap: 15px;
  border-radius: 4px;
  height: 100%;
  background-color: #fff;
  padding: 0px 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.data-layout .layout-icon {
  display: flex;
  align-items: center;
  height: 100%;
}
.layout-menu {
  position: absolute;
  top: 97px;
  right: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 999999;
  overflow: hidden;
}
.layout-menu .layout-menu__item {
  padding: 10px;
  display: flex;
  gap: 10px;
}
.layout-menu .layout-menu__item:hover {
  background-color: #d1edf4;
}
.table-content {
  border: none !important;
  border-radius: 0px !important;
}
.content-bottom {
  background-color: #fff;
  flex: 2;
  overflow: hidden;
}
.content-bottom__filter {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px 10px 15px;
  overflow: hidden;
}
.content-bottom__filter .input-group {
  overflow: hidden;
  width: 300px;
}
.input__field.flex-1 {
  flex: 1 !important;
}
.data-action .button__icon {
  height: 36px;
}
.data-action {
  gap: 20px;
}
.box1 {
  min-height: 0px;
}
.box2 {
  flex: 1;
  z-index: 999;
}
.content-bottom__sub {
  background-color: #fff;
  overflow: hidden;
}
.content-bottom__sub .content-bottom__filter {
  padding: 0px 15px 0px 15px !important;
}
.data-action .button__icon {
  height: 36px;
  width: 20px;
  user-select: none;
}
.handler {
  display: flex;
  justify-content: center;
  height: 1px;
  position: fixed;
  left: 57%;
}
.handler img {
  width: 15px;
  height: 15px;
  position: relative;
  top: -8px;
  z-index: 1000;
  cursor: ns-resize;
  user-select: none;
}
.container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 54px - 14px - 55px);
  gap: 10px;
}
button[type='btn-icon'] {
  box-shadow: none !important;
}
.main__content {
  flex: 1;
  background-color: #f4f7ff;
}
.data-action--icon {
  display: flex;
  gap: 10px;
}
@import url(@/css/layouts/content/content.css);
</style>