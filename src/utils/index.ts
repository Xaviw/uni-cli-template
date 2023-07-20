import { isObject } from 'lodash-es'

export const cnWeekDay = ['日', '一', '二', '三', '四', '五', '六']

/* 手机号脱敏 */
export function hideMobile(phone: string) {
  if (!checkPhone(phone))
    throw new Error('手机号错误')
  return `${phone.slice(0, 3)}****${phone.slice(7)}`
}

/* 银行卡号脱敏 */
export function hideBankCard(cardNumber: string) {
  if (!checkBankCard(cardNumber))
    throw new Error('银行卡错误')
  return '*'.repeat(cardNumber.length - 4) + cardNumber.slice(-4)
}

/* 米转换为距离 */
export const distanceFormatter = (m: number) => m < 1000 ? `${m}米` : `${(m / 1000).toFixed(2)}公里`

/**
 * 对象转query字符串并拼接
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj)
    parameters += `${key}=${encodeURIComponent(obj[key])}&`

  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

/* 深度合并对象 */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target)
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])

  return src
}
