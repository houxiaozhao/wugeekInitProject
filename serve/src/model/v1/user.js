const ObjectID = require('mongodb-core').BSON.ObjectID;
const Sha256 = require('crypto-js/hmac-sha256');
const rand = require('csprng');

module.exports = class extends think.Mongo {
  addUser(user) {
    const salt = rand(256, 36);
    return this.model('user').add({
      username: user.username,
      password: Sha256(user.password + salt, think.config('secret')).toString(),
      salt: salt,
      phone: user.phone,
      email: user.email,
      role: 'user'
    });
  }
  getUserByName(username) {
    return this.model('user')
      .where({ username: username })
      .find();
  }
  getUserByID(userid) {
    return this.model('user')
      .where({ _id: new ObjectID(userid) })
      .find();
  }
  getUsers() {
    return this.model('user')
      .field('_id,username,phone,email,role')
      .select();
  }
  editUser(userid, user) {
    return this.model('user')
      .where({ _id: new ObjectID(userid) })
      .update(user);
  }
  removeUser(userid) {
    return this.model('user')
      .where({ _id: new ObjectID(userid) })
      .delete();
  }
};
