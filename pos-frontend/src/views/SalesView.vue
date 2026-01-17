<script setup>
import LoadingScreen from '@/components/LoadingScreen.vue';
import useProductStore from '@/stores/productStore';
import useSaleStore from '@/stores/saleStore';
import { computed, onMounted, ref } from 'vue';
import { Html5Qrcode } from 'html5-qrcode'
import { showToast } from '@/utils/toast';

const loading = ref(false)
const searcQuery = ref('')
const currentPage = ref(1)
const limitItem = ref(20)
const selectedCategory = ref('')
const orderBy = ref('updatedAt')
const sortBy = ref('DESC')
const barcode = ref('all')
const payment_method = ref('cash')
const payment_amount = ref(0)
const change_amount = ref(0)
const showCart = ref(false)
const showScanner = ref(false)
// const cartQuantity = ref(0)
const productCart = ref([])
const productStore = useProductStore()
const saleStore = useSaleStore()

let html5QrCode = null
let lastScannedBarcode = ''
let scanTimeout = null

// console.log(barcode.value)

const cartSubtotal = computed(() => {
  let total = 0

  for (let i = 0; i < productCart.value.length; i++) {
    const item = productCart.value[i]
    total += item.price * item.quantity
  }

  return total
})

const cartQuantity = computed(() => {
  let total = 0
  for (const item of productCart.value) {
    total += item.quantity
  }
  return total
})

const cartChangeAmount = computed(() => {
  const change = payment_amount.value - cartSubtotal.value
  // cartChangeAmount.value = change
  return change >= 0 ? change : 0
})

onMounted(async () => {
  loading.value = true
  await productStore.fetchCategory({
    search: '',
  })
  await handleFetch()
  // await useSaleStore().createSale()
  // console.log(productStore.product)
  // console.log(productStore.category)
  loading.value = false
})

