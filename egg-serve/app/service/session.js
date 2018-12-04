'use strict';
const Service = require('egg').Service;
class SessionService extends Service {
  setSession(readerid, sessionKey) {
    return this.ctx.model.Session.findOneAndUpdate(
      { readerid },
      { readerid, sessionKey },
      {
        upsert: true
      }
    );
  }
  getSession(readerid) {
    return this.ctx.model.Session.findOne({
      readerid: readerid
    });
  }
}

module.exports = SessionService;
