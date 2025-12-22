<script setup lang="ts">
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
  <div class="flex h-screen w-full overflow-hidden">
    <!-- Sidebar -->
    <Sidebar></Sidebar>
    <!-- End Sidebar -->
    <div class="flex-1 flex flex-col h-full min-w-0">
      <!-- Header -->
      <Header></Header>
      <!-- End Header -->

      <RouterView></RouterView>
    </div>
  </div>
</template>
