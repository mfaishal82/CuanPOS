<script setup>
defineProps({
  openCam: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <div v-show="openCam" id="qr-reader" class="absolute inset-0 w-full h-full"></div>
</template>
