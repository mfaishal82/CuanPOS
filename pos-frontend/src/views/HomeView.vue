<script setup>
import useProductStore from '@/stores/productStore'
import useSaleStore from '@/stores/saleStore'
import useUserStore from '@/stores/userStore'
import { showToast } from '@/utils/toast'
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import SalesChart from '@/components/SalesChart.vue'
import TopProductsChart from '@/components/TopProductsChart.vue'

// import { RouterLink } from 'vue-router'
// import TheWelcome from '../components/TheWelcome.vue'
const sales = ref([])
const seeAll = ref(false)
const seeTopProduct = ref(false)
const selectedDate = ref(new Date().toLocaleDateString('en-GB').split('/').reverse().join('-'))
const userStore = useUserStore()
const saleStore = useSaleStore()
const productStore = useProductStore()
const user = computed(() => userStore.user)
const stats = computed(() => saleStore.summary)
const loading = computed(() => saleStore.loading)
onMounted(async () => {
  await saleStore.fetchSummary()
  await saleStore.fetchSaleItem({
    order: 'createdAt',
    sort: 'DESC'
  })
  await saleStore.fetchTopProducts()
  sales.value = saleStore.saleItem
  console.log(sales.value)
  await handleFetchProduct()
  // console.log(saleStore.saleItem)
})

watch(selectedDate, (value)=> {
  saleStore.fetchSummary(value ? { date: value } : {})
})

const handleFetchProduct = async () => {
  try {
    const response = await productStore.fetchProduct({
      search: 'all',
      page: 1,
      limit: 10,
      category: 'all',
      sort: 'DESC',
      order: 'sold_count',
      barcode: 'all',
      sku: 'all'
    })
  } catch (error) {
    showToast(error, 'error')
  }
}

const handleSeeAll = () => {
  seeAll.value = !seeAll.value
}

</script>

