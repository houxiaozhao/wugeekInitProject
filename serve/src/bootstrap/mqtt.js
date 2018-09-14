// invoked in master
const mqtt = require('mqtt');
var MQTTclient = mqtt.connect(think.config('mqttconfig'));
MQTTclient.on('connect', function() {
  // 此处订阅mqtt主题
});
MQTTclient.on('message', function(topic, message) {
  console.log('主题', topic);
  switch (topic) {
    case 'topic':
      break;
    default:
      break;
  }
});

// 效验数据
function checkSum(prepareData) {
  const data = prepareData.substr(0, prepareData.length - 2);
  const checksum = prepareData.substr(data.length);
  let count = data.length / 2;
  let addr = 0;
  let sum = 0;
  while (count > 0) {
    sum = sum + parseInt('0x' + data.substr(addr * 2, 2));
    addr += 1;
    count -= 1;
  }
  while (sum.toString(16).length > 2) {
    sum = (sum % 256) + parseInt(sum / 256);
  }
  if (parseInt('0x' + checksum) === 255 - sum) {
    return true;
  }
  return false;
}
