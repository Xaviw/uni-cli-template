<script setup lang="ts">
const { showMsg, showNotice, toggleLoading } = useAppStore()

function onMsg() {
  showMsg({ message: '这是一条提示消息' })
}

function onNotice() {
  showNotice({ text: '这是一条通知信息', showIcon: true })
}

function onLoading() {
  toggleLoading()
  setTimeout(() => {
    toggleLoading(false)
  }, 3000)
}
</script>

<template>
  <view>
    <view class="text-center text-lg font-bold text-blue">
      Hello Word
    </view>
    <button type="primary" class="my-4" @tap="onMsg">
      提示消息
    </button>
    <button type="primary" class="my-4" @tap="onNotice">
      通知信息
    </button>
    <button type="primary" class="my-4" @tap="onLoading">
      Loading
    </button>
  </view>
</template>

<style></style>

<route type="home" lang="json">
{}
</route>
