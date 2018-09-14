const Redis = require('ioredis');
var redis = new Redis(think.config('redisConfig'));
// 订阅
// redis
//   .psubscribe('__keyevent@0__:expired')
//   .then(count => {
//     console.log('redis订阅成功count:', count);
//   })
//   .catch(err => {
//     console.log('redis订阅失败', err);
//   });
redis.on('pmessage', function(pattern, channel, message) {
  console.log('收到redis过期消息');
});
