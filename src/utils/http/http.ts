import { cloneDeep, isString } from 'lodash-es'
import { joinTimestamp } from './helper'
import { checkStatus } from './checkStatus'
import type { RequestOptions, Result } from './types'
import { getToken } from '@/utils/auth'
import { RequestEnum, ResultEnum } from '@/enums/httpEnum'
import { setObjToUrlParams } from '@/utils'

type UniRequestOptions = UniApp.RequestOptions & { params?: any }

export interface CreateRequestOptions extends UniRequestOptions {
  authenticationScheme?: string
  urlPrefix?: string
  requestOptions?: RequestOptions
}

const { showMsg } = useAppStore()

export class VRequest {
  private readonly options: CreateRequestOptions

  constructor(options: CreateRequestOptions) {
    this.options = options
  }

  request<T = any>(config: UniRequestOptions, options?: RequestOptions): Promise<T> {
    const configTemp: CreateRequestOptions = cloneDeep(Object.assign({}, this.options, config))
    const optionsTemp: RequestOptions = Object.assign({}, this.options.requestOptions, options)

    const {
      urlPrefix, apiUrl, joinPrefix, joinTime, withToken, joinParamsToUrl,
      isReturnNativeResponse, isTransformResponse,
    } = optionsTemp

    // 处理token
    const token = getToken()
    if (token && withToken !== false) {
      Object.assign(configTemp.header, {
        Authorization: configTemp.authenticationScheme
          ? `${configTemp.authenticationScheme} ${token}`
          : token,
      })
    }

    // 处理api地址前缀
    if (joinPrefix)
      configTemp.url = `${urlPrefix}${configTemp.url}`

    // 处理GET请求params参数和添加时间戳选项
    const params = configTemp.params || {}
    if (params) {
      if (configTemp.method?.toUpperCase() === RequestEnum.GET) {
        if (!isString(params)) {
          configTemp.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
          if (joinParamsToUrl && configTemp.params) {
            configTemp.url = setObjToUrlParams(
              configTemp.url,
              Object.assign({}, configTemp.params, configTemp.data))
            configTemp.params = undefined
          }
        }
        else {
          configTemp.url = `${config.url + params}${joinTimestamp(joinTime, true)}`
          configTemp.params = undefined
        }
      }
    }

    // 拼接完整请求地址
    if (apiUrl && isString(apiUrl))
      configTemp.url = `${apiUrl}${configTemp.url}`

    return new Promise((resolve, reject) => {
      uni.request({
        url: configTemp.url,
        data: configTemp.data || {},
        method: configTemp.method?.toUpperCase() as UniApp.RequestOptions['method'],
        header: configTemp.header || {},
        success: (res) => {
          const data = res.data as Result
          const _message: string = data?.message ?? ''
          if (res.statusCode && res.statusCode !== 200) {
            const errorMsg = checkStatus(res.statusCode, _message)
            errorMsg && showMsg({ message: errorMsg, type: 'error' })
          }
          else if (!data) {
            throw new Error('[HTTP] Request has no return value')
          }
          else if (isReturnNativeResponse) {
            resolve(res as any)
          }
          else if (!isTransformResponse) {
            resolve(res.data as any)
          }
          else {
            //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
            const { code, result, message } = data

            // 这里逻辑可以根据项目进行修改
            const hasSuccess = data && Reflect.has(data, 'code') && (code === ResultEnum.SUCCESS || code === 200)
            if (hasSuccess) {
              resolve(result as unknown as Promise<T>)
            }
            else {
              let timeoutMsg = ''
              switch (code) {
                case ResultEnum.TIMEOUT:
                  timeoutMsg = '登录信息已过期！'
                  // 这里需要清除用户登录信息
                  break
                default:
                  if (message)
                    timeoutMsg = message
              }
              showMsg({ message: timeoutMsg, type: 'warn' })
              throw new Error(timeoutMsg || 'The interface request failed, please try again later!')
            }
          }
        },
        fail: (e) => {
          reject(e.errMsg)
        },
        complete() { },
      })
    })
  }

  post<T = any>(config: UniRequestOptions, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  get<T = any>(config: UniRequestOptions, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  put<T = any>(config: UniRequestOptions, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T = any>(config: UniRequestOptions, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }
}
