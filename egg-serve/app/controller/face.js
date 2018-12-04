'use strict';

const Controller = require('./../core/base_controller');
const { ImageClient } = require('image-node-sdk');

module.exports = class extends Controller {
  async faceVerify() {
    const { ctx, service } = this;
    const { img } = ctx.request.body || {};
    let imgClient = new ImageClient(ctx.app.config.tengxunyun);
    let res = JSON.parse(
      (await imgClient.faceVerify({
        data: {
          person_id: ctx.state.userid,
          url: img
        }
      })).body
    );
    this.success(res.data.ismatch);
  }
  async addFace() {
    const { ctx, service } = this;
    const { img } = ctx.request.body || {};
    let imgClient = new ImageClient(ctx.app.config.tengxunyun);
    let res = JSON.parse(
      (await imgClient.faceAddFace({
        data: {
          person_id: ctx.state.userid,
          urls: [img]
        }
      })).body
    );
    this.success(res.data.added);
  }
};
