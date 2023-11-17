import {getToken, setToken, removeToken} from "@/utils/auth";
import {login, getUserInfo} from "@/api/user";

const state = {
  // 从缓存中读取token数据
  token: getToken(),
  // 用户登陆后，存储用户基本资料
  userInfo: {}
}

const mutations = {
  setToken(state, token) {
    state.token = token
    // token同步到缓存中
    setToken(token)
  },
  removeToken(state) {
    // 删除vuex中的token
    state.token = null
    removeToken()
  },
  setUserInfo(state,userInfo)
  {
    state.userInfo = userInfo
  }
}

const actions = {
  async login(context, loginData) {
    // 调用登陆接口
    let token = await login(loginData);
    context.commit('setToken', token)
  },
  async getUserInfo(context) {
    // 发送axios请求，获取用户信息
    const result = await getUserInfo()
    context.commit('setUserInfo',result)
  },
  logout(context)
  {
    // 退出登陆，删除token，删除用户信息
    context.commit('removeToken')
    context.commit('setUserInfo',{})
  }
}


const getters = {}


export default {
  namespaced: true,
  state, mutations, actions, getters
}
