const Base = require('./../base');
const jwt = require('jwt-simple');

module.exports = class extends Base {
  async loginAction() {
    const loginUser = this.post();
    if (!loginUser.username || !loginUser.password) {
      this.fail(400, '参数错误');
      return false;
    }
    // 获取用户，然后判断密码
    const userTmp = await this.mongo('v1/user').getUserByName(loginUser.username);
    console.log(userTmp);
    console.log(think.md5(loginUser.password));
    if (think.isEmpty(userTmp) || userTmp.password !== think.md5(loginUser.password)) {
      this.fail(400, '登陆失败,用户名或密码错误');
      return false;
    }
    this.success({
      userinfo: {
        _id: userTmp._id,
        username: userTmp.username,
        role: userTmp.role
      },
      token: jwt.encode(
        {
          _id: userTmp._id,
          username: userTmp.username,
          iat: +new Date(),
          exp: +new Date() + 7 * 24 * 60 * 60 * 1000
        },
        think.config('secret')
      )
    });
  }
  async signupAction() {
    const signupUser = this.post();
    if (!signupUser.username || !signupUser.password || !signupUser.phone) {
      this.fail(400, '参数错误');
      return false;
    }
    // 判断用户名是否已存在
    const userTmp = await this.mongo('v1/user').getUserByName(signupUser.username);
    if (!think.isEmpty(userTmp)) {
      this.fail(400, '用户名重复');
      return false;
    }
    // 创建用户
    this.success(await this.mongo('v1/user').addUser(signupUser));
  }
  async changePasswordAction() {
    const newPassword = this.post('newPassword');
    const oldPassword = this.post('oldPassword');
    const user = await this.mongo('v1/user').getUserByID(this.ctx.state.userid);
    // 判断旧密码是否正确
    if (think.isEmpty(user) || user.password !== think.md5(oldPassword)) {
      this.fail(400, '修改失败');
      return false;
    }
    this.success(await this.mongo('v1/user').editUser(this.ctx.state.userid, { password: think.md5(newPassword) }));
  }
};
