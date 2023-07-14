<template>
  <form action="" @keydown="handleKeydown">
    <div class="form__header">
      <div class="form__title">{{ formTitle }}</div>
      <MISATooltipV1 content="Esc">
        <div
          class="ms-24"
          @click="handleAssetAction(this.$msEnum.MS_ACTION.Cancel)"
        >
          <div class="ms-icon ms-18 ms-icon-arrow-close"></div>
        </div>
      </MISATooltipV1>
    </div>
    <div class="form__content" style="padding: 0px !important">
      <div class="data__content--filter flex space-between w-100">
        <MISAInput
          type="text"
          placeholder="Tìm kiếm theo mã tài sản, tên tài sản"
          className="input__field box-shadow-none"
          style="padding: 0px 12px 0px 0px !important"
          :isValidate="false"
          icon="ms-icon ms-22 ms-icon-search-black"
          v-model="assetFilter.textSearchFilter"
        ></MISAInput>
      </div>
      <div>
        <MISATable
          :listColumn="dataColumn"
          :tableStyle="{
            minHeight: '460px',
            maxHeight: '460px',
          }"
          :listData="assetList"
          :pagingOptions="assetPagination.pagingOptions"
          :totalRecord="assetPagination.totalRecord"
          :pageNumber="assetPagination.pageNumber"
          :pageSize="assetPagination.pageSize"
          @changePaging="changePaging"
          @changeDropdown="changeDropdown"
          v-model="assetSelected"
        ></MISATable>
        <MISALoading
          v-if="isLoadingAsset"
          :style="{
            top: '200px',
            width: '1200px',
            height: '410px',
          }"
        ></MISALoading>
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
          @click="handleAssetAction(button.action)"
        ></MISAButton>
      </MISATooltipV1>
    </div>
  </form>
</template>

<script>
import _ from 'lodash'
import MISALoading from '@/components/base/MISALoading.vue'
import MISATable from '@/components/base/MISATable.vue'
import MISAInput from '@/components/base/MISAInput.vue'
import MISAButton from '@/components/base/MISAButton.vue'
import MISATooltipV1 from '@/components/base/MISATooltipV1.vue'
export default {
  name: 'AssetSelectionForm',
  components: {
    MISATable,
    MISAInput,
    MISAButton,
    MISATooltipV1,
    MISALoading,
  },
  props: {
    formTitle: {
      type: String,
      default: 'Chọn tài sản',
    },
    dataColumn: {
      type: Array,
      default: () => [],
    },
    buttonFooter: {
      type: Array,
      default: () => [],
    },
    listData: {
      type: Array,
      default: () => [],
    },
    formMode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isLoadingAsset: false,
      assetList: [],
      assetPagination: {
        pageNumber: 1,
        pageSize: 10,
        totalRecord: 0,
        pagingOptions: [
          { key: 10, value: 10 },
          { key: 20, value: 20 },
          { key: 50, value: 50 },
          { key: 100, value: 100 },
        ],
      },
      assetFilter: {
        textSearchFilter: '',
      },
      assetSelected: [],
    }
  },
  async created() {
    await this.getFixedAssetList()
  },
  mounted() {
    this.$nextTick(() => {
      if (this.listData.length > 0) {
        this.assetSelected = this.listData
      }
    })
  },
  computed: {
    assetFilterParams() {
      let tempFilter = []
      if (
        this.assetFilter.textSearchFilter != null ||
        this.assetFilter.textSearchFilter != ''
      ) {
        tempFilter.push({
          field: 'fixed_asset_code',
          value: this.assetFilter.textSearchFilter,
          condition: this.$msEnum.MS_FILTER_CONDITION.Like,
          operators: this.$msEnum.MS_FILTER_OPERATOR.Or,
        })
        tempFilter.push({
          field: 'fixed_asset_name',
          value: this.assetFilter.textSearchFilter,
          condition: this.$msEnum.MS_FILTER_CONDITION.Like,
        })
      }
      return tempFilter
    },
  },
  watch: {
    'assetFilter.textSearchFilter': _.debounce(function () {
      this.assetPagination.pageNumber = 1
      this.getFixedAssetList()
    }, 500),
  },
  methods: {
    /**
     * @description:
     * @param: {any}
     * @return: {any} 27/06/2023
     */
    handleKeydown(event) {
      console.log(event.keyCode)
    },
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 27/06/2023
     */
    async handleAssetAction(action) {
      const me = this
      switch (action) {
        case me.$msEnum.MS_ACTION.Close:
          me.$emit('closeForm')
          break
        case me.$msEnum.MS_ACTION.Cancel:
          me.$emit('closeForm')
          break
        case me.$msEnum.MS_ACTION.Save:
          me.$emit('assetSelected', me.assetSelected);
          break
        default:
          break
      }
    },
    /**
     * @description: lấy ra tất cả các tài sản thuộc chứng từ tăng tài sản
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 28/06/2023
     */
    async getAssetListInVouchers() {
      const me = this
      const result = await me.$msApi.voucher_detail.getAllVoucherDetails()
      if (result) {
        return result.data.data
      } else {
        return []
      }
    },
    /**
     * @description: xử lí điều kiện lọc tài sản
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 28/06/2023
     */
    handleCondition(assetList) {
      let tempAssetList = []
      assetList.forEach((asset) => {
        tempAssetList.push(asset.fixed_asset_id)
      })
      return tempAssetList
    },
    /**
     * @description: lấy ra danh sách tài sản chưa thuộc bất kì chứng từ nào
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 27/06/2023
     */
    async getFixedAssetList() {
      const me = this
      me.isLoadingAsset = true
      let filters = []
      filters.push({
        field: 'fixed_asset_id',
        value: me.handleCondition(await me.getAssetListInVouchers()),
        condition: me.$msEnum.MS_FILTER_CONDITION.NotIn,
        operators: me.$msEnum.MS_FILTER_OPERATOR.And,
      })
      filters = [...filters, ...me.assetFilterParams]
      // duyệt qua các phần tử trong mảng filter để lấy ra các phần tử có giá trị khác null
      filters = filters.filter(
        (filter) => filter.value != null && filter.value != ''
      )
      const result = await me.$msApi.fixed_asset.getListByPagination(
        me.assetPagination.pageNumber,
        me.assetPagination.pageSize,
        filters
      )
      if (result) {
        me.assetList = result.data.data.data
        me.assetPagination.totalRecord = result.data.data.totalRecord
      } else {
        me.assetList = []
      }
      me.isLoadingAsset = false
    },
    /**
     * @description: Thực hiện load lại data khi người dùng click paging dưới table
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 25/05/2023
     */
    changePaging(pageNumber) {
      this.assetPagination.pageNumber = pageNumber
      this.getFixedAssetList()
    },
    /**
     * @description: thực hiện load lại data khi người dùng thay đổi dropdown trên filter
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 25/05/2023
     */
    changeDropdown(value) {
      this.assetPagination.pageSize = value.key
      this.assetPagination.pageNumber = 1
      this.getFixedAssetList()
    },
  },
}
</script>

<style scoped>
.form__header {
  border-bottom: 1px solid #ebeef5 !important;
}
.data__content--filter {
  padding: 10px 15px;
}
.data__content--filter .input-group {
  width: 300px;
}
</style>