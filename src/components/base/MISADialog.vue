<template>
  <!-- DIALOG -->
  <div class="dialog" id="dialog">
    <div class="dialog__main">
      <div class="dialog__content" :style="styleIcon">
        <div class="dialog-icon ms-36" >
          <div class="ms-icon-2 ms-36 ms-icon-warning" ></div>
        </div>
        <ul>
          <li
            class="dialog-message"
            v-for="(message, index) in dialogMessages"
            :key="index"
            v-html="message.content" :style="message.style"
          >
          </li>
        </ul>
      </div>
      <div class="dialog__footer" @keydown="footerKeydown">
        <MISAButton
          v-for="(button, index) in buttonList"
          :key="index"
          :tabindex="0"
          :type="button.type"
          :text="button.text"
          :isFocus="button.isFocus"
          @click="button.onclick"
          @keydown="button.onKeydown"
        >
        </MISAButton>
      </div>
    </div>
  </div>
</template>

<script>
import MISAButton from "./MISAButton.vue";
export default {
  name: "MISADialog",
  components: {
    MISAButton,
  },
  props: {
    buttonList: {
      type: Array,
      default: () => [
        {
          text: "",
          type: "",
          isFocus: false,
          onclick: () => {},
          onKeydown: () => {},
        },
      ],
    },
    dialogMessages: {
      type: Array,
      default: () => [
        {
          field: "",
          content: "",
          style: "",
        },
      ],
    },
    styleIcon: {
      type: String,
      default: "",
    },
  },
  methods: {
    /**
     * @description:  Hàm xử lí unfocus control trong dialog khi nhấn tab
     * @param: {e, fn}: e: event, fn: hàm focus vào control đầu tiên trong dialog 
     * @return: {any} 
     * @author: NguyetKTB 10/05/2023
     */
    processUnfocusLastControl(e, fn) {
      // kiểm tra nếu người dùng nhấn enter và đang focus vào button thì không xử lý
      if (e.which === 13 && e.target == document.activeElement) return;
      // kiểm tra nếu người dùng nhấn tab và không phải là shift tab thì xử lý
      if (e.which === 9 && !e.shiftKey) {
        // lấy ra control đuợc focus
        let cur = e.target;
        // lấy ra tất cả các control trong dialog
        let els = e.currentTarget.querySelectorAll("*");
        var flag = true;
        for (let i = 0; i < els.length; i++) {
          // nếu control đang focus là control hiện tại thì bỏ qua
          if (els[i] === cur) {
            flag = false;
            continue;
          }
          // 
          if (flag) {
            continue;
          }
          // focus vào control tiếp theo
          els[i].focus();
          if (els[i] === document.activeElement) {
            e.preventDefault();
            return;
          }
        }
      }
      e.preventDefault();
      //trường hợp nếu control đang focus là control cuối cùng thì focus vào control đầu tiên
      //call lại hàm này để focus vào control đầu tiên
      fn();
    },
    /**
     * @description: Hàm thực hiện focus vào control đầu tiên trong dialog
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 10/05/2023
     */
    focusFirstControl(scope) {
      var selector = [
          'input:not([disabled]):not([tabindex="-1"])',
          'select:not([disabled]):not([tabindex="-1"])',
          'textarea:not([disabled]):not([tabindex="-1"])',
          'button:not([disabled]):not([tabindex="-1"])',
          'a:not([disabled]):not([tabindex="-1"])',
        ].join(", ");
      if (scope) {
        const me = this;
        me.$nextTick(() => {
          // let input;
          // lấy ra tất cả button trong dialog
          const buttons = scope.nextElementSibling.querySelectorAll(selector);
          // lấy ra button đầu tiên
          const firstButton = buttons[0];
          // kiểm tra nếu button đầu tiên có thuộc tính tabindex thì focus vào button đầu tiên
          if (firstButton && firstButton.hasAttribute("tabindex")) {
            firstButton.focus();
            return;
          }
        });
      }
    },
    /**
     * @description: Hàm xử lí khi nhấn tab trong dialog
     * @param: {e} : event
     * @return: {any} 
     * @author: NguyetKTB 10/05/2023
     */
    footerKeydown(e) {
      const me = this;
      this.processUnfocusLastControl(e, () => {
        me.focusFirstControl(me.$el);
      });
    },
  },
};
</script>

<style>

@import url(@/css/components/dialog.css);
</style>