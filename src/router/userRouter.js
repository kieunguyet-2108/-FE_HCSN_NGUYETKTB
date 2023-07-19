
function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`);
}
/**
 * @description: Router cho màn hình đăng nhập
 * @param: {any} 
 * @return: {any} 
 * @author: NguyetKTB 19/07/2023
 */
const userRouter = [
  {
    path: "/user",
    component: lazyLoad("user/Login"),
    name: "Login",
  },
];

export default userRouter;
