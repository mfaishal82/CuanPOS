<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
import LeftSidebar from '@/components/LeftSidebar.vue'
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden">
    <!-- Sidebar -->
    <LeftSidebar></LeftSidebar>
    <!-- End Sidebar -->
    <div class="flex-1 flex flex-col h-full min-w-0">
      <!-- Header -->
      <MainHeader></MainHeader>
      <!-- End Header -->
      <RouterView></RouterView>
    </div>
  </div>
</template>
