import { ACCESS_TOKEN } from '@/store/mutation-types'
import storage from '@/utils/storage'
import * as LoginApi from '@/api/login'
import * as UserApi from '@/api/user'

// 登陆成功后执行
const loginSuccess = (commit, { access_token, expires_in }) => {
  // 过期时间30天
  const expiryTime = expires_in * 3600
  // 保存tokne和userId到缓存
  storage.set(ACCESS_TOKEN, access_token, expiryTime)
  // 记录到store全局变量
  commit('SET_TOKEN', access_token)
}

export const state = {
  // 用户认证token
  token: '',
  // 用户信息
  userInfo: null
}

export const mutations = {
  SET_TOKEN: (state, value) => {
    state.token = value
  },
  SET_USER: (state, value) => {
    state.userInfo = value
  },
  SET_AVATAR: (state, avatar) => {
    state.userInfo.avatar = avatar
  },
}

export const actions = {

  // 用户登录(普通登录: 输入账号、密码)
  Login({ commit }, data) {
    return new Promise((resolve, reject) => {
      LoginApi.login(data, { custom: { catch: true } }).then(response => {
          const result = response.data;
          loginSuccess(commit, result)
          resolve(response)
        }).catch(reject)
    })
  },
  
  // 退出登录
  Logout({ commit }, data) {
    return new Promise((resolve, reject) => {
      LoginApi.logout(data, { custom: { catch: true } }).then(response => {
        storage.remove(ACCESS_TOKEN)
        commit('SET_TOKEN', '')
        commit('SET_USER', null)
        resolve(response)
      }).catch(reject)
    })
  },

  // 用户信息
  Info({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log(state.userInfo)
      if (state.userInfo) {
        return resolve(state.userInfo)
      }
      UserApi.getInfo().then(response => {
        const result = response.data;
        commit('SET_USER', result)
        resolve(response)
      }).catch(reject)
    })
  },
  
  // 修改用户信息
  UpdateInfo({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      UserApi.updateInfo(data).then(response => {
        commit('SET_USER', data)
        resolve(data)
      }).catch(reject)
    })
  },

  // 修改头像
  UpdateAvatar({ commit, state }, url) {
    return new Promise((resolve, reject) => {
      UserApi.updateAvatar(url).then(res => {
        commit('SET_AVATAR', res.data.imgUrl)
        resolve(res)
      }).catch(reject)
    })
  },
  
  // 修改密码
  UpdatePwd({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      UserApi.updatePwd(data).catch(reject)
    })
  },

}
