'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const verification = app.middleware.verification();
  const isadmin = app.middleware.isadmin();

  //用户登陆注册
  router.post('/api/auth/signup', controller.auth.signup);
  router.post('/api/auth/login', controller.auth.login);
  router.post('/api/auth/faceLogin', controller.auth.faceLogin);
  router.get('/user/user/userinfo', verification, controller.user.userinfo);

  //管理员登陆注册
  router.post('/api/user/login', controller.admin.login);
  router.post('/api/user/signup', controller.admin.signup);

  router.post(
    '/user/face/faceVerify',
    verification,
    controller.face.faceVerify
  );
  router.post('/user/face/addFace', verification, controller.face.addFace);
  router.resources(
    'user',
    '/admin/users',
    isadmin,
    verification,
    controller.user
  );

  //=========user===========
  router.get('/api/user/getall', controller.user.getall);
  router.post('/api/user/editpassword', controller.user.editpassword);

  router.get('/api/wechat/code2Session', controller.wechat.code2Session);
};
