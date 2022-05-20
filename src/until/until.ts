import { routesType } from '@/interface/types'

/**
 *
 * 将路由转换为一维数组
 * @param routeList 路由
 * @param deep 是否深层转化
 * @param auth 路由是否需要检查授权, 路由配置的auth优先级比这里高
 */

export function flattenRoute (
  routeList: routesType[],
  deep: boolean,
  auth: boolean
): routesType[] {
  const result: routesType[] = []

  for (let i = 0; i < routeList.length; i += 1) {
    const route = routeList[i]

    result.push({
      ...route,
      auth: typeof route.auth !== 'undefined' ? route.auth : auth
    })

    if (route.routes && deep) {
      result.push(...flattenRoute(route.routes, deep, auth))
    }
  }

  return result
}

// 导出文件 公共方法
export function DownloadFileFn (Response:any, blobType: any) {
  let fileName = Response.headers['content-disposition'].split(';')[1].split('filename=')[1]
  const fileNameUnicode = Response.headers['content-disposition'].split('filename*=')[1]
  if (fileNameUnicode) { // 当存在 filename* 时，取filename* 并进行解码（为了解决中文乱码问题）
    fileName = decodeURIComponent(fileNameUnicode.split("''")[1])
  }
  const blob = new Blob([Response.data], {
    type: blobType // 将会被放入到blob中的数组内容的MIME类型
  })
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // ie兼容性
    navigator.msSaveBlob(blob, fileName)
  } else {
    const objectUrl = URL.createObjectURL(blob) // 生成一个url
    const downloadElement = document.createElement('a')
    downloadElement.href = objectUrl
    downloadElement.download = fileName
    document.body.appendChild(downloadElement)
    downloadElement.click()
    document.body.removeChild(downloadElement)
    window.URL.revokeObjectURL(objectUrl)
  }
}
