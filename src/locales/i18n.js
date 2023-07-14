import { createI18n } from "vue-i18n/dist/vue-i18n.cjs";

/**
 * @description: Hàm này dùng để tìm kiếm các file json trong thư mục locales và đọc nội dung của file json
 * @param: {any}
 * @return: {any}
 * @author: NguyetKTB 13/07/2023
 */
function loadLocaleMessages() {
  const locales = require.context("./", true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export default createI18n({
  // Khởi tạo i18n
  legacy: false,
  locale: localStorage.getItem("qlts-language") || "vi", // Đọc ngôn ngữ từ localStorage hoặc mặc định là tiếng việt
  fallbackLocale: "vi", // Nếu không tìm thấy ngôn ngữ thì sẽ dùng ngôn ngữ mặc định
  messages: loadLocaleMessages(), // Đọc nội dung các file json trong thư mục locales
  warnHtmlMessage: false, // Không hiển thị cảnh báo khi dùng html trong i18n
});
