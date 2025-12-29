<script setup>
import useProductStore from '@/stores/productStore'
import { onMounted, watch } from 'vue'

const productStore = useProductStore()

onMounted(async () => {
  // ✅ Bisa pakai await (optional)
  await productStore.fetchProduct()

  console.log('Data in component:', productStore.product)
})
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <main class="flex-1 flex flex-col h-full relative overflow-y-auto">
      <div class="flex-1 p-6 lg:p-10 max-w-[1400px] w-full mx-auto">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div class="flex flex-col gap-2">
            <h1
              class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight"
            >
              Daftar Produk
            </h1>
            <p class="text-slate-500 dark:text-slate-400">
              Kelola katalog, stok, dan harga produk toko Anda.
            </p>
          </div>
          <button
            class="flex items-center gap-2 bg-primary hover:bg-emerald-400 text-background-dark font-bold px-5 py-3 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            <span class="material-symbols-outlined text-[20px]">add</span>
            Tambah Produk
          </button>
        </div>
        <div
          class="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 p-4 mb-6 shadow-sm"
        >
          <div class="flex flex-col md:flex-row gap-4 justify-between">
            <div class="flex-1 max-w-lg relative group">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span
                  class="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors"
                  >search</span
                >
              </div>
              <input
                class="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-lg leading-5 bg-background-light dark:bg-background-dark text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all sm:text-sm"
                placeholder="Cari nama produk, SKU, atau kategori..."
                type="text"
              />
            </div>
            <div class="flex flex-wrap gap-3">
              <div class="relative">
                <select
                  class="appearance-none bg-background-light dark:bg-background-dark border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-3 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer text-sm font-medium"
                >
                  <option>Semua Kategori</option>
                  <option>Minuman</option>
                  <option>Makanan</option>
                  <option>Snack</option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500"
                >
                  <span class="material-symbols-outlined text-sm">expand_more</span>
                </div>
              </div>
              <div class="relative">
                <select
                  class="appearance-none bg-background-light dark:bg-background-dark border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-3 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer text-sm font-medium"
                >
                  <option>Urutkan: Terbaru</option>
                  <option>Harga: Rendah ke Tinggi</option>
                  <option>Harga: Tinggi ke Rendah</option>
                  <option>Stok: Sedikit</option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500"
                >
                  <span class="material-symbols-outlined text-sm">sort</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
        >
          <div class="overflow-x-auto">
            <!-- Table Product -->
            <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
              <thead class="bg-slate-50 dark:bg-[#152e22]">
                <tr>
                  <th
                    class="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                    scope="col"
                  >
                    Produk
                  </th>
                  <th
                    class="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                    scope="col"
                  >
                    Kategori
                  </th>
                  <th
                    class="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                    scope="col"
                  >
                    Harga Jual
                  </th>
                  <th
                    class="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                    scope="col"
                  >
                    Stok
                  </th>
                  <th
                    class="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                    scope="col"
                  >
                    Status
                  </th>
                  <th class="relative px-6 py-4" scope="col">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody
                class="bg-surface-light dark:bg-surface-dark divide-y divide-slate-200 dark:divide-slate-800"
              >
                <!-- Looping pake v-for -->
                <tr v-for="item in productStore.product" :key="item.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-12 w-12 flex-shrink-0">
                          <img
                            :alt="item.name"
                            class="h-12 w-12 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                            :src="item.image"
                          />
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-bold text-slate-900 dark:text-white">
                            {{ item.name }}
                          </div>
                          <div class="text-xs font-mono text-slate-500 dark:text-slate-400">
                            SKU: {{ item.sku }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {{ item.Category?.name || 'Uncategorized' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-semibold text-slate-900 dark:text-white">
                        Rp {{ item.price?.toLocaleString('id-ID') || 0 }}
                      </div>
                      <div class="text-xs text-slate-400 dark:text-slate-500">
                        HPP: Rp {{ item.cost_price?.toLocaleString('id-ID') || 0 }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-slate-900 dark:text-white font-medium">
                        {{ item.stock || 0 }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="[
                          'px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full',
                          item.stock > 0
                            ? 'bg-primary/10 text-emerald-700 dark:text-primary border border-primary/20'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200'
                        ]"
                      >
                        {{ item.stock > 0 ? 'Tersedia' : 'Habis' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="text-slate-400 hover:text-primary transition-colors p-1" title="Edit">
                          <span class="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button class="text-slate-400 hover:text-red-500 transition-colors p-1" title="Delete">
                          <span class="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
              </tbody>
            </table>
            <!-- End Product table -->
          </div>
          <div
            class="bg-surface-light dark:bg-surface-dark px-4 py-3 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 sm:px-6"
          >
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-slate-700 dark:text-slate-400">
                  Menampilkan <span class="font-medium">1</span> sampai
                  <span class="font-medium">4</span> dari <span class="font-medium">120</span> hasil
                </p>
              </div>
              <div>
                <nav
                  aria-label="Pagination"
                  class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                >
                  <a
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 dark:border-slate-700 bg-surface-light dark:bg-surface-dark text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                    href="#"
                  >
                    <span class="sr-only">Previous</span>
                    <span class="material-symbols-outlined text-[20px]">chevron_left</span>
                  </a>
                  <a
                    aria-current="page"
                    class="z-10 bg-primary/20 border-primary text-emerald-900 dark:text-primary relative inline-flex items-center px-4 py-2 border text-sm font-bold"
                    href="#"
                  >
                    1
                  </a>
                  <a
                    class="bg-surface-light dark:bg-surface-dark border-slate-300 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    href="#"
                  >
                    2
                  </a>
                  <a
                    class="bg-surface-light dark:bg-surface-dark border-slate-300 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                    href="#"
                  >
                    3
                  </a>
                  <span
                    class="relative inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-700 bg-surface-light dark:bg-surface-dark text-sm font-medium text-slate-700"
                  >
                    ...
                  </span>
                  <a
                    class="bg-surface-light dark:bg-surface-dark border-slate-300 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                    href="#"
                  >
                    10
                  </a>
                  <a
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 dark:border-slate-700 bg-surface-light dark:bg-surface-dark text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                    href="#"
                  >
                    <span class="sr-only">Next</span>
                    <span class="material-symbols-outlined text-[20px]">chevron_right</span>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
