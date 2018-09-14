const Base = require('./../base');

module.exports = class extends Base {
  // 添加用户
  async addUserAction() {
    console.log(this.ctx.state.userid);
    const user = await this.mongo('v1/user').getUserByID(this.ctx.state.userid);
    if (user.role !== 'admin') {
      this.fail(400, '没有权限');
      return false;
    }
    // 判断用户名是否已存在
    const userTmp = await this.mongo('v1/user').getUserByName(this.post().username);
    if (!think.isEmpty(userTmp)) {
      this.fail(400, '用户名重复');
      return false;
    }
    this.success(await this.mongo('v1/user').addUser(this.post()));
  }
  // 获取所有用户
  async getUsersAction() {
    const user = await this.mongo('v1/user').getUserByID(this.ctx.state.userid);
    if (user.role !== 'admin') {
      this.fail(400, '没有权限');
      return false;
    }
    this.success(await this.mongo('v1/user').getUsers());
  }
  // 获取用户信息
  async getUserinfoAction() {
    this.success(await this.mongo('v1/user').getUserByID(this.ctx.state.userid));
  }
  // 编辑用户自己信息
  async editUserAction() {
    const user = this.post();
    const edituser = {};
    if (user.phone) edituser.phone = user.phone;
    if (user.email) edituser.email = user.email;
    this.success(await this.mongo('v1/user').editUser(this.ctx.state.userid, edituser));
  }
  // 管理员编辑用户信息
  async editUserinfoAction() {
    const admin = await this.mongo('v1/user').getUserByID(this.ctx.state.userid);
    if (admin.role !== 'admin') {
      this.fail(400, '没有权限');
      return false;
    }
    const user = this.post();
    const edituser = {};
    if (user.phone) edituser.phone = user.phone;
    if (user.email) edituser.email = user.email;
    this.success(await this.mongo('v1/user').editUser(this.get('userid'), edituser));
  }
  async removeUserAction() {
    const user = await this.mongo('v1/user').getUserByID(this.ctx.state.userid);
    if (user.role !== 'admin') {
      this.fail(400, '没有权限');
      return false;
    }
    this.success(await this.mongo('v1/user').removeUser(this.get('userid')));
  }
};
