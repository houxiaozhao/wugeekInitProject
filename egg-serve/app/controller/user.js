'use strict';

const Controller = require('./../core/base_controller');
module.exports = class extends Controller {
  async index() {
    const { ctx, service } = this;
    const payload = ctx.query;
    const res = await service.user.index(payload);
    this.success(res);
  }
  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.user.create(payload);
    this.success(res._id);
  }
  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.user.show(id);
    this.success(res);
  }
  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.user.destroy(id);
    this.success(res._id);
  }
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    const res = await service.user.update(id, payload);
    this.success(res._id);
  }
  async userinfo() {
    const { ctx, service } = this;
    const res = await service.user.show(ctx.state.userid);
    this.success(res);
  }
  async editpassword() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.user.editpassword(ctx.state.userid, payload);
    this.success(res);
  }
  async getall() {
    const { ctx, service } = this;
    const res = await service.user.getall();
    this.success(res);
  }
};
