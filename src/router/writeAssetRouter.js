function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`);
}
const writeAssetRouter = [
  {
    path: "/write-asset",
    component: lazyLoad("write-asset/WriteAssetHome"),
    name: "WriteAssetHome",
    children: [
      { path: "add", component: lazyLoad("write-asset/WriteAssetForm") },
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
export default writeAssetRouter;
