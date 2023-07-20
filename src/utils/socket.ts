import { useSocket } from '@uni-helper/uni-use'

export default useSocket('', {
  autoClose: false,
  autoReconnect: true,
  heartbeat: {
    interval: 10000,
    pongTimeout: 10000,
  },
  immediate: false,
  onConnected: () => { },
  onClosed: () => { },
  onMessage(task, result) {

  },
})
