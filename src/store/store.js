import { createStore } from "vuex";
import auth from "./auth";
import formMode from "./form";

const store = createStore({
  modules: {
    auth,
    formMode,
  },
});
export default store;
