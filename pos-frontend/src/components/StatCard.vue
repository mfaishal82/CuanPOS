<script setup>
import ICountUp from 'vue-countup-v2'
import { computed } from 'vue'

const props = defineProps({
  icon: String,
  title: String,
  value: {
    type: Number,
    default: 0
  },
  prefix: {
    type: String,
    default: ''
  },
  trend: {
    type: String,
    default: '+12.5%'
  },
  loading: {
    type: Boolean,
    default: false
  },
  animateValue: {
    type: Boolean,
    default: true
  }
})

const formattedValue = computed(() => {
  return props.value?.toLocaleString('id-ID') || 0
})
</script>

<template>
  <div class="p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
    <div class="flex justify-between items-start mb-4">
      <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
        <span class="material-symbols-outlined">{{ icon }}</span>
      </div>
      <span class="flex items-center text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
        {{ trend }}
        <span class="material-symbols-outlined text-[14px] ml-0.5">arrow_upward</span>
      </span>
    </div>
    <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">{{ title }}</p>
    <h3 v-if="!loading" class="text-2xl font-bold text-slate-900 dark:text-white mt-1">
      {{ prefix }}
      <ICountUp
        v-if="animateValue"
        :delay="1000"
        :endVal="value"
        :options="{ useGrouping: true, separator: '.', decimal: ',' }"
      />
      <span v-else>{{ formattedValue }}</span>
    </h3>
    <div v-else class="animate-pulse h-6 bg-slate-200 rounded"></div>
  </div>
</template>
