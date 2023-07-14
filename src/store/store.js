import { createStore } from "vuex";
import auth from "./auth";
import action from "./action";
import table from "./table";

const store = createStore({
  modules: {
    auth,
    action,
    table,
  },
});
export default store;
