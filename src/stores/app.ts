import type { UniNoticeBarProps, UniPopupInstance, UniPopupMessageProps, UniPopupMessageType } from '@uni-helper/uni-ui-types'

type NoticeProps = UniNoticeBarProps & { type?: UniPopupMessageType }

export const useAppStore = defineStore(
  'app',
  () => {
    const isH5 = ref(false)
    // #ifdef H5
    isH5.value = true
    // #endif

    // 临时提示信息
    const msgText = ref<string>()
    const msgType = ref<UniPopupMessageType>()
    const msgRef = ref<UniPopupInstance>()
    const msgDuration = ref<number>(2000)

    const showMsg = (options: Partial<UniPopupMessageProps>) => {
      msgText.value = options.message || ''
      msgType.value = options.type
      msgDuration.value = options.duration || 2000
      msgRef.value?.open?.('message')
    }

    // 固定提示信息
    const noticeProps = ref<NoticeProps>({})
    const noticeColors: Record<UniPopupMessageType, object> = {
      error: { color: '#f56c6c', backgroundColor: '#fde2e2', moreColor: '#f56c6c' },
      info: { color: '#909399', backgroundColor: '#f2f6fc', moreColor: '#909399' },
      success: { color: '#09bb07', backgroundColor: '#e1f3d8', moreColor: '#09bb07' },
      warn: { color: '#e6a23c', backgroundColor: '#faecd8', moreColor: '#e6a23c' },
    }
    const showNotice = (options: NoticeProps) => {
      if (options.type)
        options = { ...options, ...noticeColors[options.type] }

      noticeProps.value = options
    }

    // 全局loading
    const loading = ref<boolean>(false)
    const toggleLoading = (show: boolean = true) => {
      loading.value = show
    }

    // 网络状况
    const isOnline = useOnline()
    watchEffect(() => {
      if (!isOnline) {
        noticeProps.value = {
          showIcon: true,
          type: 'warn',
          text: '当前无网络，请检查您的设备！',
        }
      }
    })

    return {
      isH5,
      msgText,
      msgType,
      msgDuration,
      msgRef,
      showMsg,
      noticeProps,
      showNotice,
      loading,
      toggleLoading,
    }
  })
