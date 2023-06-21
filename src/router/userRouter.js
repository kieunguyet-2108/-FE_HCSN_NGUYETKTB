
function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`);
}
const userRouter = [
  {
    path: "/user",
    component: lazyLoad("user/Login"),
    name: "Login",
  },
];

export default userRouter;
