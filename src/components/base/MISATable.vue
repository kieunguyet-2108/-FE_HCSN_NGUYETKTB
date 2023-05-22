<template>
  <div class="table-content">
    <table id="table-data">
      <thead>
        <tr>
          <th
            v-for="(item, index) in listColumn"
            :key="index"
            :style="{ width: item.columnWidth , 'min-width': item.minColumnWidth , 'max-width': item.maxColumnWidth } "
          >
            <div
              class="checkbox-element"
              v-if="item.name == 'checkbox'"
              :style="{ textAlign: getStyleByType(item.columnType) }"
            >
              <input
                type="checkbox"
                class="checkbox"
                :name="item.name"
                :id="item.name"
                v-model="selectedAll"
              />
              <label :for="item.name"></label>
            </div>

            <div
              class="cell-content"
              :style="{ textAlign: getStyleByType(item.columnType) }"
              v-else-if="item.isShowIndex"
            >
              <MISATooltipV1 :content="item.tooltip">
                {{ item.name }}
              </MISATooltipV1>
            </div>

            <div
              class="cell-content"
              :style="{ textAlign: getStyleByType(item.columnType) }"
              v-else
            >
              <MISATooltipV1 :content="item.tooltip">
                {{ item.name }}
              </MISATooltipV1>
            </div>
          </th>
        </tr>
      </thead>
      <tbody v-if="listData.length == 0">
        <tr class="message-no-data-table">
          <td colspan="11">Không có dữ liệu</td>
        </tr>
      </tbody>
      <tbody v-if="listData.length > 0">
        <tr
          v-for="(asset, indexData) in listData"
          :key="indexData"
          @dblclick="handleDblClick(asset)"
        >
          <td
            v-for="(item, index) in listColumn"
            :key="index"
            :style="{ width: item.columnWidth , 'min-width': item.minColumnWidth , 'max-width': item.maxColumnWidth  }"
          >
            <!-- CHECK BOX -->
            <div
              class="checkbox-element"
              v-if="item.name == 'checkbox'"
              :style="{ textAlign: getStyleByType(item.columnType) }"
            >
              <input
                type="checkbox"
                class="checkbox"
                :id="asset[item.key]"
                :value="asset"
                v-model="selectedList"
              />
              <label :for="asset[item.key]"></label>
            </div>

            <!-- SHOW ORDER INDEX -->
            <div
              class="cell-content"
              v-else-if="item.isShowIndex"
              :style="{ textAlign: getStyleByType(item.columnType) }"
            >
              {{ indexData + 1 }}
            </div>

            <!-- SHOW CELL ACTION -->
            <!-- TODO: Vẫn đang fix thẳng action vào table cần sửa sau -->
            <div
              class="cell-content row-action"
              v-else-if="item.key == 'action'"
            >
              <MISATooltipV1 content="Sửa">
                <div
                  class="ms-icon ms-16 ms-icon-pencil"
                  @click="handleEdit(asset)"
                ></div>
              </MISATooltipV1>
              <MISATooltipV1 content="Nhân bản">
                <div class="ms-icon ms-16 ms-icon-view"></div>
              </MISATooltipV1>
            </div>

            <!-- SHOW CELL CONTENT -->
            <div
              ref="{{ item.key }}"
              class="cell-content"
              v-else
              :style="{ textAlign: getStyleByType(item.columnType) }"
              :title="formatDataByType(asset[item.key], item.columnType)"
            >
              <span
                v-html="formatDataByType(asset[item.key], item.columnType)"
              ></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/* eslint-disable */
import { max } from "moment";
import MISATooltip from "./MISATooltip.vue";
export default {
  name: "MISATable",
  components: {
    MISATooltip,
  },
  props: {
    listData: {
      type: Array,
      default: () => [],
    },
    listColumn: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      sumOfRecords: 0,
      sumOfQuantity: 0,
      sumOfCost: 0,
      sumOfDepreciationYear: 0,
      sumOfRemainingAmount: 0,
      selectedList: [],
    };
  },
  computed: {
    selectedAll: {
      get() {
        return this.selectedList.length == this.listData.length;
      },
      set(value) {
        if (value) {
          this.selectedList = this.listData;
        } else {
          this.selectedList = [];
        }
      },
    },
  },

  watch: {
    selectedList: {
      handler: function (newVal) {
        this.$emit("update:modelValue", newVal);
      },
      deep: true,
    },
    modelValue: {
      handler: function (newVal) {
        this.selectedList = newVal;
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * Get style cho cell theo type
     * @param {string} type
     * @returns {string}
     * @author NguyetKTB
     */
    getStyleByType(type) {
      const me = this;
      switch (type) {
        case me.$msEnum.ColumnType.Number:
          return "end";
        case me.$msEnum.ColumnType.Date:
          return "center";
        case me.$msEnum.ColumnType.Currency:
          return "end";
        case me.$msEnum.ColumnType.Checkbox:
          return "center";
        case me.$msEnum.ColumnType.Action:
          return "center";
        default:
          return "start";
      }
    },

    /**
     * @description: Format dữ liệu theo type
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 18/05/2023
     */
    formatDataByType(data, type) {
      const me = this;
      switch (type) {
        case me.$msEnum.ColumnType.Number:
          return new Intl.NumberFormat("vi-VN").format(data);
        default:
          return data;
      }
    },

    /**
     * @description: Xử lí khi người dùng bấm vào icon edit trên table
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 03/05/2023
     */
    handleEdit(asset) {
      this.$emit("edit", asset);
    },

    handleDblClick(asset) {
      this.$emit("dblClick", asset);
    },
  },
};
</script>

<style>
@import url(@/css/components/table.css);
@import url(@/css/components/checkbox.css);
</style>