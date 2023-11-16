import request from "@/utils/request";

export function login(loginData){
  return request(
    {
      url:'/sys/login',
      method: 'post',
      data: {
        mobile: loginData.phone,
        password: loginData.password
      }
    }
  )
}

export function getUserInfo(){
  return request(
    {
      url:'/sys/profile',
      method: 'get'
    }
  )
}
