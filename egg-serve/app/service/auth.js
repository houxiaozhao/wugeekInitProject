'use strict';
const Sha256 = require('crypto-js/hmac-sha256');
const rand = require('csprng');
const Service = require('egg').Service;

module.exports = class extends Service {
  async create(payload) {
    const { ctx } = this;
    const salt = rand(256, 36);
    payload.password = Sha256(
      payload.password + salt,
      ctx.app.config.secret
    ).toString();
    payload.salt = salt;
    return ctx.model.User.create(payload);
  }
  async login(payload) {
    const { ctx, service } = this;
    const user = await service.user.findByMobile(payload.mobile);
    if (
      !user ||
      user.password !==
        Sha256(payload.password + user.salt, ctx.app.config.secret).toString()
    ) {
      ctx.throw(404, '手机号或密码错误');
    }
    return {
      userinfo: {
        _id: user._id,
        username: user.username,
        type: user.type,
        mobile: user.mobile,
        avatar: user.avatar
      },
      token: await service.token.generate(user)
    };
  }
};
