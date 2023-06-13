import { createRouter, createWebHistory } from "vue-router";

function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`);
}
const routers = [
  {
    path: "/",
    redirect: "/asset",
  },
  {
    path: "/asset",
    component: lazyLoad("asset/AssetHome"),
    name: "AssetHome",
    children: [
      {
        path: ":asset_id",
        component: lazyLoad("asset/AssetForm"),
        props: true,
        name: "AssetForm",
      },
      { path: "add", component: lazyLoad("asset/AssetForm") },
      {
        path: "add/:duplicate_id",
        component: lazyLoad("asset/AssetForm"),
        props: true,
        name: "AssetFormEdit",
      },
    ],
  },
  {
    path: "/asset/import",
    component: lazyLoad("asset/AssetImport"),
    name: "AssetImport"
  },
  {
    path: "/:pathMatch(.*)*",
    component: lazyLoad("ErrorPage"),
    meta: {
      title: "Không tìm thấy trang",
    },
  },
];

// khởi tạo router
const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});

export default router;
