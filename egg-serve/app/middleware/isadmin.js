'use strict';
const jwt = require('jwt-simple');

module.exports = (option, app) => {
  return async function(ctx, next) {
    if (!ctx.headers.authorization) {
      ctx.body = {
        errno: 999,
        errmsg: '需要token'
      };
    } else {
      let payload = null;
      try {
        payload = jwt.decode(
          ctx.headers.authorization.split(' ')[1],
          ctx.app.config.secret
        );
        //TODO: 需要验证id是否正确
        ctx.state.adminid = payload._id;
      } catch (error) {
        ctx.body = {
          errno: 999,
          errmsg: 'token不正确0'
        };
        return false;
      }
      await next();
    }
  };
};
