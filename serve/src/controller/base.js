const jwt = require('jwt-simple');
module.exports = class extends think.Controller {
  async __before() {
    if (this.ctx.config('allowUrls').indexOf(this.ctx.url.split('?')[0]) === -1) {
      if (!this.ctx.headers.authorization) {
        this.fail(999, '没有认证');
        return false;
      }
      // 使用token调用
      let payload = null;
      try {
        payload = jwt.decode(this.ctx.request.header.authorization.split(' ')[1], this.ctx.config('secret'));
        const user = await this.mongo('v1/user').getUserByID(payload._id);
        if (think.isEmpty(user)) {
          this.fail(999, 'token有误');
          return false;
        }
        this.ctx.state.userid = payload._id;
      } catch (error) {
        this.fail(999, '认证失败');
        return false;
      }
    }
  }
};
