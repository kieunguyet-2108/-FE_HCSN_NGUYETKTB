function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`);
}
const assetRouter = [
  {
    path: "/asset",
    component: lazyLoad("asset/AssetHome"),
    name: "AssetHome",
    children: [
      {
        path: "/asset",
        component: lazyLoad("asset/AssetList"),
        name: "AssetList",
        children: [
          {
            path: "detail/:asset_id",
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
        path: "import",
        component: lazyLoad("asset/AssetImport"),
        name: "AssetImport",
      },
      {
        path: "increase-asset",
        component: lazyLoad("increase-asset/IncreaseAssetHome"),
        name: "IncreaseAssetHome",
        children:[
          {
            path: "add-voucher",
            component: lazyLoad("increase-asset/VoucherForm"),
            name: "VoucherForm",
          },
          {
            path: "add-voucher/:voucher_id",
            component: lazyLoad("increase-asset/VoucherForm"),
            props: true,
            name: "VoucherFormEdit",
          }
        ]
      }
    ],
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
