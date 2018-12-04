'use strict';
const Service = require('egg').Service;
const Sha256 = require('crypto-js/hmac-sha256');
const rand = require('csprng');
module.exports = class extends Service {
  /**
   * 筛选
   */
  async index(payload) {
    const { currentPage = 1, pageSize = 10, search } = payload;
    let res = [];
    let count = 0;
    let skip = (Number(currentPage) - 1) * Number(pageSize);
    if (search) {
      res = await this.ctx.model.Admin.find({
        username: { $regex: search }
      })
        .skip(skip)
        .limit(Number(pageSize))
        .sort({ createdAt: -1 })
        .exec();
      count = await this.ctx.model.Admin.count({
        username: { $regex: search }
      }).exec();
    } else {
      res = await this.ctx.model.Admin.find({})
        .skip(skip)
        .limit(Number(pageSize))
        .sort({ createdAt: -1 })
        .exec();
      count = await this.ctx.model.Admin.count({}).exec();
    }
    let data = res.map((e, i) => {
      const jsonObject = Object.assign({}, e._doc);
      jsonObject.key = i;
      return jsonObject;
    });
    return {
      pageSize: Number(pageSize),
      currentPage: Number(currentPage),
      count: count,
      totalPages: Math.ceil(count / Number(pageSize)),
      data: data
    };
  }
  async create(payload) {
    const { ctx } = this;
    const salt = rand(256, 36);
    payload.password = Sha256(
      payload.password + salt,
      ctx.app.config.secret
    ).toString();
    payload.salt = salt;
    return ctx.model.Admin.create(payload);
  }
  /**
   * 获取一个
   * @param {*} _id id
   */
  async show(_id) {
    return this.ctx.model.Admin.findOne({
      _id: _id
    });
  }
  /**
   * 删除一个
   * @param {*} _id id
   */
  async destroy(_id) {
    return this.ctx.model.Admin.findOneAndRemove({
      _id: _id
    });
  }
  /**
   * 更新
   * @param {*} _id id
   * @param {*} payload
   */
  async update(_id, payload) {
    return this.ctx.model.Admin.findOneAndUpdate(
      {
        _id: _id
      },
      payload
    );
  }
  async findByMobile(mobile) {
    return this.ctx.model.Admin.findOne({
      mobile
    });
  }
  async login(payload) {
    const { ctx, service } = this;
    const admin = await service.admin.findByMobile(payload.mobile);
    if (
      !admin ||
      admin.password !==
        Sha256(payload.password + admin.salt, ctx.app.config.secret).toString()
    ) {
      ctx.throw(400, '手机号或密码错误');
    }
    return {
      userinfo: {
        _id: admin._id,
        username: admin.username,
        type: admin.type,
        mobile: admin.mobile,
        avatar: admin.avatar
      },
      token: await service.token.generate(admin)
    };
  }
};
