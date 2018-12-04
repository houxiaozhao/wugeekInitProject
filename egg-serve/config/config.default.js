'use strict';

module.exports = appInfo => {
  const config = (exports = {});
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1540362517776_5361';
  config.secret =
    'Autem dolor molestias et odit sint.Ullam omnis quasi ullam ipsa occaecati cumque id.';
  config.wechat = {
    appid: '',
    secret: ''
  };
  config.tengxunyun = {
    AppId: '',
    SecretId: '',
    SecretKey: ''
  };
  config.tengxunyunGpid = '00000001';
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  };
  config.bodyParser = {
    jsonLimit: '1mb',
    formLimit: '1mb'
  };
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/template',
    options: {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0
    }
  };
  return config;
};
