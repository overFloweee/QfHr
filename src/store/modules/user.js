import {getToken, setToken, removeToken} from "@/utils/auth";
import {login} from '@/api/user'

const state = {
  // 从缓存中读取token数据
  token: getToken()
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
  }
}

const actions = {
  async login(context, loginData) {
    // 调用登陆接口
    const token = await login(loginData)

    context.commit('setToken', token)

  }
}


const getters = {}


export default {
  namespaced: true,
  state, mutations, actions, getters
}
