function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`);
}
const assetRouter = [
  {
    path: "/asset",
    component: lazyLoad("asset/AssetList"),
    name: "AssetList",
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
    name: "AssetImport",
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/ErrorPage.vue"),
    meta: {
      title: "Không tìm thấy trang",
    },
  },
];
export default assetRouter;
