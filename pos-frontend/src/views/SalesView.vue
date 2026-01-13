<script setup>
import useProductStore from '@/stores/productStore';
import { computed, onMounted, ref } from 'vue';

const searcQuery = ref('')
const currentPage = ref(1)
const limitItem = ref(20)
const selectedCategory = ref('')
const orderBy = ref('updatedAt')
const sortBy = ref('DESC')
const showCart = ref(false)
const productCart = ref([])
const productStore = useProductStore()

onMounted(async() => {
  await productStore.fetchCategory({
    search: '',
  })
  await handleFetch()
  // console.log(productStore.product)
  // console.log(productStore.category)
})

const handleFetch = async () => {
  await productStore.fetchProduct({
    search: searcQuery.value,
    page: currentPage.value,
    limit: limitItem.value,
    category: selectedCategory.value,
    sort: sortBy.value,
    order: orderBy.value,
  })
}

const handleChangeCategory = async (categoryName) => {
  selectedCategory.value = categoryName
  currentPage.value = 1
  await handleFetch()
}

const handleShowCart = () => {
  showCart.value = !showCart.value
}

const handleInputCart = (input) => {
  const cartInput = {
    id: input.id,
    name: input.name,
    price: input.price,
    quantity: 1,
  }
  productCart.value.push(cartInput)
}
</script>

