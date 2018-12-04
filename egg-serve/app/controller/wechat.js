'use strict';
const Controller = require('./../core/base_controller');
let axios = require('axios');
const WXBizDataCrypt = require('./../util/WXBizDataCrypt');
const sha1 = require('sha1');

module.exports = class extends Controller {
  async code2Session() {
    const { ctx, service } = this;
    const { code } = ctx.query;
    const wechatReturn = (await axios.get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${
        ctx.app.config.wechat.appid
      }&secret=${
        ctx.app.config.wechat.secret
      }&js_code=${code}&grant_type=authorization_code`
    )).data;
    console.log(wechatReturn);
    let reader = await ctx.service.reader.findByOpenidOrUnionid(
      wechatReturn.openid
    );
    if (!reader) {
      await ctx.service.reader.create2({
        name: wechatReturn.openid,
        openid: wechatReturn.openid,
        type: 'Student'
      });
      reader = await ctx.service.reader.findByOpenid(wechatReturn.openid);
    }
    this.success({
      userinfo: {
        _id: reader._id,
        type: reader.type
      },
      token: await service.token.generate(reader)
    });
  }
  async setWechatInfo() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    this.success(ctx.service.reader.setWechatInfo(payload));
  }
  async checkUserInfo() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const rawData = payload.rawData;
    const signature = payload.signature;
    const session = await this.service.session.getSession(
      this.ctx.state.userid
    );
    const signature2 = sha1(rawData + session.sessionKey);
    if (signature === signature2) {
      this.success(true);
    } else {
      this.success(false);
    }
  }
  async checkUserEncryptedData() {
    const { ctx, service } = this;
    const payload = ctx.request.body || {};
    const session = await this.service.session.getSession(ctx.state.userid);
    const pc = new WXBizDataCrypt(
      ctx.app.config.wechat.appid,
      session.sessionKey
    );
    const data = pc.decryptData(payload.encryptedData, payload.iv);
    await this.service.reader.setUnionid(this.ctx.state.userid, data.unionId);
    this.success('ok');
  }
};
