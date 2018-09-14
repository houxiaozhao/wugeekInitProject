const autobahn = require('autobahn');
const connection = new autobahn.Connection(think.config('wampConfig'));
connection.open();
module.exports = {
  publish: (topic, message) => {
    return new Promise((resolve, reject) => {
      try {
        // connection.onopen = function(session) {
        connection.session.publish(topic, [message]);
        // connection.close();
        resolve();
        // };
        // connection.open();
      } catch (error) {
        reject(error);
      }
    });
  }
};
