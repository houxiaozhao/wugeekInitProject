// default config
module.exports = {
  port: 8360,
  workers: 1,
  secret: 'dolor autem voluptatem vel nam ut',
  model: {
    type: 'mongo',
    mongo: {
      logConnect: true,
      host: '127.0.0.1',
      port: 27017,
      user: '',
      password: '',
      database: 'PM2'
    }
  },
  mqttconfig: {
    clientId: new Date().getTime().toString(),
    username: '',
    password: '',
    port: 1883,
    host: ''
  },
  wampConfig: { url: '', realm: 'realm1' },
  redisConfig: {
    port: 6379,
    host: '127.0.0.1',
    family: 4,
    password: '',
    db: 0
  },
  mqttTopic: {},
  // 允许不需要token就可以直接访问的接口，
  allowUrls: ['v1/mote/checkMote']
};
