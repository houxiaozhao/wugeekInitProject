const ObjectID = require('mongodb-core').BSON.ObjectID;
module.exports = class extends think.Mongo {
  addUser(user) {
    return this.model('user').add({
      username: user.username,
      password: think.md5(user.password),
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
