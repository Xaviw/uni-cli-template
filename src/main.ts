// uni-network polyfill
import 'core-js/actual/array/iterator'
import 'core-js/actual/promise'
import 'core-js/actual/object/assign'
import 'core-js/actual/promise/finally'

import { createSSRApp } from 'vue'

import App from './App.vue'

import { setupPinia } from '@/stores'

import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)

  setupPinia(app)

  return {
    app,
  }
}
