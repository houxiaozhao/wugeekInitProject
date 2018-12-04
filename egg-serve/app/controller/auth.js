'use strict';

const Controller = require('./../core/base_controller');
const { ImageClient } = require('image-node-sdk');

module.exports = class extends Controller {
  async signup() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.auth.create(payload);
    let imgClient = new ImageClient(ctx.app.config.tengxunyun);
    await imgClient.faceNewPerson({
      data: {
        group_ids: [ctx.app.config.tengxunyunGpid],
        person_id: res._id.toString(),
        url: payload.img,
        person_name: payload.username
      }
    });
    this.success(res._id);
  }
  async login() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const res = await service.auth.login(payload);
    this.success(res);
  }
  async faceLogin() {
    const { ctx, service } = this;
    const { img } = ctx.request.body || {};
    let imgClient = new ImageClient(ctx.app.config.tengxunyun);
    let res = JSON.parse(
      (await imgClient.faceIdentify({
        data: {
          group_id: ctx.app.config.tengxunyunGpid,
          url: img
        }
      })).body
    );
    console.log(res.data);
    if (res.code !== 0) {
      this.fail('登陆失败,人脸库错误', 400);
    } else if (res.data.candidates.length === 0) {
      this.fail('登陆失败,图片库没有匹配', 400);
    } else if (res.data.candidates[0].confidence < 90) {
      this.fail('登陆失败,匹配不成功', 400);
    } else {
      let userid = res.data.candidates[0].person_id;
      let user = await ctx.service.user.show(userid);
      this.success({
        userinfo: {
          _id: user._id,
          username: user.username,
          mobile: user.mobile,
          avatar: user.avatar
        },
        token: await service.token.generate(user)
      });
    }
  }
};
