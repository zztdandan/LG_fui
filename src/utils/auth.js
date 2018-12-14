import Cookies from "js-cookie";
import global_config from "@/global_config";
const TokenKey = global_config.Auth.UserTokenName;

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
