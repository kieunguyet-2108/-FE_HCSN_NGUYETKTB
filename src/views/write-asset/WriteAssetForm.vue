<template>
  <div>
    <template v-if="false">
      <MISAModal style="min-width: 1200px; width: 1200px; min-height: 650px">
        <form action="">
          <div class="form__header">
            <div class="form__title">{{ formTitle }}</div>
            <MISATooltipV1 content="Esc">
              <div class="ms-24" @click="closeModal">
                <div class="ms-icon ms-18 ms-icon-arrow-close"></div>
              </div>
            </MISATooltipV1>
          </div>
          <div class="form__content">
            <div class="asset-write__form">
              <div class="form__content--header">Thông tin chứng từ</div>
              <div class="form__content-write-asset">
                <div class="form__content--item">
                  <div class="form__group">
                    <MISAInput
                      type="text"
                      placeholder="Mã chứng từ"
                      className="input__field "
                      label="Mã chứng từ"
                      :isFocus="true"
                      :required="true"
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
                    ></MISADatePicker>
                  </div>
                </div>
                <div class="form__content--item">
                  <div class="form__group">
                    <MISAInput
                      type="text"
                      className="input__field "
                      label="Ghi chú"
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
                  ></MISAInput>
                  <div class="data-action">
                    <div class="action-item flex column tooltip">
                      <MISATooltipV1 content="Chọn tài sản">
                        <MISAButton
                          ref="deleteButton"
                          class="button button__outline"
                          text="Chọn tài sản"
                        ></MISAButton>
                      </MISATooltipV1>
                    </div>
                  </div>
                </div>
                <MISATable
                  :listColumn="dataColumn"
                  :tableStyle="{
                    position: 'static',
                  }"
                ></MISATable>
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
              ></MISAButton>
            </MISATooltipV1>
            <MISATooltipV1 content="Esc">
              <MISAButton
                ref="cancelButton"
                class="button button__outline border-none"
                text="Hủy"
              ></MISAButton>
            </MISATooltipV1>
          </div>
        </form>
      </MISAModal>
    </template>
    <template v-if="true">
      <MISAModal style="min-width: 1200px; width: 1200px; min-height: 650px">
        <form action="">
          <div class="form__header">
            <div class="form__title">Chọn tài sản ghi tăng</div>
            <MISATooltipV1 content="Esc">
              <div class="ms-24" @click="closeModal">
                <div class="ms-icon ms-18 ms-icon-arrow-close"></div>
              </div>
            </MISATooltipV1>
          </div>
          <div class="form__content" style="padding: 0">
            <div class="data__content">
              <!-- <div class="data__content--header">Thông tin chi tiết</div> -->
              <div class="data__content-detail-data">
                <div class="data__content--filter flex space-between w-100">
                  <MISAInput
                    type="text"
                    placeholder="Tìm kiếm theo mã tài sản, tên tài sản"
                    className="input__field box-shadow-none"
                    style="padding: 0px 12px 0px 0px !important"
                    :isValidate="false"
                    icon="ms-icon ms-22 ms-icon-search-black"
                  ></MISAInput>
                </div>
                <MISATable
                  :listColumn="assetColumn"
                  :tableStyle="{
                    position: 'static',
                  }"
                ></MISATable>
              </div>
            </div>
          </div>

          <div class="form__footer gap-10" @keydown="footerKeydown">
            <!-- flex row justify-content-end -->
            <MISATooltipV1 content="Ctrl + S">
              <MISAButton
                ref="saveButton"
                class="button button__main"
                text="Đồng ý"
              ></MISAButton>
            </MISATooltipV1>
            <MISATooltipV1 content="Esc">
              <MISAButton
                ref="cancelButton"
                class="button button__outline border-none"
                text="Hủy bỏ"
              ></MISAButton>
            </MISATooltipV1>
          </div>
        </form>
      </MISAModal>
    </template>
  </div>
</template>

<script>
import MISATable from "@/components/base/MISATable.vue";
import MISAModal from "@/components/base/MISAModal.vue";
import MISAInput from "@/components/base/MISAInput.vue";
import MISAButton from "@/components/base/MISAButton.vue";
import MISATooltipV1 from "@/components/base/MISATooltipV1.vue";
import MISADatePicker from "@/components/base/MISADatePicker.vue";
export default {
  name: "WriteAssetForm",
  components: {
    MISAModal,
    MISAInput,
    MISAButton,
    MISATooltipV1,
    MISADatePicker,
    MISATable,
  },
  props: {
    dataColumn: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      formTitle: "Thêm chứng từ ghi tăng",
      assetColumn: [
        {
          key: "",
          name: "checkbox",
          columnWidth: "20px",
          maxColumnWidth: "20px",
          minColumnWidth: "20px",
          columnType: this.$msEnum.COLUMN_TYPE.Checkbox,
          type: "checkbox",
        },
        ...this.dataColumn,
      ],
    };
  },
  methods: {
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 21/06/2023
     */
    closeModal() {
      this.$router.push("/write-asset");
    },
  },
};
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
  padding: 10px 15px;
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
.table-content {
  border: none !important;
  border-radius: 0px !important;
}
@import url(@/css/components/form.css);
</style>