import { createApp, defineAsyncComponent } from "vue";
class DialogMessage {

    /**
     * @description: 
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 12/05/2023
     */
    showDialog(dialogInfo){
        this.createInstance(dialogInfo);
    }

    /**
     * @description: 
     * @param: {any} 
     * @return: {any} 
     * @author: NguyetKTB 12/05/2023
     */
    createInstance(dialogInfo) {
        let dialogProps = {dialogInfo: dialogInfo};
        const container = document.body;
        let dialogComponent = "@/components/MISA.DialogV1.vue";
        const AsyncComp = defineAsyncComponent(() =>import(`${dialogComponent}`));
        const app = createApp(AsyncComp, {
            ... dialogProps,
        });
        return app.mount(container.appendChild(document.createElement("div"))) || null;
    }
  /**
   * @description:
   * @param: {any}
   * @return: {any}
   * @author: NguyetKTB 12/05/2023
   */
  dialogOneButton(title, messages, icon, dialogCustoms = {}, textButton) {
    let dialogInfo = {
      ...dialogCustoms,
      title: title,
      messages: messages,
      icon: icon,
      buttons: [
        {
          text: textButton,
          buttonClass: "button button__main",
          isFocus: true,
          onclick: () => {},
        },
      ],
    };
    return this.showDialog(dialogInfo);
  }

  /**
   * @description: 
   * @param: {any} 
   * @return: {any} 
   * @author: NguyetKTB 12/05/2023
   */
  dialogTwoButton(title , messages , icon , dialogCustoms = {} , textButton1 , textButton2) {
    let dialogInfo = {
      ...dialogCustoms,
      title: title,
      messages: messages,
      icon: icon,
      buttons: [
        {
          text: textButton1,
          buttonClass: "button button__main",
          isFocus: true,
          onclick: () => {},
        },
        {
          text: textButton2,
          buttonClass: "button button__outline",
          onclick: () => {},
        },
      ],
    };
    this.showDialog(dialogInfo);
  }

  /**
   * @description: 
   * @param: {any} 
   * @return: {any} 
   * @author: NguyetKTB 12/05/2023
   */
  dialogThreeButton(title , messages , icon , dialogCustoms = {} , textButton1 , textButton2 , textButton3) {
    let dialogInfo = {
        ...dialogCustoms,
        title: title,
        messages: messages,
        icon: icon,
        buttons: [
            {
                text: textButton1,
                buttonClass: "button button__main",
                isFocus: true,
                onclick: () => {},
            },
            {
                text: textButton2,
                buttonClass: "button button__outline",
                onclick: () => {},
            },
            {
                text: textButton3,
                buttonClass: "button button__sub",
                onclick: () => {},
            },
        ],
    };
    this.showDialog(dialogInfo);
  }
}
export default new DialogMessage();