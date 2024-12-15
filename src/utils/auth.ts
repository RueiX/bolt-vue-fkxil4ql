import Cookies from 'js-cookie'

const TokenKey = 'yuebon_soft_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function saveTokenExpire(expires_in: number) {
  const curTime = new Date()
  const expiredate = new Date(curTime.setMinutes(curTime.getMinutes() + expires_in))
  Cookies.set("expires_in", expires_in.toString())
  Cookies.set("tokenExpire", expiredate.toString())
  Cookies.set("refresh_time", expiredate.toString())
}

export function getTokenExpire() {
  return Cookies.get("tokenExpire")
}

export function setTokenRefreshTime(expiredate: Date) {
  Cookies.set("refresh_time", expiredate.toString())
}

export function getTokenRefreshTime() {
  return Cookies.get("refresh_time")
}

export function saveRefreshtime() {
  const nowtime = new Date()
  const lastRefreshtime = getTokenRefreshTime() 
    ? new Date(getTokenRefreshTime()) 
    : new Date(-1)
  const expiretime = new Date(Date.parse(getTokenExpire() || ''))
  const refreshCount = 20 // 滑动系数
  
  if (lastRefreshtime >= nowtime) {
    const newTime = nowtime > expiretime ? nowtime : expiretime
    newTime.setMinutes(newTime.getMinutes() + refreshCount)
    setTokenRefreshTime(newTime)
  } else {
    setTokenRefreshTime(new Date(-1))
  }
}