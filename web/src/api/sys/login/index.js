import request from '@/plugin/axios';
import ip from './../../ip';
export function AccountLogin(data) {
  return request({
    url: ip.ip + 'auth/login',
    method: 'post',
    data
  });
}
