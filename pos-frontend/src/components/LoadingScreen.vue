<script setup>
import { ScalingSquaresSpinner } from 'epic-spinners'
</script>

<template>
  <div class="absolute inset-0 flex items-center justify-center bg-gray-100 opacity-50">
    <ScalingSquaresSpinner :animation-duration="1250" :size="65" color="green" />
  </div>
</template>
