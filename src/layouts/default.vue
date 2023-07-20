<script setup lang="ts">
const { msgText, msgType, msgDuration, msgRef: _msgRef, noticeProps, loading } = storeToRefs(useAppStore())

const msgRef = ref()

onMounted(() => {
  _msgRef.value = msgRef.value
})
</script>

<template>
  <view>
    <uni-notice-bar v-if="noticeProps?.text" show-close single v-bind="noticeProps" @close="noticeProps.text = ''" />

    <uni-popup ref="msgRef" type="message">
      <uni-popup-message :type="msgType" :message="msgText" :duration="msgDuration" />
    </uni-popup>

    <slot />

    <view v-if="loading" class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-between bg-black bg-opacity-50">
      <div class="loader" />
    </view>
  </view>
</template>

<style>
  .loader:after,
  .loader:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0.5em;
    height: 0.5em;
    border-radius: 0.25em;
    transform: translate(-50%, -50%);
  }

  .loader:before {
    animation: before 2s infinite;
  }

  .loader:after {
    animation: after 2s infinite;
  }

  @-webkit-keyframes before {
    0% {
      width: 0.5em;
      box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75),
        -1em 0.5em rgba(111, 202, 220, 0.75);
    }

    35% {
      width: 2.5em;
      box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75),
        0 0.5em rgba(111, 202, 220, 0.75);
    }

    70% {
      width: 0.5em;
      box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75),
        1em 0.5em rgba(111, 202, 220, 0.75);
    }

    to {
      box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75),
        -1em 0.5em rgba(111, 202, 220, 0.75);
    }
  }

  @keyframes before {
    0% {
      width: 0.5em;
      box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75),
        -1em 0.5em rgba(111, 202, 220, 0.75);
    }

    35% {
      width: 2.5em;
      box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75),
        0 0.5em rgba(111, 202, 220, 0.75);
    }

    70% {
      width: 0.5em;
      box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75),
        1em 0.5em rgba(111, 202, 220, 0.75);
    }

    to {
      box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75),
        -1em 0.5em rgba(111, 202, 220, 0.75);
    }
  }

  @-webkit-keyframes after {
    0% {
      height: 0.5em;
      box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75),
        -0.5em -1em rgba(233, 169, 32, 0.75);
    }

    35% {
      height: 2.5em;
      box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75),
        -0.5em 0 rgba(233, 169, 32, 0.75);
    }

    70% {
      height: 0.5em;
      box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75),
        -0.5em 1em rgba(233, 169, 32, 0.75);
    }

    to {
      box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75),
        -0.5em -1em rgba(233, 169, 32, 0.75);
    }
  }

  @keyframes after {
    0% {
      height: 0.5em;
      box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75),
        -0.5em -1em rgba(233, 169, 32, 0.75);
    }

    35% {
      height: 2.5em;
      box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75),
        -0.5em 0 rgba(233, 169, 32, 0.75);
    }

    70% {
      height: 0.5em;
      box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75),
        -0.5em 1em rgba(233, 169, 32, 0.75);
    }

    to {
      box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75),
        -0.5em -1em rgba(233, 169, 32, 0.75);
    }
  }
</style>
