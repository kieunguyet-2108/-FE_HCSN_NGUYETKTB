<template>
  <div
    class="combobox"
    ref="comboboxData"
    @keydown="onHandleSelectItem"
    v-clickOutside="hideComboboxData"
    :class="{ 'validate-error': errorMessage }"
  >
    <div class="combobox__label" v-if="label">
      <label for="">
        {{ label }}
        <span v-if="required" class="required-sign">*</span>
      </label>
    </div>
    <div class="combobox-group">
      <div class="combobox-content">
        <div class="combobox__icon" v-if="iconLeft" tabindex="-1">
          <div class="ms-icon" :class="iconLeft"></div>
        </div>
        <input
          :type="inputType"
          :placeholder="inputPlaceholder"
          :className="inputClass"
          :id="id"
          :value="inputValue"
          autocomplete="off"
          :name="name"
          @input="onInputCombobox($event.target.value)"
          @blur="onBlurCombobox($event.target.value)"
          :readonly="readonly"
          :style="{ cursor: readonly ? 'pointer' : 'auto' }"
        />
        <div class="combobox__icon" v-if="iconRight" @click="showComboboxData">
          <div class="ms-icon" :class="iconRight"></div>
        </div>
      </div>
      <div
        class="combobox-data"
        v-if="isShowComboboxData && dataFilter.length > 0"
      >
        <div class="combobox-data--header" tabindex="-1">
          <div class="combobox-item">
            <div
              class="combobox-item--code"
              v-for="(col, index) in column"
              :key="index"
              :style="{ maxWidth: col.width, width: col.width }"
            >
              {{ col.name }}
            </div>
          </div>
        </div>

        <div class="combobox-data--main">
          <div
            class="combobox-item"
            v-for="(item, index) in dataFilter"
            :key="index"
            tabindex="0"
            @click="selectItem(item, index)"
            :class="{
              'combobox-item--active': index === indexItemFocus,
            }"
          >
            <!-- item[this.primaryKey] === modelValue || -->
            <div
              class="combobox-item--code"
              v-for="(col, index) in column"
              :key="index"
              :style="{ maxWidth: col.width, width: col.width }"
            >
              {{ item[col.key] }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="combobox-data"
        v-else-if="dataFilter.length == 0 && isShowComboboxData"
      >
        <p class="message-no-data">Không có dữ liệu</p>
      </div>
    </div>
    <div class="combobox-error" v-if="isError">
      <div class="error-message" v-html="errorMessage"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import vClickOutside from "click-outside-vue3";
import _ from "lodash";
export default {
  name: "MISACombobox",
  components: {
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    primaryKey: {
      type: String,
      default: "",
    },
    inputType: {
      type: String,
      default: "",
    },
    inputPlaceholder: {
      type: String,
      default: "",
    },
    inputClass: {
      type: String,
      default: "",
    },
    data: {
      type: Array,
      default: () => [],
    },
    column: {
      type: Array,
      default: () => [],
    },
    iconLeft: {
      type: String,
      default: "",
    },
    iconRight: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    isValidate: {
      type: Boolean,
      default: false,
    },
    tempValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isShowComboboxData: false,
      isError: false,
      errorMessage: "",
      selectedItem: {},
      keyValueBinding: "",
      inputValue: "",
      dataFilter: [],
      keyAllowSearch: [],
      indexItemFocus: 0,
      eventAction: false,
    };
  },
  watch: {
    data: {
      /**
       * Do cơ chế bất đồng bộ nên phải dùng watch để theo dõi sự thay đổi của data
       * @param {*} newValue
       * @param {*} oldValue
       */
      handler: function (newValue, oldValue) {
        const me = this;
        if (newValue !== oldValue) {
          me.dataFilter = newValue;
        }
      },
      deep: true,
    },

    modelValue: {
      /**
       * Do cơ chế bất đồng bộ nên phải dùng watch để theo dõi sự thay đổi của modelValue
       * @param {*} newValue
       * @param {*} oldValue
       */
      handler: function (newValue, oldValue) {
        const me = this;
        if (newValue !== oldValue) {
          var findValue = {};
          if (me.eventAction) {
            me.eventAction = false;
            findValue = me.selectedItem;
          } else {
            if (me.modelValue) {
              for (let i = 0; i < me.dataFilter.length; i++) {
                if (me.dataFilter[i][me.primaryKey] === me.modelValue) {
                  findValue = me.dataFilter[i];
                  me.indexItemFocus = i;
                  break;
                }
              }
            }
          }
          me.$nextTick(() => {
            let valueBinding = me.column.find((item) => item.isBinding);
            if (valueBinding) {
              me.keyValueBinding = valueBinding["valueBinding"];
              let keyBinding = findValue[me.keyValueBinding];
              if (keyBinding != undefined) {
                me.inputValue = keyBinding;
              } else {
                // if (this.required && this.label) {
                //   this.isError = true;
                //   this.errorMessage = this.label + " không tồn tại";
                // }
                me.indexItemFocus = 0;
              }
            }
            me.keyAllowSearch = me.column.filter((item) => item.isSearching); // danh sách các cột cho phép tìm kiếm
          });
        }
      },
      deep: true,
    },
  },
  methods: {
    /**
     * @description: Hàm xử lý khi người dùng nhấn bàn phím khi đang focus vào combobox
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 07/05/2023
     */
    onHandleSelectItem(event) {
      const me = this,
        keyCodePress = event.keyCode;
      try {
        // th1: nếu combobox chưa hiển thị list mà nhấn phím lên xuống thì hiển thị list
        if (
          !me.isShowComboboxData &&
          (keyCodePress == me.$msEnum.KEY_CODE.ArrowUp ||
            keyCodePress == me.$msEnum.KEY_CODE.ArrowDown)
        ) {
          event.preventDefault();
          me.showComboboxData();
          return;
        }

        // th2: nếu người dùng bấm tab thì ẩn combobox
        if (keyCodePress == me.$msEnum.KEY_CODE.Tab) {
          me.hideComboboxData();
          return;
        }

        // th3: nếu list đang hiển thị mà người dùng bấm esc thì ẩn combobox
        if (
          keyCodePress == me.$msEnum.KEY_CODE.Escape &&
          me.isShowComboboxData
        ) {
          me.hideComboboxData();
          return;
        }

        if (me.isShowComboboxData && me.dataFilter.length > 0) {
          // th4: nếu list đang hiển thị thì xử lí các phím lên xuống có scroll
          if (keyCodePress == me.$msEnum.KEY_CODE.ArrowUp) {
            event.preventDefault();
            me.indexItemFocus =
              me.indexItemFocus === 0
                ? me.dataFilter.length - 1
                : me.indexItemFocus - 1;
            me.handleScroll(me.indexItemFocus - 1);
            // hiển thị giá trị của item đang focus vào input
            this.inputValue =
              this.dataFilter[this.indexItemFocus][this.keyValueBinding];
            return;
          }
          if (keyCodePress == me.$msEnum.KEY_CODE.ArrowDown) {
            event.preventDefault();
            me.indexItemFocus =
              me.indexItemFocus === me.dataFilter.length - 1
                ? 0
                : me.indexItemFocus + 1;
            me.handleScroll(me.indexItemFocus + 1);
            this.inputValue =
              this.dataFilter[this.indexItemFocus][this.keyValueBinding];
            return;
          }
          // th5: nếu list đang hiển thị thì xử lí các phím enter, space
          if (keyCodePress == me.$msEnum.KEY_CODE.Enter) {
            event.preventDefault();
            me.selectItem(
              this.dataFilter[this.indexItemFocus],
              this.indexItemFocus
            );
            return;
          }
        }

        // th4: nếu list đang hiển thị thì xử lí các phím lên xuống có scroll
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description: Hàm xử lý scroll tới item được chọn
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/05/2023
     */
    handleScroll(indexItemFocus) {
      try {
        this.$refs.comboboxData
          .querySelectorAll(".combobox-item")
          [indexItemFocus].scrollIntoView({
            behavior: "instant",
            block: "center",
            inline: "nearest",
          });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description: Hàm hiển thị combobox
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 01/05/2023
     */
    showComboboxData() {
      const me = this;
      try {
        if (!me.inputValue && me.dataFilter.length == 0) {
          me.dataFilter = me.data;
        }
        me.isShowComboboxData = true;
        me.$nextTick(() => {
          let parent = me.$el.querySelector(".combobox-data");
          if (parent) {
            let comboboxElement = parent.querySelectorAll(".combobox-item");
            for (let index = 0; index < comboboxElement.length; index++) {
              if (
                comboboxElement[index].classList.contains(
                  "combobox-item--active"
                )
              ) {
                comboboxElement[index].scrollIntoView({
                  behavior: "instant",
                  block: "center",
                  inline: "nearest",
                });
                break;
              }
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * @description: Hàm ẩn combobox
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 01/05/2023
     */
    hideComboboxData() {
      this.isShowComboboxData = false;
    },
    /**
     * @description: Hàm xử lí khi người dùng click item combobox
     * @param: {item, index}: item là item được chọn, index là vị trí của item trong combobox
     * @return: {any}
     * @author: NguyetKTB 01/05/2023
     */
    selectItem(item, index) {
      this.selectedItem = item;
      this.removeError();
      this.indexItemFocus = index;
      this.inputValue = item[this.keyValueBinding];
      this.$emit("update:modelValue", item[this.primaryKey]);
      this.eventAction = true;
      this.$emit("selectedItem", item);
      this.hideComboboxData();
    },
    /**
     * @description: Hàm xử lí khi người dùng nhập vào ô input combobox
     * @param: {value}: giá trị người dùng nhập vào
     * @return: {any}
     * @author: NguyetKTB 02/05/2023
     */
    onInputCombobox: _.debounce(function (value) {
      const me = this;
      me.inputValue = value;
      me.removeError();
      if (value) {
        me.dataFilter = me.data.filter((item) =>
          me.keyAllowSearch.some((key) =>
            item[key.key].toLowerCase().includes(value.toLowerCase())
          )
        );
      } else {
        me.dataFilter = me.data;
      }
      if (value == "" || me.dataFilter.length == 0) {
        me.$emit("selectedItem", {});
      }
      if (!me.isShowComboboxData) {
        me.showComboboxData();
      }
    }, 100),

    /**
     * @description: Hàm xử lí khi blur khỏi ô input combobox
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/05/2023
     */
    onBlurCombobox(value) {
      if (this.isValidate) {
        if (this.selectedItem == {}) {
          this.isError = true;
          this.errorMessage = this.$msEnum.MS_VALIDATE_MSG.INVALID.format(
            this.label
          );
        } else if (value == "") {
          this.isError = true;
          this.errorMessage = this.$msEnum.MS_VALIDATE_MSG.REQUIRED.format(
            this.label
          );
        } else if (!this.modelValue && value != "") {
          this.inputValue = "";
        }
      }
    },

    /**
     * @description: Hàm loại bỏ lỗi combobox
     * @param: {any}
     * @return: {any}
     * @author: NguyetKTB 11/05/2023
     */
    removeError() {
      this.isError = false;
      this.errorMessage = "";
    },
  },
};
</script>

<style scoped>
@import url(@/css/components/combobox.css);
</style>