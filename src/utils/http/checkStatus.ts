export function checkStatus(
  status: number,
  message: string,
): string {
  let errorMessage = ''

  switch (status) {
    case 400:
      errorMessage = `${message}`
      break
    case 401:
      errorMessage = '登录信息已过期！'
      break
    case 403:
      errorMessage = '当前没有权限访问！'
      break
    case 404:
      errorMessage = '网络请求错误，没有找到该资源！'
      break
    case 405:
      errorMessage = '网络请求错误，请求方法未允许！'
      break
    case 408:
      errorMessage = '网络请求超时！'
      break
    case 500:
    case 501:
    case 503:
      errorMessage = '服务器错误，请稍后再试！'
      break
    case 502:
      errorMessage = '网络错误，请检查您的网络！'
      break
    case 504:
      errorMessage = '网络超时！'
      break
    case 505:
      errorMessage = 'http版本不支持该请求！'
      break
    default:
  }

  return errorMessage
}
