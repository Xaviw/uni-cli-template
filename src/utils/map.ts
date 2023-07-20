import amap from '@/libs/amap-wx.130.js'

const amap_wx_key = import.meta.env.VITE_AMAP_WX_KEY

export const amapFunc: any = new amap.AMapWX({ key: amap_wx_key })
