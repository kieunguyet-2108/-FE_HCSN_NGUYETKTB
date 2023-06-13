<template>
  <MISAModal 
  style="min-width: 600px; width: 600px;min-height: 500px;height: 500px;" 
  v-if="isShowShortcutGuide">
    <div class="shortcut_guide">
      <div class="shortcut__guide--header">
        <div class="shortcut--header__item">Phím tắt</div>
        <div class="shortcut--header__description">Mô tả</div>
      </div>
      <div class="shortcut__guide--content">
        <div class="shortcut__guide--item">
          <div class="shortcut--item">
            <MISAButton
              buttonClass="shortcut__guide--item__button"
              text="CTRL"
            ></MISAButton>
            <div class="ms-icon ms-10 ms-icon-plus-black"></div>
            <MISAButton
              buttonClass="shortcut__guide--item__button"
              text="S"
            ></MISAButton>
          </div>
          <div class="shortcut--description">Lưu (Cất)</div>
        </div>
        <div class="shortcut__guide--item">
          <div class="shortcut--item">
            <MISAButton
              buttonClass="shortcut__guide--item__button"
              text="CTRL"
            ></MISAButton>
            <div class="ms-icon ms-10 ms-icon-plus-black"></div>
            <MISAButton
              buttonClass="shortcut__guide--item__button"
              text="SHIFT"
            ></MISAButton>
            <div class="ms-icon ms-10 ms-icon-plus-black"></div>
            <MISAButton
              buttonClass="shortcut__guide--item__button"
              text="A"
            ></MISAButton>
          </div>
          <div class="shortcut--description">Thêm mới</div>
        </div>
        <div class="shortcut__guide--item">
          <div class="shortcut--item">
            <MISAButton
              buttonClass="shortcut__guide--item__button"
              text="CTRL"
            ></MISAButton>
            <div class="ms-icon ms-10 ms-icon-plus-black"></div>
            <MISAButton
              buttonClass="shortcut__guide--item__button"
              text="D"
            ></MISAButton>
          </div>
          <div class="shortcut--description">Xóa</div>
        </div>
        <div class="shortcut__guide--item">
          <div class="shortcut--item">
            <MISAButton
              buttonClass="shortcut__guide--item__button"
              text="CTRL"
            ></MISAButton>
            <div class="ms-icon ms-10 ms-icon-plus-black"></div>
            <MISAButton
              buttonClass="shortcut__guide--item__button"
              text="R"
            ></MISAButton>
          </div>
          <div class="shortcut--description">Tải lại dữ liệu</div>
        </div>
        <div class="shortcut__guide--item">
          <div class="shortcut--item">
            <MISAButton
              buttonClass="shortcut__guide--item__button"
              text="F1"
            ></MISAButton>
          </div>
          <div class="shortcut--description">Xem hướng dẫn</div>
        </div>
        <div class="shortcut__guide--item">
          <div class="shortcut--item">
            <MISAButton
              buttonClass="shortcut__guide--item__button"
              text="ESC"
            ></MISAButton>
          </div>
          <div class="shortcut--description">Đóng màn hình dạng popup</div>
        </div>
      </div>
    </div>
  </MISAModal>
</template>

<script>
import MISAModal from "../components/base/MISAModal.vue";
import MISAButton from "@/components/base/MISAButton.vue";
export default {
  name: "ShortcutGuide",
  components: {
    MISAModal,
    MISAButton,
  },
  props: {
    isShowShortcutGuide: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.shortcut_guide {
  display: flex;
  flex-direction: column;
  padding: 40px 30px;
  font-size: 14px;
  width: 100%;
}
.shortcut__guide--header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.shortcut--header__item {
  flex: 2;
}
.shortcut--header__description {
  flex: 1;
}
.shortcut--header__item,
.shortcut--header__description {
  font-weight: bold;
  font-size: 16px;
}
.shortcut__guide--item{
  display: flex;
  align-items: center;
}
.shortcut__guide--item:not(:last-child) {
  margin-bottom: 24px;
}

.shortcut--item {
  display: flex;
  align-items: center;
  flex: 2;
}
.shortcut--description {
  flex: 1;
}
.shortcut--item {
  gap: 12px;
}
.shortcut__guide--item__button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  height: 36px;
  min-width: 40px;
  font-size: 13px;
  cursor: pointer;
  padding: 0px 6px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #0c92b5;
  font-weight: bold;
}
</style>