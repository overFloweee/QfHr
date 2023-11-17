import request from "@/utils/request";



// 获取组织结构数据
export function getDepartment(){
  return request({
    url: '/company/department',
  })
}
