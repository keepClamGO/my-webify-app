import {fetch, post} from "../http/index";
import {Ipayload} from "../interface/types"
// 接口路径
export const api = {
  login: '/login'
}
// 请求方法
export const actions = {
  async login (payload: Ipayload): Promise<any> {
    const {code, data} = await post(api.login, payload)
    if (code === 200) {
      return data
    }
  },
}