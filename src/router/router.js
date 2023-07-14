import { createRouter, createWebHistory } from "vue-router";
import assetRouter from "./assetRouter";
import userRouter from "./userRouter";
import store from "@/store/store.js";
const routes = [
  {
    path: "/",
    redirect: "/user",
  },
  ...assetRouter,
  ...userRouter,
];
// check authentication nếu chưa đăng nhập thì redirect về trang login


// khởi tạo router
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && store.state.auth.token == null)
    next({ name: "Login" });
  else if(to.name === "Login" && store.state.auth.token != null)
    next({ name: "AssetHome" });
  else next();
});
export default router;
