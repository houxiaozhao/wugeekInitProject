const _ = require('lodash');
module.exports = {
  // 校验数据
  CheckSum: data => {
    let count = data.length / 2;
    let addr = 0;
    let sum = 0;
    while (count > 0) {
      sum = sum + parseInt('0x' + data.substr(addr * 2, 2));
      addr += 1;
      count -= 1;
    }
    while (sum > 255) {
      sum = parseInt(sum / 256) + (sum % 256);
    }
    var sum2 = (255 - sum).toString(16);
    if (sum2.length === 1) {
      sum2 = '0' + sum2;
    }
    return sum2;
  },
  // 大小端转换
  da2xiao: n => {
    return _.map(_.chunk(_.padStart(n.toString(16), 4, 0), 2), function(e) {
      return e.join('');
    })
      .reverse()
      .join('');
  }
};