<template>
  <div class="flex flex-1 overflow-hidden">
    <main
      class="flex-1 flex flex-col bg-background-light dark:bg-background-dark overflow-hidden relative"
    >
      <div
        class="px-6 py-4 overflow-x-auto shrink-0 bg-background-light dark:bg-background-dark z-10 sticky top-0"
      >
        <div
          class="flex gap-3 min-w-max pb-2">
          <!-- Menu list kategori -->
          <button
            @click="handleChangeCategory('')"
            class="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-xl bg-primary text-secondary font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <span class="material-symbols-outlined text-[20px]">restaurant_menu</span>
            Semua
          </button>
          <button
            v-for="cat in productStore.category"
            :key="cat.id"
            @click="handleChangeCategory(cat.name)"
            class="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-xl bg-surface-light dark:bg-surface-dark text-secondary dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto px-6 pb-6 scroll-smooth">
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          <!-- List product dengan harga -->
          <div
            v-for="item in productStore.product" :key="item.id"
            :class="showCart ? 'text-sm' : 'text-lg'"
            class="group bg-surface-light dark:bg-surface-dark rounded-2xl p-3 shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-primary cursor-default flex flex-col h-full"
          >
            <div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-100">
              <img
                :src="item.image"
                class="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                :alt="item.name"
              />
              <div
                class="absolute top-2 right-2 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-bold text-secondary dark:text-white shadow-sm"
              >
                {{ item.stock }} Left
              </div>
            </div>
            <h3 class="font-bold text-secondary dark:text-white leading-tight mb-1 text-base truncate">
              {{ item.name }}
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">{{ item.Category.name }}</p>
            <div class="mt-auto flex items-center justify-between">
              <span class="font-bold text-primary">Rp {{ item.price.toLocaleString('id-ID') }}</span>
              <button
                @click="handleShowCart"
                class="w-8 h-8 cursor-pointer rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-primary text-secondary group-hover:text-secondary flex items-center justify-center transition-colors"
              >
                <span class="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- Side bar Cart -->
    <aside
          v-show="showCart"
          class="w-[420px] overflow-scroll bg-surface-light dark:bg-surface-dark border-l border-border-light dark:border-border-dark flex flex-col z-30 shadow-xl shrink-0"
        >
          <div
            class="p-5 border-b border-border-light dark:border-border-dark flex justify-between items-start"
          >
            <div>
              <h2 class="text-lg font-bold text-secondary dark:text-white">Current Order</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                #ORD-2023-001 • <span class="text-primary font-medium">Dine In</span>
              </p>
            </div>
            <button @click="handleShowCart" class="cursor-pointer text-gray-400 hover:text-red-500 transition-colors p-1" title="Clear All">
              <span class="material-symbols-outlined">delete_sweep</span>
            </button>
          </div>
          <div class="flex-1 p-4 space-y-3">
            <div
              class="flex items-center gap-3 bg-background-light dark:bg-background-dark p-2 rounded-xl group animate-fade-in-up"
            >
              <div
                class="w-14 h-14 rounded-lg bg-cover bg-center shrink-0"
                data-alt="Small thumbnail of coffee"
                style="
                  background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpmo0oYFajPRkPBJzf5X5dnYXIG-BTpwfAwvKtA0v5EI7_Wi-YpJ0LE-GP_QP2p4IUeAaHbMgFQU3sYyGBNYv4FOgJxtc_bZWUNphphADt2KXsb2FRMVvlcj7S4Wm3JFQZ7cgKMsvGRhyvmjz8DrIl7lKuP7iEOMNv3xs0IOtum5P-tG0xahOsOIylN8iiWmTVWUSCWDhAIZS9vZwI5i26v0FAyn2vDNumU7PRCVMiVfuJ1S7u1u8jbxAucDjW1-ZhigpmJlDLXiIz');
                "
              ></div>
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-secondary dark:text-white truncate">
                  Kopi Susu Gula Aren
                </h4>
                <div class="text-sm text-primary font-medium">Rp 18.000</div>
              </div>
              <div
                class="flex items-center gap-2 bg-white dark:bg-surface-dark rounded-lg p-1 border border-border-light dark:border-border-dark shadow-sm"
              >
                <button
                  class="w-6 h-6 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors text-xs"
                >
                  <span class="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <span class="w-4 text-center text-sm font-semibold">2</span>
                <button
                  class="w-6 h-6 flex items-center justify-center rounded bg-primary text-secondary hover:bg-primary-dark transition-colors text-xs"
                >
                  <span class="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>
            <div
              class="flex items-center gap-3 bg-background-light dark:bg-background-dark p-2 rounded-xl group animate-fade-in-up"
              style="animation-delay: 50ms"
            >
              <div
                class="w-14 h-14 rounded-lg bg-cover bg-center shrink-0"
                data-alt="Small thumbnail of toast"
                style="
                  background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6vxevxtDqLirl7_TAADTQeju8wSXZVnYsu_a1FRDh4sMyQvBmbiia-V7wEskKhbXHVtNAmbVmHr7Qb4AmJdX3JruItOOn91j1H9iDLTo9ISPFjLWbz0CGsXLJxyNNpfoYFpH9tTNylKFSijQJc7yPdGTjyaMFLStTdOadlRJuPZv_GH4CBE0UxCMBectVaYEbegQ6G0REAAEqLaWZvb5DoQFzfGcJHSCXgxG0E4K6_5zTO5No5dVFDv3Eae6juSU-c1K6yNXV49f9');
                "
              ></div>
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-secondary dark:text-white truncate">Roti Bakar Coklat</h4>
                <div class="text-sm text-primary font-medium">Rp 15.000</div>
              </div>
              <div
                class="flex items-center gap-2 bg-white dark:bg-surface-dark rounded-lg p-1 border border-border-light dark:border-border-dark shadow-sm"
              >
                <button
                  class="w-6 h-6 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors text-xs"
                >
                  <span class="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <span class="w-4 text-center text-sm font-semibold">1</span>
                <button
                  class="w-6 h-6 flex items-center justify-center rounded bg-primary text-secondary hover:bg-primary-dark transition-colors text-xs"
                >
                  <span class="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>
            <div
              class="flex items-center gap-3 bg-background-light dark:bg-background-dark p-2 rounded-xl group animate-fade-in-up"
              style="animation-delay: 100ms"
            >
              <div
                class="w-14 h-14 rounded-lg bg-cover bg-center shrink-0"
                data-alt="Small thumbnail of water bottle"
                style="
                  background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpAx_6wWAISfeQp9rkiBPMPW2PmNyQzfsa7_4-aGlVSRnOtrhtZSFEE8rlGLK0m3X1eCPK6yFaICJgMaCKKdrp6QqZJYEwY9ycZn0VEF8tPaIkeG7db0T-Z2ARxjJI1qs5mD4Jwe_i2NBkELzlcK057zzHpvRluyuihrUXRcT4wiK-3A3D2qk4JXcfiEFFk_iduVWXyUExcpfFVRWHS9Tld5hfMmZF-W1OLbxFWT_l3K-mJS_LmfpxmFP44_qEv17jNAQmkoDH0hdU');
                "
              ></div>
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-secondary dark:text-white truncate">
                  Mineral Water 600ml
                </h4>
                <div class="text-sm text-primary font-medium">Rp 5.000</div>
              </div>
              <div
                class="flex items-center gap-2 bg-white dark:bg-surface-dark rounded-lg p-1 border border-border-light dark:border-border-dark shadow-sm"
              >
                <button
                  class="w-6 h-6 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors text-xs"
                >
                  <span class="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <span class="w-4 text-center text-sm font-semibold">1</span>
                <button
                  class="w-6 h-6 flex items-center justify-center rounded bg-primary text-secondary hover:bg-primary-dark transition-colors text-xs"
                >
                  <span class="material-symbols-outlined text-[16px]">add</span>
                </button>
              </div>
            </div>
          </div>
          <div
            class="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark p-5 space-y-4 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]"
          >
            <div class="space-y-2 text-sm">
              <div class="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Subtotal</span>
                <span class="font-medium text-secondary dark:text-white">Rp 56.000</span>
              </div>
              <div class="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Tax (11%)</span>
                <span class="font-medium text-secondary dark:text-white">Included</span>
              </div>
              <div class="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Discount</span>
                <span class="font-medium text-green-500">-Rp 0</span>
              </div>
              <div
                class="border-t border-dashed border-gray-300 dark:border-gray-700 my-2 pt-2 flex justify-between items-end"
              >
                <span class="text-base font-bold text-secondary dark:text-white">Total Payable</span>
                <span class="text-2xl font-black text-secondary dark:text-white">Rp 56.000</span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-2">
              <button
                class="flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border-2 border-primary bg-primary/10 text-primary font-bold text-sm transition-all shadow-sm"
              >
                <span class="material-symbols-outlined mb-1">payments</span>
                Cash
              </button>
              <button
                class="flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-500 dark:text-gray-400 font-medium text-sm hover:border-primary hover:text-primary transition-all"
              >
                <span class="material-symbols-outlined mb-1">qr_code_scanner</span>
                QRIS
              </button>
              <button
                class="flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-500 dark:text-gray-400 font-medium text-sm hover:border-primary hover:text-primary transition-all"
              >
                <span class="material-symbols-outlined mb-1">credit_card</span>
                Card
              </button>
            </div>
            <div class="relative">
              <label class="text-xs font-semibold text-gray-500 uppercase mb-1 block"
                >Cash Amount Received</label
              >
              <div
                class="flex items-center bg-background-light dark:bg-background-dark rounded-lg border border-gray-200 dark:border-gray-700 px-3 h-12 focus-within:ring-2 ring-primary transition-all"
              >
                <span class="text-gray-500 font-semibold mr-2">Rp</span>
                <input
                  class="w-full bg-transparent border-none text-lg font-bold p-0 focus:ring-0 text-secondary dark:text-white placeholder:text-gray-300"
                  placeholder="0"
                  type="number"
                  value="60000"
                />
              </div>
              <div class="flex gap-2 mt-2 overflow-x-auto pb-1">
                <button
                  class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-primary/20 hover:text-primary whitespace-nowrap"
                >
                  Exact
                </button>
                <button
                  class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-primary/20 hover:text-primary whitespace-nowrap"
                >
                  60.000
                </button>
                <button
                  class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-primary/20 hover:text-primary whitespace-nowrap"
                >
                  100.000
                </button>
              </div>
            </div>
            <div
              class="flex justify-between items-center bg-green-50 dark:bg-green-900/20 p-2 rounded-lg border border-green-100 dark:border-green-800/30"
            >
              <span class="text-sm text-green-700 dark:text-green-400 font-medium">Change Due:</span>
              <span class="text-lg font-bold text-green-700 dark:text-green-400">Rp 4.000</span>
            </div>
            <button
              class="cursor-pointer w-full bg-primary hover:bg-primary-dark text-secondary font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-green-200 dark:shadow-none hover:shadow-green-300 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span class="material-symbols-outlined">check_circle</span>
              Complete Payment
            </button>
          </div>
        </aside>
    <div class="relative">
      <div class="absolute bottom-10 right-10 flex items-center justify-center rounded-full shadow-lg w-14 h-14 bg-green-500 hover:bg-green-600 cursor-pointer transition-all duration-200">
        <span class="material-symbols-outlined text-[20px] hover:text-white duration-200">camera</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
