import { createRouter, createWebHistory } from "vue-router";
import assetRouter from "./assetRouter";
import userRouter from "./userRouter";
import writeAssetRouter from "./writeAssetRouter";
import store from "@/store/store.js";
// function lazyLoad(view) {
//   return () => import(`@/views/${view}.vue`);
// }
const routes = [
  {
    path: "/",
    redirect: "/user",
  },
  ...assetRouter,
  ...userRouter,
  ...writeAssetRouter,
];
// check authentication nếu chưa đăng nhập thì redirect về trang login


// khởi tạo router
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !store.state.auth.isLogin)
    next({ name: "Login" });
  else if(to.name === "Login" && store.state.auth.isLogin)
    next({ name: "AssetList" });
  else next();
});
export default router;
