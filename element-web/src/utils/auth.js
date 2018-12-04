import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
const username = 'Admin-username';

export function getUsername() {
  return Cookies.get(username);
}

export function setUsername(name) {
  return Cookies.set(username, name);
}

export function removeUsername() {
  return Cookies.remove(username);
}

const avatar = 'Admin-avatar';

export function getAvatar() {
  return Cookies.get(avatar);
}

export function setAvatar(key) {
  return Cookies.set(avatar, key);
}

export function removeAvatar() {
  return Cookies.remove(avatar);
}