const handleFetch = async () => {
  await productStore.fetchProduct({
    search: searcQuery.value,
    page: currentPage.value,
    limit: limitItem.value,
    category: selectedCategory.value,
    sort: sortBy.value,
    order: orderBy.value,
    sku: 'all',
    barcode: barcode.value
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

const handleShowScanner = () => {
  // showScanner.value = !showScanner.value
  showScanner.value ? stopScan() : startScan()
}

const handleInputCart = (product) => {
  // cartQuantity.value++
  const existing = productCart.value.find(
    (item) => item.product_id === product.id
  )
  if (existing) {
    existing.quantity += 1
    // cartQuantity.value = existing.quantity
    existing.subtotal = existing.quantity * existing.price
  } else {
    productCart.value.push({
      product_id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
      subtotal: product.price
    })
  }

  // showCart.value = true
  console.log(cartQuantity.value)
}


function startScan() {
  if (showScanner.value) {
    stopScan()
    return
  }
  showScanner.value = true

  lastScannedBarcode = ''
  html5QrCode = new Html5Qrcode("qr-reader")

  html5QrCode.start(
    { facingMode: "environment" }, // kamera belakang (HP)
    {
      fps: 10,
      qrbox: { width: 500, height: 500 }
    },
    (decodedText) => {
      if (decodedText === lastScannedBarcode) {
        return
      }
      // hasil scan
      lastScannedBarcode = decodedText
      barcode.value = decodedText

      const product = productStore.product.find((item) => item.barcode === decodedText)
      if (product) {
        handleInputCart(product)
        showToast(`Produk "${product.name}" berhasil ditambahkan ke keranjang.`, 'success')

        if(scanTimeout) {
          clearTimeout(scanTimeout)
        }

        scanTimeout = setTimeout(() => {
          lastScannedBarcode = ''
        }, 3000)
      } else {
        // console.log('Produk dengan barcode tersebut tidak ditemukan.')
        showToast(`Produk dengan barcode "${decodedText}" tidak ditemukan.`, 'error')
      }
      // stopScan()
    },
    (errorMessage) => {
      // error scan (abaikan saja)
    }
  )
}

function stopScan() {
  if (html5QrCode) {
    html5QrCode.stop().then(() => {
      html5QrCode.clear()
    })
  }
  if(scanTimeout) {
    clearTimeout(scanTimeout)
  }
  lastScannedBarcode = ''
  showScanner.value = false
}
</script>

<template>
  <div class="flex flex-1 overflow-hidden">
    <main
      class="flex-1 flex flex-col bg-background-light dark:bg-background-dark overflow-hidden relative"
    >
      <div
        class="px-3 py-1 overflow-x-auto shrink-0 bg-background-light dark:bg-background-dark z-10 sticky top-0"
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
            v-for="cat in productStore.category.slice(0, 5)"
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
                @click="handleInputCart(item)"
                class="w-8 h-8 cursor-pointer rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-primary text-secondary group-hover:text-secondary flex items-center justify-center transition-colors"
              >
                <span class="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
          </div>
        </div>

        <LoadingScreen v-if="loading" ></LoadingScreen>
      </div>
    </main>
    <!-- Side bar Cart -->
    <aside
      v-show="showCart"
      class="max-w-[353px] max-md:min-w-full overflow-y-scroll bg-surface-light dark:bg-surface-dark border-l border-border-light dark:border-border-dark flex justifu-center flex-col z-30 shadow-xl shrink-0 transition-all duration-300">
      <div
        class="p-3 border-b border-border-light dark:border-border-dark flex justify-between items-start"
      >
        <div>
          <h2 class="text-lg font-bold text-secondary dark:text-white">Current Order</h2>
          <!-- <p class="text-sm text-gray-500 dark:text-gray-400">
            #ORD-2023-001 • <span class="text-primary font-medium">Dine In</span>
          </p> -->
        </div>
        <button @click="handleShowCart" class="cursor-pointer text-gray-400 hover:text-red-500 transition-colors p-1" title="Clear All">
          <span class="material-symbols-outlined">delete_sweep</span>
        </button>
      </div>
      <div class="p-2">
        <button @click="handleShowScanner" class="cursor-pointer flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 m-1 hover:text-gray-600 transition-all duration-200 ">
          <span class="material-symbols-outlined text-[14px]">scan</span>
          Klik untuk mulai scan >>
        </button>
        <div v-show="showScanner" class="relative w-full min-h-20 m-2 rounded-xl border border-spacing-5 border-green-500">
           <p class="absolute right-24 top-6.5 z-10 font-thin text-md bold text-green-500 cursor-default select-none">
            [ Scan barcode ]
          </p>
          <p @click="stopScan()" class="absolute right-2 top-2 cursor-pointer z-10 text-md bold text-red-500">
            <span class="material-symbols-outlined bold border rounded-lg text-[14px]">close</span>
          </p>
          <div id="qr-reader" class="w-full h-full"></div>
           <p>Barcode: {{ barcode }}</p>
        </div>
      </div>
      <div v-for="item in productCart" :key="item.id" :class="item.quantity === 0 ? 'hidden' : ''" class="flex-1 p-4 space-y-1">
        <div
          v-if="item.quantity > 0"
          class="flex items-center gap-2 bg-background-light dark:bg-background-dark p-2 rounded-xl group animate-fade-in-up"
        >
          <div
            class="w-14 h-14 rounded-lg bg-cover bg-center shrink-0"
            data-alt="Small thumbnail of coffee"
            :style="`background-image: url('${item.image}');`"
          ></div>
          <div class="flex-1 min-w-0">
            <h4 class="font-semibold text-secondary dark:text-white truncate">
              {{ item.name }}
            </h4>
            <div class="text-sm text-primary font-medium">Rp {{ item.price.toLocaleString('id-ID') }}</div>
          </div>
          <div
            class="flex items-center gap-2 bg-white dark:bg-surface-dark rounded-lg p-1 border border-border-light dark:border-border-dark shadow-sm"
          >
            <button
              @click="item.quantity--"
              :class="item.quantity === 0 ? 'hidden' : ''"
              class="cursor-pointer w-6 h-6 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors text-xs"
            >
              <span class="material-symbols-outlined text-[16px]">remove</span>
            </button>
            <span
              class="w-4 text-center text-sm font-semibold">{{ item.quantity }}</span>
            <button
              class="cursor-pointer w-6 h-6 flex items-center justify-center rounded bg-primary text-secondary hover:bg-primary-dark transition-colors text-xs"
            >
              <span @click="item.quantity++" class="material-symbols-outlined text-[16px]">add</span>
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
            <span class="font-medium text-secondary dark:text-white">Rp {{ cartSubtotal.toLocaleString('id-ID') }}</span>
          </div>
          <!-- <div class="flex justify-between text-gray-500 dark:text-gray-400">
            <span>Tax (11%)</span>
            <span class="font-medium text-secondary dark:text-white">Included</span>
          </div>
          <div class="flex justify-between text-gray-500 dark:text-gray-400">
            <span>Discount</span>
            <span class="font-medium text-green-500">-Rp 0</span>
          </div> -->
          <div
            class="border-t border-dashed border-gray-300 dark:border-gray-700 my-2 pt-2 flex justify-between items-end"
          >
            <span class="text-base font-bold text-secondary dark:text-white">Total Payable</span>
            <span class="text-2xl font-black text-secondary dark:text-white">Rp {{ cartSubtotal.toLocaleString('id-ID') }}</span>
          </div>
        </div>
        <!-- Payment method -->
        <div class="grid grid-cols-3 gap-2">
          <button
            @click="payment_method = 'cash'"
            :class="payment_method === 'cash' ? 'border-2 border-primary text-primary bg-white dark:bg-surface-dark' : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-500 dark:text-gray-400 hover:border-primary hover:text-primary'"
            class="flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border"
          >
            <span class="material-symbols-outlined mb-1">payments</span>
            Cash
          </button>
          <button
            @click="payment_method = 'QRIS'"
            :class="payment_method === 'QRIS' ? 'border-2 border-primary text-primary bg-white dark:bg-surface-dark' : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-500 dark:text-gray-400 hover:border-primary hover:text-primary'"
            class="flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border"
          >
            <span class="material-symbols-outlined mb-1">qr_code_scanner</span>
            QRIS
          </button>
          <button
            @click="payment_method = 'Transfer'"
            :class="payment_method === 'Transfer' ? 'border-2 border-primary text-primary bg-white dark:bg-surface-dark' : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-500 dark:text-gray-400 hover:border-primary hover:text-primary'"
            class="flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border"
          >
            <span class="material-symbols-outlined mb-1">send</span>
            Transfer
          </button>
        </div>

        <!-- Payment amount -->
        <div class="relative">
          <label class="text-xs font-semibold text-gray-500 uppercase mb-1 block"
            >Cash Amount Received</label
          >
          <div
            class="flex items-center bg-background-light dark:bg-background-dark rounded-lg border border-gray-200 dark:border-gray-700 px-3 h-12 focus-within:ring-2 ring-primary transition-all"
          >
            <span class="text-gray-500 font-semibold mr-2">Rp</span>
            <input
              v-model="payment_amount"
              class="w-full bg-transparent border-none text-lg font-bold p-0 focus:ring-0 text-secondary dark:text-white placeholder:text-gray-300"
              placeholder="0"
              type="number"
              value="0"
            />
          </div>
          <div class="flex gap-2 mt-2 overflow-x-auto pb-1">
            <button
              @click="payment_amount = cartSubtotal"
              class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-primary/20 hover:text-primary whitespace-nowrap"
            >
              Exact
            </button>
            <button
              @click="payment_amount = 50000"
              class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-primary/20 hover:text-primary whitespace-nowrap"
            >
              50.000
            </button>
            <button
              @click="payment_amount = 100000"
              class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-primary/20 hover:text-primary whitespace-nowrap"
            >
              100.000
            </button>
          </div>
        </div>

        <!-- Change amount -->
        <div
          class="flex justify-between items-center bg-green-50 dark:bg-green-900/20 p-2 rounded-lg border border-green-100 dark:border-green-800/30"
        >
          <span class="text-sm text-green-700 dark:text-green-400 font-medium">Change Due:</span>
          <span class="text-lg font-bold text-green-700 dark:text-green-400">Rp {{ cartChangeAmount }}</span>
        </div>

        <button
          class="cursor-pointer w-full bg-primary hover:bg-primary-dark text-secondary font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-green-200 dark:shadow-none hover:shadow-green-300 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span class="material-symbols-outlined">check_circle</span>
          Complete Payment
        </button>
      </div>
    </aside>
    <!-- Camera scan barcode button -->
    <div class="relative">
      <button @click="handleShowCart" class="absolute bottom-10 right-10 flex items-center justify-center rounded-full shadow-lg w-14 h-14 bg-green-500 hover:bg-green-600 cursor-pointer transition-all duration-200">
        <div v-show="cartQuantity" class="absolute -left-2 -top-2 rounded-full bg-red-600 h-6 w-6 text-white">
          {{ cartQuantity }}
        </div>
        <span v-if="cartQuantity" class="material-symbols-outlined text-[20px] hover:text-white duration-200">shopping_cart</span>
        <span v-else class="material-symbols-outlined text-[20px] hover:text-white duration-200">scan</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
