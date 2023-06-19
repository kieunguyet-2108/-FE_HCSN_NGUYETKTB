<template>
  <div class="table-content">
    <table id="table-data">
      <thead class="table__header">
        <tr>
          <th
            v-for="(item, index) in listColumn"
            :key="index"
            :style="{
              width: item.columnWidth,
              'min-width': item.minColumnWidth,
              'max-width': item.maxColumnWidth,
            }"
          >
            <div
              class="checkbox-element"
              v-if="item.name == 'checkbox'"
              :style="{ textAlign: getStyleByType(item.type) }"
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
              :style="{ textAlign: getStyleByType(item.type) }"
              v-else-if="item.isShowIndex"
            >
              <MISATooltipV1 :content="item.tooltip">
                {{ item.name }}
              </MISATooltipV1>
            </div>

            <div
              class="cell-content"
              :style="{ textAlign: getStyleByType(item.type) }"
              v-else
            >
              <MISATooltipV1 :content="item.tooltip">
                {{ item.name }}
              </MISATooltipV1>
            </div>
          </th>
        </tr>
      </thead>
      <tbody v-if="listData.length == 0" class="no-data">
        <tr>
          <td colspan="11">
            <div class="image__no-data">
              <div class="ms-icon-2 ms-icon-image-not-found"></div>
            </div>
            <div class="message-__no-data">Không tìm thấy dữ liệu.</div>
          </td>
        </tr>
      </tbody>
      <tbody v-if="listData.length > 0">
        <tr
          v-for="(asset, indexData) in listData"
          :key="indexData"
          @dblclick="handleEdit(asset, $event)"
          @click="handleClickRow(asset, $event)"
          @contextmenu="handleContextMenu(asset, $event)"
          :class="{
            'item--active': currentRow == asset,
          }"
        >
          <td
            v-for="(item, index) in listColumn"
            :key="index"
            :style="{
              width: item.columnWidth,
              'min-width': item.minColumnWidth,
              'max-width': item.maxColumnWidth,
            }"
          >
            <!-- CHECK BOX -->
            <div
              class="checkbox-element"
              v-if="item.name == 'checkbox'"
              :style="{ textAlign: getStyleByType(item.type) }"
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
              :style="{ textAlign: getStyleByType(item.type) }"
            >
              {{ (pageNumber - 1) * pageSize + indexData + 1 }}
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
                <div
                  class="ms-icon ms-16 ms-icon-view"
                  @click="handleDuplicate(asset)"
                ></div>
              </MISATooltipV1>
              <MISAMenu
                ref="contextMenu"
                :options="menuOptions"
                v-if="menu.isShowMenu"
                @clickItem="handleMenuClick"
                :style="{ top: menu.top, left: menu.left }"
                v-clickOutside="
                  () => {
                    menu.isShowMenu = false;
                  }
                "
              ></MISAMenu>
            </div>

            <!-- SHOW CELL CONTENT -->
            <div
              ref="{{ item.key }}"
              class="cell-content"
              v-else
              :style="{ textAlign: getStyleByType(item.type) }"
            >
              <MISATooltipV1
                :content="
                  asset[item.key] != null
                    ? formatDataByType(asset[item.key], item.columnType)
                    : 0
                "
              >
                <span
                  v-html="
                    asset[item.key] != null
                      ? formatDataByType(asset[item.key], item.columnType)
                      : 0
                  "
                ></span>
              </MISATooltipV1>
            </div>
          </td>
        </tr>
        <tr></tr>
      </tbody>
      <tfoot class="table__footer">
        <tr>
          <td colspan="6">
            <div class="pagination__content">
              <div class="total-record">
                Tổng số:
                <strong
                  style="margin: 0px 3px"
                  v-html="formatNumber(totalRecord)"
                >
                </strong>
                bản ghi
              </div>
              <div class="pagination__combobox">
                <MISADropdown
                  :options="pagingOptions"
                  :selectedValue="pageSize"
                  @changeDropdown="changeDropdown"
                ></MISADropdown>
              </div>
              <MISAPagination
                v-if="listData.length > 0"
                :pageSize="pageSize"
                :pageNumber="pageNumber"
                :totalRecord="totalRecord"
                @changePaging="changePaging"
              ></MISAPagination>
            </div>
          </td>
          <td
            v-for="(item, index) in summary"
            :key="index"
            style="text-align: end"
            :style="`width: ${item.width}; min-width: ${item.width}; max-width: ${item.width};font-weight: bold`"
          >
            <MISATooltipV1 :content="formatNumber(item.value)">
              <span
                v-html="formatNumber(item.value)"
                style="text-align: end"
              ></span>
            </MISATooltipV1>
          </td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
  
  <script>