<template>
  <main class="flex-1 overflow-y-auto p-4 md:p-8">
    <div class="max-w-7xl mx-auto flex flex-col gap-8">
      <!-- Bagian atas -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Halo, {{ user.name }} 👋
          </h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1">
            Berikut adalah ringkasan performa bisnismu hari ini.
          </p>
        </div>
        <div class="flex gap-2">
          <button
            class="flex items-center gap-2 px-4 py-2 bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <input type="date"
              v-model="selectedDate"
              class="bg-transparent outline-none"/>
            <!-- <span class="material-symbols-outlined text-[18px]">calendar_today</span>
            {{ new Date().toDateString() }} -->
          </button>
          <RouterLink to="/sales"
            class="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-slate-900 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-primary/20"
          >
            <span class="material-symbols-outlined text-[20px]">add</span>
            Transaksi Baru
          </RouterLink>
        </div>
      </div>

      <!-- Bagian 4 kotak laporan transaksi -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          class="p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-start mb-4">
            <div
              class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400"
            >
              <span class="material-symbols-outlined">payments</span>
            </div>
            <span
              class="flex items-center text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full"
            >
              +12.5%
              <span class="material-symbols-outlined text-[14px] ml-0.5">arrow_upward</span>
            </span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Pendapatan</p>
          <h3 v-if="!loading" class="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Rp {{ stats?.all.total_revenue?.toLocaleString('id-ID') || 0 }}
          </h3>
          <div v-else class="animate-pulse h-6 bg-slate-200 rounded"></div>
        </div>
        <div
          class="p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-start mb-4">
            <div
              class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400"
            >
              <span class="material-symbols-outlined">point_of_sale</span>
            </div>
            <span
              class="flex items-center text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full"
            >
              +5.2%
              <span class="material-symbols-outlined text-[14px] ml-0.5">arrow_upward</span>
            </span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Penjualan Harian</p>
          <h3 v-if="!loading" class="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Rp {{ stats?.filtered.total_revenue.toLocaleString('id-ID') || 0 }}
          </h3>
          <div v-else class="animate-pulse h-6 bg-slate-200 rounded"></div>
        </div>
        <div
          class="p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-start mb-4">
            <div
              class="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400"
            >
              <span class="material-symbols-outlined">receipt</span>
            </div>
            <span
              class="flex items-center text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full"
            >
              +8.1%
              <span class="material-symbols-outlined text-[14px] ml-0.5">arrow_upward</span>
            </span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Transaksi</p>
          <h3 v-if="!loading" class="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {{ stats?.all.total_transactions || 0 }}
          </h3>
          <div v-else class="animate-pulse h-6 bg-slate-200 rounded"></div>
        </div>
        <div
          class="p-5 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-start mb-4">
            <div
              class="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400"
            >
              <span class="material-symbols-outlined">inventory</span>
            </div>
            <span
              class="flex items-center text-xs font-medium text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full"
            >
              -2.4%
              <span class="material-symbols-outlined text-[14px] ml-0.5">arrow_downward</span>
            </span>
          </div>
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">Produk Terjual</p>
          <h3 v-if="!loading" class="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {{ stats?.all.total_products_sold || 0 }}
          </h3>
          <div v-else class="animate-pulse h-6 bg-slate-200 rounded"></div>
        </div>
      </div>

      <!-- Bagian analitik dan Produk terlaris -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- analitik -->
        <div class="lg:col-span-2">
          <SalesChart />
        </div>
        <!-- produk terlaris -->
        <div class="lg:col-span-1">
          <TopProductsChart />
        </div>
      </div>

      <!-- Table transaksi terakhir -->
      <div
        class="w-full bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div
          class="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center"
        >
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">Transaksi Terakhir</h3>
          <button @click="handleSeeAll" type="button" class="text-sm text-primary cursor-pointer font-medium hover:underline">{{ seeAll ? 'Sembunyikan' : 'Lihat Semua' }}</button>
        </div>
        <div class="overflow-x-auto max-h-[597px] overflow-y-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr
                class="sticky top-0 z-10 bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold"
              >
                <th class="px-6 py-4">ID Order</th>
                <!-- <th class="px-6 py-4">Kasir</th> -->
                <th class="px-6 py-4">Produk</th>
                <th class="px-6 py-4">Total</th>
                <!-- <th class="px-6 py-4">Status</th> -->
                <th class="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody v-for="item in seeAll ? sales : sales.slice(0, 4)" :key="item.id" class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td class="px-6 py-4 font-medium text-slate-900 dark:text-white">#{{ item.Sale.invoice_number }}</td>
                <!-- <td class="px-6 py-4 text-slate-600 dark:text-slate-300">Andi Saputra</td> -->
                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">{{ item.quantity }} Items</td>
                <td class="px-6 py-4 font-medium text-slate-900 dark:text-white">Rp {{item.Sale.total.toLocaleString('id-ID')}}</td>
                <!-- <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  >
                    Sukses
                  </span>
                </td> -->
                <td class="px-6 py-4 text-right">
                  <button type="button" class="text-slate-400 cursor-pointer hover:text-primary transition-colors">
                    <span class="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </td>
              </tr>
              <!-- <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td class="px-6 py-4 font-medium text-slate-900 dark:text-white">#TRX-002</td>
                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">Siti Aminah</td>
                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">1 Item</td>
                <td class="px-6 py-4 font-medium text-slate-900 dark:text-white">Rp 22.000</td>
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  >
                    Sukses
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="text-slate-400 hover:text-primary transition-colors">
                    <span class="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </td>
              </tr>
              <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td class="px-6 py-4 font-medium text-slate-900 dark:text-white">#TRX-003</td>
                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">Budi Gunawan</td>
                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">4 Items</td>
                <td class="px-6 py-4 font-medium text-slate-900 dark:text-white">Rp 120.000</td>
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  >
                    Pending
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="text-slate-400 hover:text-primary transition-colors">
                    <span class="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </td>
              </tr> -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
  .material-symbols-outlined {
    font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24;
  }
  .material-symbols-outlined.filled {
    font-variation-settings:
      'FILL' 1,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
  .dark ::-webkit-scrollbar-thumb {
    background: #475569;
  }
</style>
