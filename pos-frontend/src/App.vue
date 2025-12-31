<script setup>
import { RouterView } from 'vue-router'
import useUserStore from './stores/userStore'
import LoadingScreen from './components/LoadingScreen.vue'
// import HelloWorld from './components/HelloWorld.vue'
// import '@tailwindcss/vite'
const userStore = useUserStore()
</script>

<template>
  <LoadingScreen v-if="userStore.loading"></LoadingScreen>

  <RouterView v-else />
</template>
