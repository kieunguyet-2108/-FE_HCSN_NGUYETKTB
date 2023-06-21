<template>
  <div class="table-content" @keydown="handleTableKeyDown" tabindex="0" >
    <table id="table-data" ref="tableRef" :style="tableStyle">
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
                :class="item.class"
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
            'item--active': isExistInSelectedList(asset),
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
              :class="item.class"
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
      <tfoot class="table__footer" v-if="isShowFooter">
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
    isShowFooter: {
      type: Boolean,
      default: true,
    },
    tableStyle: {
      type: Object,
      default: () => {},
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
          action: this.$msEnum.MENU_OPTION.Add,
        },
        {
          text: "Sửa",
          action: this.$msEnum.MENU_OPTION.Edit,
        },
        {
          text: "Xóa",
          action: this.$msEnum.MENU_OPTION.Delete,
        },
        {
          text: "Nhân bản",
          action: this.$msEnum.MENU_OPTION.Duplicate,
        },
      ],
    };
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
     * @description: Thực hiện kiểm tra xem item có tồn tại trong list đã chọn hay không
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 20/06/2023
     */
    isExistInSelectedList(item) {
      const me = this;
      if (me.selectedList == null || me.selectedList.length == 0) {
        return false;
      } else {
        let index = me.selectedList.find((row, index) => row == item);
        if (index == undefined) {
          return false;
        }
        return true;
      }
    },
    /**
     * @description: Xử lí các sự kiện keydown trên bảng dữ liệu
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 01/06/2023
     */
    handleTableKeyDown(event) {
      event.preventDefault();
      console.log(event.target.value);
      const me = this;
      if (me.selectedList.length == 0) {
        return;
      } else if (me.selectedList.length == 1) {
        switch (event.keyCode) {
          // TH1: Nếu người dùng nhấn mũi tên lên
          case me.$msEnum.KEY_CODE.ArrowUp:
            // TH1.1: Nếu người dùng đang ở dòng đầu tiên
            if (me.selectedList[0] == me.listData[0]) {
              me.selectedList = [me.listData[me.listData.length - 1]];
            } else {
              let index = me.listData.findIndex(
                (row, index) => row == me.selectedList[0]
              );
              me.selectedList = [me.listData[index - 1]];
            }
            break;
          // TH2: Nếu người dùng nhấn mũi tên xuống
          case me.$msEnum.KEY_CODE.ArrowDown:
            // TH2.1: Nếu người dùng đang ở dòng cuối cùng
            if (me.selectedList[0] == me.listData[me.listData.length - 1]) {
              me.selectedList = [me.listData[0]];
            } else {
              let index = me.listData.findIndex(
                (row, index) => row == me.selectedList[0]
              );
              me.selectedList = [me.listData[index + 1]];
            }
            break;
          default:
            break;
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
        case me.$msEnum.COLUMN_TYPE.Number:
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
      // nếu người dùng click vào checkbox thì không xử lí
      if (event.target.closest(".checkbox-element")) {
        return;
      }
      const me = this;
      // TH1: không nhấn ctrl + shift thì chỉ chọn 1 row
      if (!event.ctrlKey && !event.shiftKey) {
        //kiểm tra asset có tồn tại trong selected list hay không
        let item = me.listData.find((row) => row == asset);
        if (item != undefined) {
          me.selectedList = [asset];
          me.currentRow = asset;
        } else {
          me.selectedList = [];
          me.currentRow = {};
        }
      }
      // TH2: nhấn ctrl + click (không nhấn shift) thì chọn nhiều row
      if (event.ctrlKey && !event.shiftKey) {
        this.selectedList = [
          ...this.selectedList.filter((item) => item != asset),
          asset,
        ];
        this.currentRow = asset;
      }
      // TH3: nhấn shift + click (không nhấn ctrl) thì chọn nhiều row
      if (event.shiftKey && !event.ctrlKey) {
        event.preventDefault();
        const start = this.listData.indexOf(me.currentRow);
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