'use strict';

const jwt = require('jwt-simple');
const Service = require('egg').Service;
module.exports = class extends Service {
  /**
   * 生成token
   * @param {User} user 用户数据
   */
  async generate(user) {
    return jwt.encode(
      {
        _id: user._id,
        iat: +new Date(),
        exp: +new Date() + 7 * 24 * 60 * 60 * 1000
      },
      this.ctx.app.config.secret
    );
  }
};
