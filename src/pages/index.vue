<script setup lang="ts">
function onNav() {
  uni.navigateTo({ url: '/pages/hi?name=test' })
}
</script>

<template>
  <view>
    <uni-calendar />
    <button @tap="onNav">
      跳转
    </button>
  </view>
</template>

<style></style>

<route type="home" lang="json">
{}
</route>
