import request from '@/utils/request';

export function login(username, password) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: {
      mobile: username,
      password
    }
  });
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  });
}
