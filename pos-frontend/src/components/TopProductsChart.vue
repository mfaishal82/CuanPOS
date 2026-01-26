<template>
  <div class="max-h-[500px] overflow-auto rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
    <div class="sticky top-0 z-10 bg-surface-light dark:bg-surface-dark p-6 border-b border-slate-200 dark:border-slate-800">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white">Produk Terlaris</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Top 10 produk berdasarkan penjualan</p>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-8">
      <div class="text-center">
        <div class="animate-spin text-2xl mb-2">⏳</div>
        <p class="text-slate-500 dark:text-slate-400 text-sm">Loading produk...</p>
      </div>
    </div>

    <div v-else-if="saleStore.topProducts.length === 0" class="flex items-center justify-center py-8">
      <p class="text-slate-500 dark:text-slate-400 text-sm">Belum ada data penjualan</p>
    </div>

    <div v-else class="flex flex-col gap-3 p-6 flex-1">
      <div
        v-for="(product, index) in saleStore.topProducts"
        :key="product.id"
        class="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
      >
        <div class="flex items-start gap-3">
          <!-- Ranking badge -->
          <div class="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
            <span class="text-sm font-bold text-primary">#{{ index + 1 }}</span>
          </div>

          <!-- Product image -->
          <img
            class="w-12 h-12 rounded-lg bg-cover bg-center bg-slate-100 flex-shrink-0"
            :src="product.image"
            :alt="product.name"
          />

          <!-- Product info -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-slate-900 dark:text-white truncate">
              {{ product.name }}
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              Rp {{ formatCurrency(product.price) }}
            </p>
          </div>

          <!-- Sales info -->
          <div class="text-right flex-shrink-0">
            <p class="text-sm font-bold text-slate-900 dark:text-white">{{ product.total_sold }}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">Terjual</p>
          </div>
        </div>

        <!-- Revenue bar -->
        <div class="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-slate-500 dark:text-slate-400">Pendapatan</span>
            <span class="text-xs font-semibold text-slate-900 dark:text-white">
              Rp {{ formatRevenue(product.total_revenue) }}
            </span>
          </div>
          <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
            <div
              class="bg-primary h-full rounded-full transition-all"
              :style="{ width: getProgressWidth(product.total_revenue) + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="sticky bottom-0 p-6 border-t border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark">
      <button
        @click="handleRefresh"
        :disabled="loading"
        class="w-full py-2 px-4 text-sm font-medium text-primary hover:text-primary-dark hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <span class="material-symbols-outlined text-[18px]">refresh</span>
        Refresh
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import useSaleStore from '@/stores/saleStore'

const saleStore = useSaleStore()
const loading = computed(() => saleStore.loading)

const formatCurrency = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(2).replace('.', ',') + 'jt'
  } else if (value >= 1000) {
    return (value / 1000).toFixed(0).replace('.', ',') + 'rb'
  }
  return value.toString()
}

const formatRevenue = (value) => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(2).replace('.', ',') + 'M'
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(2).replace('.', ',') + 'jt'
  } else if (value >= 1000) {
    return (value / 1000).toFixed(0).replace('.', ',') + 'rb'
  }
  return value.toString()
}

const getProgressWidth = (revenue) => {
  if (saleStore.topProducts.length === 0) return 0
  const maxRevenue = Math.max(...saleStore.topProducts.map(p => p.total_revenue))
  return (revenue / maxRevenue) * 100
}

const handleRefresh = async () => {
  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear()
  await saleStore.fetchTopProducts({ limit: 10, month, year })
}

onMounted(() => {
  handleRefresh()
})
</script>