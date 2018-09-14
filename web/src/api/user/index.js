import request from '@/plugin/axios';
import ip from './../ip';
export function getAllUser() {
  return request({
    url: ip.ip + 'user/getUsers',
    method: 'get'
  });
}
export function removeUser(userid) {
  return request({
    url: ip.ip + 'user/removeUser',
    method: 'get',
    params: {
      userid: userid
    }
  });
}
export function addUser(data) {
  return request({
    url: ip.ip + 'user/addUser',
    method: 'post',
    data: data
  });
}
export function editUserinfo(userid, data) {
  return request({
    url: ip.ip + 'user/editUserinfo',
    method: 'post',
    data: data,
    params: {
      userid: userid
    }
  });
}
export function editUser(data) {
  return request({
    url: ip.ip + 'user/editUser',
    method: 'post',
    data: data
  });
}
export function getUserinfo() {
  return request({
    url: ip.ip + 'user/getUserinfo',
    method: 'get'
  });
}
export function changePassword(newPassword, oldPassword) {
  return request({
    url: ip.ip + 'auth/changePassword',
    method: 'post',
    data: {
      newPassword,
      oldPassword
    }
  });
}
