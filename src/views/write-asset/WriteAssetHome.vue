<template>
  <div style="height: 100%">
    <div class="content" style="height: 100%">
      <div class="content-top">
        <div class="content-top__title">Ghi tăng tài sản</div>
        <div class="data-action">
          <MISAButton
            class="button button__main"
            text="Thêm"
          ></MISAButton>
          <div
            class="data-layout"
            v-clickOutside="
              () => {
                isShowLayoutMenu = false;
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
      <div class="content-bottom" v-if="isShowWriteAssetList">
        <div class="content-bottom__filter">
          <MISAInput
            type="text"
            placeholder="Tìm kiếm theo số chứng từ, nội dung"
            className="input__field box-shadow-none flex-1"
            style="padding: 0px 12px 0px 0px !important"
            :isValidate="false"
            icon="ms-icon ms-22 ms-icon-search-black"
          ></MISAInput>
          <div class="data-action">
            <div class="action-item flex column tooltip">
              <MISATooltipV1 content="Xóa">
                <MISAButton
                  ref="deleteButton"
                  class="button__icon box-shadow-none"
                  icon="ms-icon-trash-red ms-24"
                ></MISAButton>
              </MISATooltipV1>
            </div>
            <div class="action-item flex column tooltip">
              <MISATooltipV1 content="In">
                <MISAButton
                  class="button__icon box-shadow-none"
                  icon="ms-icon ms-icon-print ms-18"
                ></MISAButton>
              </MISATooltipV1>
            </div>
            <div class="action-item flex column tooltip">
              <MISATooltipV1 content="Tiện ích">
                <MISAButton
                  class="button__icon box-shadow-none"
                  icon="ms-icon ms-icon-three-dot"
                ></MISAButton>
              </MISATooltipV1>
            </div>
          </div>
        </div>
        <MISATable
          :listData="listVoucher"
          :listColumn="voucherColumns"
          v-model="selectedItems"
        ></MISATable>
      </div>
      <div class="content-bottom content-bottom__sub" v-if="isShowAssetList">
        <div class="content-bottom__filter">
          <div class="content-bottom__sub__title">Thông tin chi tiết</div>
          <div class="data-action">
            <div class="action-item flex column tooltip">
              <MISATooltipV1 :content="iconZoom.text">
                <MISAButton
                  ref="deleteButton"
                  class="button__icon box-shadow-none"
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
          :isShowFooter="false"
        ></MISATable>
      </div>
    </div>
    <router-view :dataColumn="assetColumns"></router-view>
  </div>
</template>

<script>
import column from "@/js/column.js";
import vClickOutside from "click-outside-vue3";
import MISATable from "@/components/base/MISATable.vue";
import MISAButton from "@/components/base/MISAButton.vue";
import MISAInput from "@/components/base/MISAInput.vue";
export default {
  name: "AssetIncreaseRecording",
  components: {
    MISAButton,
    MISATable,
    MISAInput,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      isShowLayoutMenu: false,
      isShowAssetList: true,
      isShowWriteAssetList: true,
      layoutOptions: [
        {
          key: this.$msEnum.MS_LAYOUT.Vertical,
          icon: "ms-icon ms-icon-vertical-layout",
          text: "Giao diện dọc",
        },
        {
          key: this.$msEnum.MS_LAYOUT.Horizontal,
          icon: "ms-icon ms-icon-horizontal-layout",
          text: "Giao diện ngang",
        },
      ],
      zoomOptions: [
        {
          key: this.$msEnum.MS_LAYOUT.Vertical,
          icon: "ms-icon-3 ms-icon-zoom-in",
          text: "Phóng to",
        },
        {
          key: this.$msEnum.MS_LAYOUT.Horizontal,
          icon: "ms-icon-3 ms-icon-zoom-out",
          text: "Thu nhỏ",
        },
      ],
      iconLayout: {
        key: this.$msEnum.MS_LAYOUT.Horizontal,
        icon: "ms-icon ms-icon-horizontal-layout",
        text: "Giao diện ngang",
      },
      iconZoom: {
        key: this.$msEnum.MS_LAYOUT.Vertical,
        icon: "ms-icon-3 ms-icon-zoom-in",
        text: "Phóng to",
      },
      voucherColumns: [],
      assetColumns: [],
      listVoucher: [],
      listAsset: [],
    };
  },
  computed: {
    caculatedLayout() {
      if (this.iconLayout.key === this.$msEnum.MS_LAYOUT.Vertical || this.iconZoom.key === this.$msEnum.MS_LAYOUT.Vertical) {
        return {
          display: "none",
        };
      } else {
        return {
          display: "flex",
        };
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.voucherColumns = column.vourcherColumns;
      this.assetColumns = column.assetColumns;
    });
  },
  methods: {
    /**
     * @description:
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 20/06/2023
     */
    showWriteAssetForm() {
      this.$router.push(`/write-asset/add`);
    },
    /**
     * @description: Thực hiện xử lí khi người dùng click icon thay đổi layout
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 20/06/2023
     */
    handleLayout(option) {
      this.iconLayout = option;
      if(this.iconLayout.key == this.$msEnum.MS_LAYOUT.Vertical) {
        this.isShowAssetList = false;
      } else {
        this.isShowAssetList = true;
      }
    },
    /**
     * @description: Thực hiện xử lí khi người dùng click icon thay đổi zoom
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 20/06/2023
     */
    handleZoom(iconZoom) {
      if(iconZoom.key === this.$msEnum.MS_LAYOUT.Vertical) {
        this.iconZoom = this.zoomOptions[1];
        this.isShowWriteAssetList = false;
      } else {
        this.iconZoom = this.zoomOptions[0];
        this.isShowWriteAssetList = true;
      }
    },
  },
};
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
  z-index: 999;
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
}
.content-bottom__filter {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.content-bottom__filter .input-group {
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
.content-bottom__sub {
  flex: 1 !important;
  margin-top: 10px;
}
.content-bottom__sub .content-bottom__filter {
  padding: 0px 15px 0px 15px !important;
}
@import url(@/css/layouts/content/content.css);
</style>