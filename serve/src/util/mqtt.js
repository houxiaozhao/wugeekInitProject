var MQTT = require('async-mqtt');
module.exports = {
  sendMqtt: (topic, data) => {
    console.log('发送mqtt');
    return new Promise((resolve, reject) => {
      var client = MQTT.connect(think.config('mqttconfig'));
      client.on('connect', async () => {
        try {
          await client.publish(topic, data);
          await client.end();
          resolve();
        } catch (e) {
          console.log(e.stack);
          reject(e);
        }
      });
    });
  }
};
