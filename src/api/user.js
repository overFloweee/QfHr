import request from "@/utils/request";

export function login(loginData){
  return request(
    {
      url:'/sys/login',
      method: 'post',
      data: loginData
    }
  )
}

