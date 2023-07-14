<template>
  <div>
    <MISAModal
      style="min-width: 1200px; width: 1200px; min-height: 680px; height: 680px"
    >
      <form action="" v-if="!isShowAssetSelectionForm">
        <div class="form__header">
          <div class="form__title">{{ formTitle }}</div>
          <MISATooltipV1 content="Esc">
            <div
              class="ms-24"
              @click="handleAction(this.$msEnum.MS_ACTION.Cancel)"
            >
              <div class="ms-icon ms-18 ms-icon-arrow-close"></div>
            </div>
          </MISATooltipV1>
        </div>
        <div class="form__content">
          <div id="add-voucher">
            <div class="asset-write__form">
              <div class="form__content--header">Thông tin chứng từ</div>
              <div class="form__content-write-asset">
                <div class="form__content--item">
                  <div class="form__group">
                    <MISAInput
                      ref="voucher_code"
                      type="text"
                      placeholder="Mã chứng từ"
                      className="input__field "
                      label="Mã chứng từ"
                      :isFocus="true"
                      :required="true"
                      :maxLength="100"
                      :minLength="1"
                      v-model="voucherInfo.voucher_code"
                    ></MISAInput>
                  </div>
                  <div class="form__group">
                    <MISADatePicker
                      className="write_asset_date"
                      ref="start_using_date"
                      label="Ngày bắt đầu sử dụng"
                      :required="true"
                      format="dd/MM/yyyy"
                      id="start_using_date"
                      name="start_using_date"
                      v-model="voucherInfo.voucher_date"
                    ></MISADatePicker>
                  </div>
                  <div class="form__group">
                    <MISADatePicker
                      className="write_asset_date"
                      ref="write_increase_date"
                      label="Ngày ghi tăng"
                      :required="true"
                      format="dd/MM/yyyy"
                      id="write_increase_date"
                      name="write_increase_date"
                      v-model="voucherInfo.increment_date"
                    ></MISADatePicker>
                  </div>
                </div>
                <div class="form__content--item">
                  <div class="form__group">
                    <MISAInput
                      type="text"
                      className="input__field "
                      label="Ghi chú"
                      :maxLength="500"
                      :minLength="0"
                      v-model="voucherInfo.description"
                    ></MISAInput>
                  </div>
                </div>
              </div>
            </div>
            <div class="data__content">
              <div class="data__content--header">Thông tin chi tiết</div>
              <div class="data__content-detail-data">
                <div class="data__content--filter flex space-between w-100">
                  <MISAInput
                    type="text"
                    placeholder="Tìm kiếm theo mã tài sản, tên tài sản"
                    className="input__field box-shadow-none"
                    style="padding: 0px 12px 0px 0px !important"
                    :isValidate="false"
                    icon="ms-icon ms-22 ms-icon-search-black"
                    :minLength="0"
                    :maxLength="255"
                    v-model="searchText"
                  ></MISAInput>
                  <div class="data-action">
                    <div class="action-item flex column tooltip">
                      <MISATooltipV1 content="Chọn tài sản">
                        <MISAButton
                          ref="deleteButton"
                          class="button button__outline"
                          text="Chọn tài sản"
                          @click="handleChooseAsset"
                        ></MISAButton>
                      </MISATooltipV1>
                    </div>
                  </div>
                </div>
                <div>
                  <MISATable
                    :listColumn="assetColumn"
                    :listData="filteredData"
                    :totalRecord="totalRecords"
                    :tableStyle="{
                      minHeight: '170px',
                      maxHeight: '170px',
                    }"
                    :isCheckEmpty="false"
                    :pagingOptions="pagingOptions"
                    @changePaging="changePagingAssetPagination"
                    @changeDropdown="changeDropdownAssetPagination"
                    :pageNumber="pageNumber"
                    :pageSize="pageSize"
                    :summary="summary"
                    @edit="handleAction"
                    @delete="handleAction"
                  ></MISATable>
                  <MISALoading
                    v-if="assetLoading"
                    :style="{
                      top: '470px',
                      width: 'calc(1200px - 36px)',
                      height: '130px',
                    }"
                  ></MISALoading>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form__footer gap-10" @keydown="footerKeydown">
          <!-- flex row justify-content-end -->
          <MISATooltipV1
            :content="button.buttonTooltip"
            v-for="(button, index) in buttonFooter"
            :key="index"
          >
            <MISAButton
              ref="saveButton"
              :class="button.buttonClass"
              :text="button.text"
              @click="handleAction(button.action)"
            ></MISAButton>
          </MISATooltipV1>
        </div>
      </form>
      <AssetSelectionFormVue
        v-if="isShowAssetSelectionForm"
        :formTitle="formTitle"
        :dataColumn="assetColumn"
        :buttonFooter="buttonFooter"
        :listData="tableData"
        :formMode="formMode"
        @assetSelected="handleAssetSelected"
        @closeForm="closeAssetSelectionForm"
      ></AssetSelectionFormVue>
    </MISAModal>
    <MISADialog
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
    <BudgetAssetForm
      v-if="budgetInfo.isShowBudgetAssetForm"
      :item="budgetInfo.item"
      :voucherInfo="voucherInfo"
      :budgetInfomation="budgetInfo.budgetInfomation"
      :formMode="formMode"
      @close="budgetInfo.isShowBudgetAssetForm = false"
      @submitBudgetDetail="handleBudgetDetail"
    ></BudgetAssetForm>
  </div>
