'use strict';
const { Controller } = require('egg');
class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      errno: 0,
      errmsg: '',
      data
    };
  }
  fail(msg, no) {
    this.ctx.body = {
      errno: no || 400,
      errmsg: msg || '内部错误'
    };
  }
}
module.exports = BaseController;
