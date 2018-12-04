'use strict';

const Controller = require('./../core/base_controller');
module.exports = class extends Controller {
  async index() {
    const { ctx, service } = this;
    const payload = ctx.query;
    const res = await service.admin.index(payload);
    this.success(res);
  }
  async create() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.admin.create(payload);
    this.success(res._id);
  }
  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.admin.show(id);
    this.success(res);
  }
  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.admin.destroy(id);
    this.success(res._id);
  }
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    const res = await service.admin.update(id, payload);
    this.success(res._id);
  }
  async signup() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.admin.create(payload);
    this.success(res._id);
  }
  async login() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.admin.login(payload);
    this.success(res);
  }
};