</template>

<script>
/* eslint-disable */
import _ from 'lodash'
import BudgetAssetForm from './BudgetAssetForm.vue'
import AssetSelectionFormVue from '@/views/increase-asset/AssetSelectionForm.vue'
import column from '@/js/column.js'
import MISATable from '@/components/base/MISATable.vue'
import MISAModal from '@/components/base/MISAModal.vue'
import MISAInput from '@/components/base/MISAInput.vue'
import MISAButton from '@/components/base/MISAButton.vue'
import MISATooltipV1 from '@/components/base/MISATooltipV1.vue'
import MISADatePicker from '@/components/base/MISADatePicker.vue'
import MISADialog from '@/components/base/MISADialog.vue'
import MISAPopup from '@/components/base/MISAPopup.vue'
import MISALoading from '@/components/base/MISALoading.vue'
export default {
  name: 'WriteAssetForm',
  components: {
    MISAModal,
    MISAInput,
    MISAButton,
    MISATooltipV1,
    MISADatePicker,
    MISATable,
    MISADialog,
    MISAPopup,
    AssetSelectionFormVue,
    MISALoading,
    BudgetAssetForm,
  },
  props: {
    dataColumn: {
      type: Array,
      default: () => [],
    },
    voucher_id: {
      type: String,
      default: '',
    },
  },
  async created() {
    const me = this
    let date = new Date()
    this.assetColumn = column.formAssetColumns
    // nếu voucher_id null thì là form thêm mới
    if (this.voucher_id == null || this.voucher_id == '') {
      this.formTitle = 'Thêm chứng từ ghi tăng'
      this.formMode = me.$msEnum.FORM_MODE.Add
      this.voucherInfo.voucher_code = await this.getNewVoucherCode()
      // gán ngày hiện tại cho voucher date và increment date
      this.voucherInfo.voucher_date = date
      this.voucherInfo.increment_date = date
    } else {
      // ngược lại là form sửa
      this.formTitle = 'Sửa chứng từ ghi tăng'
      this.formMode = me.$msEnum.FORM_MODE.Edit
      await this.getVoucherInfo()
      await this.getAssetListByVoucher()
      // kiểm tra nếu voucher date hoặc increment date null thì gán ngày hiện tại
      if (
        this.voucherInfo.voucher_date == null ||
        this.voucherInfo.voucher_date == ''
      ) {
        this.voucherInfo.voucher_date = date
      }
      if (
        this.voucherInfo.increment_date == null ||
        this.voucherInfo.increment_date == ''
      ) {
        this.voucherInfo.increment_date = date
      }
    }
  },
  data() {
    return {
      formTitle: this.$t('Asset.AddIncreaseVoucher'), // tiêu đề form
      assetLoading: false, // loading khi lấy danh sách tài sản
      formMode: null, // chế độ form
      budgetInfo: {
        // thông tin form ngân sách
        isShowBudgetAssetForm: false,
        item: {},
        budgetInfomation: [],
      },
      isShowAssetSelectionForm: false, // hiển thị form chọn tài sản
      assetColumn: [], // cột của bảng tài sản
      buttonFooter: [
        // danh sách button ở footer
        {
          text: 'Lưu',
          buttonClass: 'button button__main',
          buttonTooltip: 'Ctrl + S',
          action: this.$msEnum.MS_ACTION.Save,
        },
        {
          text: 'Hủy',
          buttonClass: 'button button__outline border-none',
          buttonTooltip: 'Esc',
          action: this.$msEnum.MS_ACTION.Cancel,
        },
      ],
      voucherInfo: {
        // thông tin chứng từ
        voucher_id: '',
        voucher_code: '',
        voucher_date: '',
        increment_date: '',
        total_orgprice: 0,
        description: '',
        created_by: '',
        created_date: null,
        modified_by: '',
        modified_date: null,
      },
      errorMessages: [],
      dialogInformation: {},
      popupInformation: {},
      pagingOptions: [
        { key: 10, value: 10 },
        { key: 20, value: 20 },
        { key: 50, value: 50 },
        { key: 100, value: 100 },
      ],
      tableData: [], // Dữ liệu của bảng
      filteredData: [], // Dữ liệu sau khi được lọc
      pageNumber: 1, // Trang hiện tại
      pageSize: 10, // Kích thước trang
      totalRecords: 0, // Tổng số bản ghi
      searchText: '', // Từ khóa tìm kiếm
      summary: [
        {
          field: 'cost',
          value: 0,
          width: '100px',
        },
      ], // Tổng hợp
      selectedItems: [], // Các bản ghi được chọn
      originalData: [], // Dữ liệu gốc
      budgetList: [], // Danh sách ngân sách
    }
  },
  watch: {
    searchText: _.debounce(function () {
      this.pageNumber = 1
      this.filterAndPagingData()
    }, 500),
    pageNumber: function () {
      this.filterAndPagingData()
    },
    pageSize: function () {
      this.filterAndPagingData()
    },
    tableData: function () {
      this.filterAndPagingData()
    },
  },
  methods: {
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 10/07/2023
     */
    handleBudgetDetail(item, id) {
      // tìm kiếm thông tin tài sản
      const me = this
      const fixed_asset_item = me.tableData.find((x) => x.fixed_asset_id == id)
      // set lại thông tin tài sản
      fixed_asset_item.budget_detail = item
      // đóng form
      me.budgetInfo.isShowBudgetAssetForm = false
    },
    /**
     * @description: Thực hiện lấy ra thông tin chứng từ theo id
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 27/06/2023
     */
    async getVoucherInfo() {
      const me = this
      const result = await me.$msApi.voucher.getVoucherById(me.voucher_id)
      if (result == null) return
      if (result.status == me.$msEnum.MS_CODE.SUCCESS) {
        this.voucherInfo = await result.data.data
      }
    },
    /**
     * @description: Lấy danh sách tài sản cố định theo chứng từ
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 25/06/2023
     */
    async getAssetListByVoucher() {
      const me = this
      me.assetLoading = true
      try {
        const rs = await me.$msApi.fixed_asset.getAllByVoucher(
          me.voucherInfo.voucher_id
        )
        if (rs == null) {
          me.originalData = []
        }
        if (rs.status == me.$msEnum.MS_CODE.SUCCESS) {
          me.originalData = await rs.data.data
        } else {
          me.originalData = []
        }
        me.tableData = me.originalData
      } catch (error) {
        console.log(error)
      }
      me.assetLoading = false
    },
    /**
     * @description: Thực hiện xử lí khi người dùng chọn tài sản của chứng từ
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 27/06/2023
     */
    async handleAssetSelected(assets) {
      const me = this
      await me.handleAfterChooseAsset()
      if (me.formMode == me.$msEnum.FORM_MODE.Add) {
        me.tableData = assets
        me.searchText = ''
      } else if (me.formMode == me.$msEnum.FORM_MODE.Edit) {
        let list = []
        // nếu item không tồn tại trong danh sách thì thêm vào danh sách và set isInsert = true
        for (let i = 0; i < assets.length; i++) {
          const item = assets[i]
          const index = me.tableData.findIndex(
            (x) => x.fixed_asset_id == item.fixed_asset_id
          )
          if (index == -1) {
            item.action = me.$msEnum.MS_ACTION_TYPE.Add
            list.push(item)
          } else {
            list.push(item)
          }
        }
        me.tableData = list
        me.searchText = ''
      }
    },
    closeAssetSelectionForm() {
      const me = this
      me.handleAfterChooseAsset()
    },
    /**
     * @description: Thực hiện xử lí sau khi chọn tài sản
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 13/07/2023
     */
    async handleAfterChooseAsset() {
      const me = this
      me.isShowAssetSelectionForm = false
      me.assetColumn = await column.formAssetColumns
      // kiểm tra nếu form mode là thêm mới thì thực hiện thêm mới
      if (me.formMode == me.$msEnum.FORM_MODE.Add) {
        me.formTitle = 'Thêm chứng từ ghi tăng'
        me.buttonFooter[0].text = 'Lưu'
        me.buttonFooter[1].text = 'Hủy'
      } else if (me.formMode == me.$msEnum.FORM_MODE.Edit) {
        me.formTitle = 'Sửa chứng từ ghi tăng'
        me.buttonFooter[0].text = 'Lưu'
        me.buttonFooter[1].text = 'Hủy'
      }
    },
    /**
     * @description: Thực hiện lấy ra danh sách tài sản thuộc chứng từ theo phân trang và lọc dữ liệu
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 10/07/2023
     */
    filterAndPagingData() {
      const me = this
      me.assetLoading = true
      // lấy ra danh sách cần hiển thị
      var orgList = me.searchText
        ? this.tableData.filter(
            (item) =>
              item.fixed_asset_name
                .toLowerCase()
                .includes(this.searchText.toLowerCase()) ||
              item.fixed_asset_code
                .toLowerCase()
                .includes(this.searchText.toLowerCase())
          )
        : this.tableData
      // lọc dữ liệu theo action type
      orgList = orgList.filter(
        (x) => x.action != me.$msEnum.MS_ACTION_TYPE.Delete
      )
      // gán lại số bản ghi và số trang
      me.totalRecords = orgList.length
      // phân trang
      const startIndex = (me.pageNumber - 1) * me.pageSize
      const endIndex = me.pageNumber * me.pageSize
      me.filteredData = orgList.slice(startIndex, endIndex)
      console.log(me.filteredData)
      // tính tổng cost
      me.summary.find((x) => x.field == 'cost').value = me.filteredData.reduce(
        (sum, item) => sum + item.cost,
        0
      )
      me.assetLoading = false
    },
    /**
     * @description: Xử lý sự kiện khi nhấn phím chọn tài sản
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 26/06/2023
     */
    handleChooseAsset() {
      const me = this
      me.formTitle = 'Chọn tài sản ghi tăng'
      me.buttonFooter[0].text = 'Đồng ý'
      me.buttonFooter[1].text = 'Hủy bỏ'
      me.assetColumn = [
        {
          key: 'fixed_asset_id',
          name: 'checkbox',
          class: 'asset-checkbox',
          columnWidth: '30px',
          maxColumnWidth: '30px',
          minColumnWidth: '30px',
          columnType: me.$msEnum.COLUMN_TYPE.Checkbox,
          type: 'checkbox',
        },
        ...column.assetColumns,
      ]
      me.isShowAssetSelectionForm = true
    },
    /**
     * @description: Thực hiện lấy ra mã code chứng từ mới nhất
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 26/06/2023
     */
    async getNewVoucherCode() {
      const me = this
      try {
        const result = await me.$msApi.voucher.getNewCode()
        if (result == null) return null
        if (result.status == me.$msEnum.MS_CODE.SUCCESS) {
          return result.data.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * @description: Thực hiện xử lí hành động của người dùng
     * @param:
     * action: hành động của người dùng
     * item: dữ liệu của bản ghi được chọn
     * @return: {any}
     * @author: NguyetKTB 27/06/2023
     */
    async handleAction(action, item = null) {
      const me = this
      switch (action) {
        case me.$msEnum.MS_ACTION.Save:
          // thực hiện validate dữ liệu
          let isValidate = await me.handleData()
          if (!isValidate) {
            me.handleErrorMessage()
          } else {
            // xử lí dữ liệu trước khi lưu
            me.handleDataBeforeSave()
            if (me.formMode == me.$msEnum.FORM_MODE.Add) {
              // thực hiện lưu dữ liệu
              var voucher = await me.insertVoucher()
              // thực hiện chuyển trang
              me.$emit('insertVoucher', voucher)
            } else if (me.formMode == me.$msEnum.FORM_MODE.Edit) {
              // thực hiện lưu dữ liệu
              var voucher = await me.updateVoucher()
              // thực hiện chuyển trang
              me.$emit('updateVoucher', voucher)
            }
          }
          break
        case me.$msEnum.MS_ACTION.Cancel:
          me.cancelForm()
          break
        case me.$msEnum.MS_ACTION.Close:
          me.$router.push('/asset/increase-asset')
          break
        case me.$msEnum.MS_ACTION.Edit:
          me.budgetInfo.item = item
          var list =
            (await me.getBudgetDetailByAsset(item, me.voucherInfo)) ?? []
          var itemBudgets = item.budget_detail ?? []
          console.log('itemBudgets', itemBudgets)
          if (itemBudgets.length == 0) {
            itemBudgets = list
          }
          me.budgetInfo.budgetInfomation = itemBudgets
          me.budgetInfo.isShowBudgetAssetForm = true
          break
        case me.$msEnum.MS_ACTION.Delete:
          // thực hiện xóa dữ liệu
          me.removeAsset(item)
          break
        default:
          break
      }
    },

    /**
     * @description: Lấy ra danh sách nguồn chi phí theo tài sản và chứng từ
     * @param:
     * asset: tài sản được chọn
     * voucher: chứng từ được chọn
     * @return: {any}
     * @author: NguyetKTB 12/07/2023
     */
    async getBudgetDetailByAsset(asset, voucher) {
      const me = this
      try {
        const result = await me.$msApi.budget_detail.getBudgetDetailsByAsset(
          asset.fixed_asset_id,
          voucher.voucher_id
        )
        if (result == null) return []
        if (result.status == me.$msEnum.MS_CODE.SUCCESS) {
          return result.data.data
        }
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/07/2023
     */
    removeAsset(item) {
      const me = this
      // nếu action là Add voucher
      if (me.formMode == me.$msEnum.FORM_MODE.Add) {
        // xóa item khỏi danh sách
        me.tableData = me.tableData.filter((x) => x != item)
      } else if (me.formMode == me.$msEnum.FORM_MODE.Edit) {
        // tìm item trong danh sách
        let fixed_asset_item = me.tableData.find(
          (x) => x.fixed_asset_id == item.fixed_asset_id
        )
        if (fixed_asset_item.action == me.$msEnum.MS_ACTION_TYPE.Add) {
          // xóa item khỏi danh sách
          me.tableData = me.tableData.filter((x) => x != item)
        } else {
          // set lại thông tin tài sản
          fixed_asset_item.action = me.$msEnum.MS_ACTION_TYPE.Delete
        }
      }
      this.filterAndPagingData()
    },
    /**
     * @description: Thực hiện xử lí dữ liệu trước khi lưu
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/07/2023
     */
    handleDataBeforeSave() {
      const me = this
      // duyệt qua danh sách tài sản : add budget detail
      let budgetList = []
      me.tableData.forEach((item) => {
        if (item.budget_detail == null) {
          item.budget_detail = []
        }
        for (let i = 0; i < item.budget_detail.length; i++) {
          budgetList = budgetList.concat(item.budget_detail[i])
        }
      })
      // loại bỏ các budget detail
      me.tableData.forEach((item) => {
        item.budget_detail = null
      })
      // gán lại danh sách budget detail
      me.budgetList = budgetList
    },
    /**
     * @description: thực hiện valdiate dữ liệu
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 29/06/2023
     */
    async handleData() {
      const me = this
      const voucher = me.voucherInfo
      var errors = []
      // voucher code length >= 1 && <= 100
      if (voucher.voucher_code.length == 0) {
        errors.push({
          field: 'voucher_code',
          content: me.$msResource.VALIDATE.Required.format('Mã chứng từ '),
        })
      } else if (voucher.voucher_code.length > 100) {
        errors.push({
          field: 'voucher_code',
          content: me.$msResource.VALIDATE.MaxLength.format(
            'Mã chứng từ ',
            100
          ),
        })
      } else {
        // validate trùng mã chứng từ
        let isDuplicate = await this.duplicateVoucherCode(voucher)
        if (!isDuplicate) {
          errors.push({
            field: 'voucher_code',
            content: me.$msResource.VALIDATE.Duplicate.format('Mã chứng từ '),
          })
        }
      }
      me.errorMessages = errors
      if (errors.length > 0) return false
      else {
        if (me.tableData.length == 0) {
          me.errorMessages.push({
            field: '',
            content: me.$msResource.ERROR_MESSAGE.Empty_Data,
          })
          return false
        }
      }
      return true
    },
    /**
     * @description: Hiển thị error message khi submit dữ liệu
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 29/06/2023
     */
    handleErrorMessage() {
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
              buttonClass: 'button button__main',
              isFocus: true,
              onclick: () => {
                me.dialogInformation.isShowDialog = false
                // duyệt message để focus vào control lỗi đầu tiên
                messages.forEach((message) => {
                  if (message.field == '') return
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
     * @description: Thực hiện thêm mới chứng từ
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 06/07/2023
     */
    async insertVoucher() {
      const me = this
      const date = new Date()
      try {
        const result = await me.$msApi.voucher.insertVoucher(
          me.voucherInfo,
          me.tableData,
          me.budgetList
        )
        if (result.status == me.$msEnum.MS_CODE.CREATED) {
          return result.data.data
        }
      } catch (error) {
        console.log(error)
      }
      return null
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 12/07/2023
     */
    async updateVoucher() {
      const me = this
      const date = new Date()
      try {
        const result = await me.$msApi.voucher.updateVoucher(
          me.voucherInfo,
          me.tableData,
          me.budgetList
        )
        if (result == null) return null
        if (result.status == me.$msEnum.MS_CODE.SUCCESS) {
          return result.data.data
        }
      } catch (error) {
        console.log(error)
      }
      return null
    },
    /**
     * @description: Thực hiện gọi api kiểm tra mã chứng từ có trùng hay không
     * @param: item - chứng từ cần kiểm tra
     * @return: true - mã chứng từ không trùng, false - mã chứng từ trùng với mã chứng từ khác
     * @author: NguyetKTB 29/06/2023
     */
    async duplicateVoucherCode(item) {
      const me = this
      try {
        const result = await me.$msApi.voucher.checkDuplicateVoucherCode(
          item.voucher_code,
          item.voucher_id
        )
        if (result == null) return null
        else {
          return result.status == me.$msEnum.MS_CODE.SUCCESS ? true : false
        }
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 29/06/2023
     */
    changePagingAssetPagination(pageNumber) {
      this.pageNumber = pageNumber
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}  NguyetKTB 03/05/2023
     */
    changeDropdownAssetPagination(value) {
      this.pageSize = value.value
      this.pageNumber = 1
    },
    /**
     * @description: Thực hiện thao tác khi người dùng click button "hủy" trên form
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 03/05/2023
     */
    cancelForm() {
      const me = this
      let message = ''
      if ((this.formMode = me.$msEnum.FORM_MODE.Add)) {
        message = this.$msResource.DIALOG_MESSAGE.Cancel_Add.format('chứng từ')
      } else if ((this.formMode = me.$msEnum.FORM_MODE.Edit)) {
        message = this.$msResource.DIALOG_MESSAGE.Cancel_Edit
      }
      this.dialogInformation = {
        isShowDialog: true,
        messages: [
          {
            field: '1',
            content: message,
            style: 'display: flex; flex-direction: column;',
          },
        ],
        buttonList: [
          {
            text: 'Hủy bỏ',
            buttonClass: 'button button__main',
            isFocus: true,
            onclick: () => {
              me.$router.push('/asset/increase-asset')
            },
          },
          {
            text: 'Không',
            buttonClass: 'button button__outline',
            onclick: () => {
              me.dialogInformation.isShowDialog = false;
            },
          },
        ],
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
  },
}
</script>

<style scoped>
.form__content,
.data__content {
  background-color: #f4f7ff;
}
.form__content-write-asset .form__content--item:first-child .form__group {
  flex: 1 !important;
}
.form__content--header,
.data__content--header {
  padding: 10px 0px;
  font-size: 18px;
  font-weight: bold;
}
.form__content-write-asset {
  background-color: #fff;
  padding: 15px 15px 0px 15px;
  border-radius: 4px;
}
.data__content-detail-data {
  background-color: #fff;
  border-radius: 4px;
}
.data__content--filter {
  padding: 10px 15px;
}
.data__content--filter .input-group {
  width: 300px;
}
@import url(@/css/components/form.css);
</style>