import { post, getDownload, postDownload } from '../http/index'
import { Ipayload } from '../interface/types'
// 接口路径
export const api = {
  login: '/login',
  uploadFile: '/o/file/uploadFile',
  downloadTemplate: '/o/file/downloadTemplate',
  uploadTable: 'o/file/uploadRecordsList',
  dataSynchronization: 'o/sync/dataSynchronization',
  dataSynchronizationList: 'o/sync/dataSynchronizationList'
}
// 请求方法
export const actions = {
  async login (payload: Ipayload): Promise<any> {
    const { code, data } = await post(api.login, payload)
    console.log(code, data)
    if (code === 200) {
      return data
    }
  },
  async uploadFile (payload: Ipayload): Promise<any> {
    console.log(payload)
    const response = await postDownload(api.uploadFile, payload)
    if (response) {
      return response
    }
  },
  async downloadTemplate (payload: Ipayload): Promise<any> {
    const response = await getDownload(api.downloadTemplate, payload)
    if (response) {
      return response
    }
  },
  async uploadTable (payload: Ipayload): Promise<any> {
    const response = await post(api.uploadTable, payload)
    if (response) {
      return response
    }
  },
  async dataSynchronization (payload: Ipayload): Promise<any> {
    const { code, data } = await post(api.dataSynchronization, payload)
    console.log(code, data)
    if (code === 200) {
      return data
    }
  },
  async dataSynchronizationList (payload: Ipayload): Promise<any> {
    const { code, data } = await post(api.dataSynchronizationList, payload)
    console.log(code, data)
    if (code === 200) {
      return data
    }
  }
}