/* eslint-disable */
import { max } from "moment";
import MISATooltip from "./MISATooltip.vue";
import MISAPagination from "./MISAPagination.vue";
import MISADropdown from "./MISADropdown.vue";
import MISATooltipV1 from "./MISATooltipV1.vue";
import MISAMenu from "./MISAMenu.vue";
import vClickOutside from "click-outside-vue3";
export default {
  name: "MISATable",
  components: {
    MISATooltip,
    MISAPagination,
    MISADropdown,
    MISATooltipV1,
    MISAMenu,
  },
  directives: {
    clickOutside: vClickOutside.directive,
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
    pagingOptions: {
      type: Array,
      default: () => [],
    },
    summary: {
      type: Array,
      default: () => [],
    },
    totalRecord: {
      type: Number,
      default: 0,
    },
    pageNumber: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      selectedList: [],
      currentRow: null,
      menu: {
        isShowMenu: false,
        top: "",
        left: "",
      },
      menuOptions: [
        {
          text: "Thêm",
          action: this.$msEnum.MS_ACTION.Add,
        },
        {
          text: "Sửa",
          action: this.$msEnum.MS_ACTION.Edit,
        },
        {
          text: "Xóa",
          action: this.$msEnum.MS_ACTION.Delete,
        },
        {
          text: "Nhân bản",
          action: this.$msEnum.MS_ACTION.Duplicate,
        },
      ],
    };
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyDown);
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
        if (newVal.length == this.selectedList.length) {
          return;
        }
        this.selectedList = newVal;
      },
      deep: true,
    },
  },
  computed: {
    selectedAll: {
      get() {
        if (this.listData.length == 0) {
          return false;
        }
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
  methods: {
    /**
     * @description: Xử lí các sự kiện keydown trên bảng dữ liệu
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 01/06/2023
     */
    handleKeyDown(event) {
      const me = this;
      if (me.currentRow == null) {
        return;
      } else {
        // tìm ra row hiện tại đang được focus trong listData
        let row = me.listData.find((item, index) => item == me.currentRow);
        switch (event.keyCode) {
          case me.$msEnum.KeyCode.ArrowUp:
            if (me.currentRow == me.listData[0]) {
              // TH1: row đang focus là row đầu tiên thì focus vào row cuối cùng
              me.currentRow = me.listData[me.listData.length - 1];
            } else {
              // TH2: row đang focus không phải là row đầu tiên thì focus vào row phía trên
              me.currentRow = me.listData[me.listData.indexOf(row) - 1];
            }
            break;
          case me.$msEnum.KeyCode.ArrowDown:
            if (me.currentRow == me.listData[me.listData.length - 1]) {
              // TH1: row đang focus là row cuối cùng thì focus vào row đầu tiên
              me.currentRow = me.listData[0];
            } else {
              // TH2: row đang focus không phải là row cuối cùng thì focus vào row phía dưới
              me.currentRow = me.listData[me.listData.indexOf(row) + 1];
            }
            break;
          default:
            break;
        }
        // nếu ctrl
        if (event.ctrlKey) {
          switch (event.keyCode) {
            case me.$msEnum.KeyCode.E: // edit: ctrl + e
              event.preventDefault();
              me.$emit("edit", me.currentRow);
              break;
            case me.$msEnum.KeyCode.C: // copy: ctrl + c
              event.preventDefault();
              me.$emit("duplicate", me.currentRow);
              break;
            case me.$msEnum.KeyCode.D: // delete: ctrl + d
              event.preventDefault();
              me.$emit("delete", me.currentRow);
              break;
            default:
              break;
          }
        }
      }
    },
    /**
     * @description: Thực hiện format số theo định dạng tiền tệ Việt Nam
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 28/05/2023
     */
    formatNumber(number) {
      return new Intl.NumberFormat("vi-VN").format(number);
    },
    /**
     * @description: Lấy ra style cho từng loại dữ liệu
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 28/05/2023
     */
    getStyleByType(type) {
      const me = this;
      switch (type) {
        case me.$msEnum.MS_FIELD_TYPE.String:
          return "start";
        case me.$msEnum.MS_FIELD_TYPE.Int:
          return "end";
        case me.$msEnum.MS_FIELD_TYPE.Decimal:
          return "end";
        default:
          return "center";
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
    handleEdit(asset, event) {
      if (event && event.target.closest(".checkbox-element")) {
        return;
      }
      this.$emit("edit", asset);
    },
    /**
     * @description: Xử lí khi người dùng bấm vào icon duplicate trên table
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 28/05/2023
     */
    handleDuplicate(asset) {
      this.$emit("duplicate", asset);
    },
    /**
     * @description: Thực hiện load lại data khi người dùng click paging dưới table
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 25/05/2023
     */
    changePaging(page) {
      this.$emit("changePaging", page);
    },
    /**
     * @description: Thực hiện xử lí khi người dùng click vào 1 row trên table
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 01/06/2023
     */
    handleClickRow(asset, event) {
      // nếu ctrl + click thì chọn nhiều row
      if (event.ctrlKey) {
        this.currentRow = asset;
        this.selectedList = [
          ...this.selectedList.filter((item) => item != asset),
          asset,
        ];
      }
      //  chọn nhiều bằng Shift là khi select 1 dòng dữ liệu,
      // nhấn giữ phím Shift và dùng chuột click vào 1 dòng dữ liệu khác thì toàn bộ dữ liệu nằm trong khoảng đó sẽ được select.
      if (!event.shiftKey && this.currentRow != asset) {
        this.currentRow = asset;
      }
      if (event.shiftKey && this.currentRow != null) {
        event.preventDefault();
        const start = this.listData.indexOf(this.currentRow);
        const end = this.listData.indexOf(asset);
        const list = this.listData.slice(
          Math.min(start, end),
          Math.max(start, end) + 1
        );
        this.selectedList = list;
      }
    },
    /**
     * @description: thực hiện load lại data khi người dùng thay đổi dropdown trên filter
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 25/05/2023
     */
    changeDropdown(value) {
      this.$emit("changeDropdown", value);
    },
    /**
     * @description: Thực hiện tính toán vị trí của menu context
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 01/06/2023
     */
    handleContextMenu(asset, event) {
      event.preventDefault();
      this.currentRow = asset;
      this.$nextTick(() => {
        this.menu.isShowMenu = true;
        const x = event.clientX;
        const y = event.clientY;
        this.menu.top = y + "px";
        this.menu.left = x + 20 + "px";
      });
    },
    /**
     * @description: Hàm thực hiện khi người dùng click vào menu item
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 01/06/2023
     */
    handleMenuClick(action) {
      // emit event
      this.menu.isShowMenu = false;
      this.$emit("selectMenuItem", action, this.currentRow);
    },
  },
};
</script>
  
<style>
#table-data tbody tr td span {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
.pagination__content {
  display: flex;
  gap: 10px;
}
.total-record {
  display: flex;
  align-items: center;
}
.table__footer {
  position: sticky;
  bottom: 0;
  z-index: 9;
  background-color: #fff;
  height: 40px;
}
tbody.no-data tr:hover {
  background-color: #fff;
}
tbody.no-data tr td {
  border-bottom: none;
}
tbody.no-data tr td div:first-child {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
tfoot {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
}
tbody tr.item--active {
  background-color: #d1edf4;
}
tbody tr.item--active .row-action {
  opacity: 1;
}
.message-__no-data {
  font-size: 20px;
  color: #1aa4c8;
  font-weight: bold;
  text-align: center;
}
@import url(@/css/components/table.css);
@import url(@/css/components/checkbox.css);
</style>