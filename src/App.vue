<script setup lang="ts">
import { RouterView } from 'vue-router'
import ToastProvider from '@/components/toast/ToastProvider.vue';
</script>

<template>
  <div class="wrapper">
    <ToastProvider />
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper{
  min-height: 100vh;
  position: relative;
}
.wrapper:after{
  content : "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url('./assets/images/background.jpg');
    background-repeat: repeat;
    width: 100%;
    height: 100%;
    opacity : 0.1;
    z-index: -1;
}
</style>