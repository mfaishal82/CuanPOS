<script setup>
import useProductStore from '@/stores/productStore'
import useSaleStore from '@/stores/saleStore'
import useUserStore from '@/stores/userStore'
import { showToast } from '@/utils/toast'
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

// import { RouterLink } from 'vue-router'
// import TheWelcome from '../components/TheWelcome.vue'
const selectedDate = ref(new Date().toLocaleDateString('en-GB').split('/').reverse().join('-'))
const userStore = useUserStore()
const saleStore = useSaleStore()
const productStore = useProductStore()
const user = computed(() => userStore.user)
const stats = computed(() => saleStore.summary)
const loading = computed(() => saleStore.loading)
onMounted(async () => {
  saleStore.fetchSummary()

  // await saleStore.fetchSaleItem({
  //   order: 'sold_count',
  //   sort: 'DESC'
  // })
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
        <div
          class="lg:col-span-2 p-6 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
          >
            <div>
              <h3 class="text-lg font-bold text-slate-900 dark:text-white">Analitik Penjualan</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Ringkasan pendapatan bulan ini
              </p>
            </div>
            <div class="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                class="px-3 py-1 text-xs font-medium rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
              >
                Harian
              </button>
              <button
                class="px-3 py-1 text-xs font-medium rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Mingguan
              </button>
              <button
                class="px-3 py-1 text-xs font-medium rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Bulanan
              </button>
            </div>
          </div>
          <div class="relative h-64 w-full">
            <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 300">
              <defs>
                <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" style="stop-color: #13ec80; stop-opacity: 0.2"></stop>
                  <stop offset="100%" style="stop-color: #13ec80; stop-opacity: 0"></stop>
                </linearGradient>
              </defs>
              <line
                class="dark:stroke-slate-800"
                stroke="#e2e8f0"
                stroke-width="1"
                x1="0"
                x2="800"
                y1="0"
                y2="0"
              ></line>
              <line
                class="dark:stroke-slate-800"
                stroke="#e2e8f0"
                stroke-dasharray="4 4"
                stroke-width="1"
                x1="0"
                x2="800"
                y1="75"
                y2="75"
              ></line>
              <line
                class="dark:stroke-slate-800"
                stroke="#e2e8f0"
                stroke-dasharray="4 4"
                stroke-width="1"
                x1="0"
                x2="800"
                y1="150"
                y2="150"
              ></line>
              <line
                class="dark:stroke-slate-800"
                stroke="#e2e8f0"
                stroke-dasharray="4 4"
                stroke-width="1"
                x1="0"
                x2="800"
                y1="225"
                y2="225"
              ></line>
              <line
                class="dark:stroke-slate-800"
                stroke="#e2e8f0"
                stroke-width="1"
                x1="0"
                x2="800"
                y1="300"
                y2="300"
              ></line>
              <path
                d="M0,250 C50,250 50,150 100,150 C150,150 150,200 200,200 C250,200 250,100 300,100 C350,100 350,50 400,50 C450,50 450,120 500,120 C550,120 550,80 600,80 C650,80 650,180 700,180 C750,180 750,100 800,100 V300 H0 Z"
                fill="url(#gradient)"
              ></path>
              <path
                d="M0,250 C50,250 50,150 100,150 C150,150 150,200 200,200 C250,200 250,100 300,100 C350,100 350,50 400,50 C450,50 450,120 500,120 C550,120 550,80 600,80 C650,80 650,180 700,180 C750,180 750,100 800,100"
                fill="none"
                stroke="#13ec80"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
              ></path>
              <circle
                class="dark:stroke-slate-900"
                cx="400"
                cy="50"
                fill="#13ec80"
                r="6"
                stroke="white"
                stroke-width="2"
              ></circle>
            </svg>
            <div
              class="absolute top-[30px] left-[48%] transform -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded shadow-lg pointer-events-none"
            >
              Rp 12.500.000
            </div>
          </div>
          <div class="flex justify-between mt-4 text-xs text-slate-400 font-medium">
            <span>1 Okt</span>
            <span>5 Okt</span>
            <span>10 Okt</span>
            <span>15 Okt</span>
            <span>20 Okt</span>
            <span>25 Okt</span>
            <span>30 Okt</span>
          </div>
        </div>
        <!-- produk terlalris -->
        <div
          class="lg:col-span-1 p-6 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col"
        >
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Produk Terlaris</h3>
          <div class="flex flex-col gap-1 flex-1">
            <div v-for="item in productStore.product.slice(0, 4)" :key="item.id" class="lg:col-span-1 p-3 rounded-xl bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <div class="flex items-center gap-3">
                <img
                  class="size-12 rounded-lg bg-cover bg-center bg-slate-100 flex-shrink-0"
                  data-alt="Cup of coffee latte"
                  :src="item.image"
                />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {{ item.name }}
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400"> {{ item.Category.name }} </p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-bold text-slate-900 dark:text-white">{{ item.sold_count }}</p>
                  <p class="text-xs text-slate-500">Terjual</p>
                </div>
              </div>
            </div>
          </div>
          <button
            class="w-full mt-4 py-2 text-sm font-medium text-primary hover:text-primary-dark hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Lihat Semua Produk
          </button>
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
          <button class="text-sm text-primary font-medium hover:underline">Lihat Semua</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr
                class="bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold"
              >
                <th class="px-6 py-4">ID Order</th>
                <th class="px-6 py-4">Pelanggan</th>
                <th class="px-6 py-4">Produk</th>
                <th class="px-6 py-4">Total</th>
                <th class="px-6 py-4">Status</th>
                <th class="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td class="px-6 py-4 font-medium text-slate-900 dark:text-white">#TRX-001</td>
                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">Andi Saputra</td>
                <td class="px-6 py-4 text-slate-600 dark:text-slate-300">2 Items</td>
                <td class="px-6 py-4 font-medium text-slate-900 dark:text-white">Rp 45.000</td>
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
              </tr>
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
