import {getToken, setToken, removeToken} from "@/utils/auth";

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
  removeToken(state)
  {
    // 删除vuex中的token
    state.token = null
    removeToken()
  }
}

const actions = {
  login(context, loginData) {
    console.log(loginData)
    // 调用登陆接口


    context.commit('setToken', '123456')

  }
}


const getters = {}


export default {
  namespaced: true,
  state, mutations, actions, getters
}
