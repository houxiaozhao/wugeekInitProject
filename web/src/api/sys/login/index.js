import request from '@/plugin/axios';
import ip from './../../ip';
export function AccountLogin(data) {
  // 没有后台直接返回必要数据
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        userinfo: {
          _id: 'd064a13b-4d08-47f7-b38b-f0cba3596b07',
          username: 'houxiaozhao',
          role: 'admin'
        },
        token: 'dcbe78d1-ca0b-4af5-bcc1-032f34f7e458'
      }
    });
  });
  // return request({
  //   url: ip.ip + 'auth/login',
  //   method: 'post',
  //   data
  // });
}
