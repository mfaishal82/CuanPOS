<script setup>
import LoadingScreen from '@/components/LoadingScreen.vue';
import useProductStore from '@/stores/productStore';
import useSaleStore from '@/stores/saleStore';
import { computed, onMounted, ref } from 'vue';
import { Html5Qrcode } from 'html5-qrcode'
import { showToast } from '@/utils/toast';
import usePaymentStore from '@/stores/paymentStore';
import QrcodeVue from 'qrcode.vue';

const loading = ref(false)
// const product_id = ref('')
const searcQuery = ref('')
const currentPage = ref(1)
const limitItem = ref(20)
const selectedCategory = ref('')
const orderBy = ref('updatedAt')
const sortBy = ref('DESC')
const barcode = ref('all')
const payment_method = ref('Cash')
const payment_amount = ref(0)
// const change_amount = ref(0)
const showCart = ref(false)
const showScanner = ref(false)
const showQrisModal = ref(false)
const qrisPaymentData = ref(null)
// const cartQuantity = ref(0)
const productCart = ref([])
const productStore = useProductStore()
const saleStore = useSaleStore()
const paymentStore = usePaymentStore()

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
  // loading.value = true
  await productStore.fetchCategory({
    search: '',
  })
  await handleFetch()
  // await useSaleStore().createSale()
  // console.log(productStore.product)
  // console.log(productStore.category)
  // loading.value = false
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
  productCart.value && !showCart.value ? productCart.value = [] : ''
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

  // console.log(productCart.value)

  // showCart.value = true
  // console.log(cartQuantity.value)
}

const handleForm = async () => {
  const normalizedPaymentAmount = payment_method.value === 'QRIS'
    ? cartSubtotal.value
    : Number(payment_amount.value || 0)

  if(payment_method.value !== 'QRIS' && normalizedPaymentAmount < cartSubtotal.value) {
    showToast(`Jumlah pembayaran harus lebih dari >=  Rp ${cartSubtotal.value}`, 'error')
    return
  }

  loading.value = true

  try {
    const items = productCart.value.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity
    }))

    const paymentInfo = {
      payment_method: payment_method.value,
      payment_amount: normalizedPaymentAmount,
      change_amount: cartChangeAmount.value
    }
    const saleResult = await saleStore.createSale(items, paymentInfo)

    if(saleResult.success) {
      if (payment_method.value === 'QRIS') {
        const createdSaleId = saleResult.data?.sale_id || saleResult.data?.id || saleResult.data?.sale?.id || saleResult.data?.sale?.sale_id

        if (!createdSaleId) {
          showToast('Transaksi berhasil, tapi sale_id untuk QRIS tidak ditemukan.', 'error')
          return
        }

        const qrisResult = await paymentStore.createQRIS({
          sale_id: createdSaleId,
          payment_amount: normalizedPaymentAmount
        })

        if (!qrisResult.success || !qrisResult.data?.qris_code) {
          showToast(qrisResult.message || 'Gagal membuat QRIS.', 'error')
          return
        }

        qrisPaymentData.value = qrisResult.data
        showQrisModal.value = true
        showToast('QRIS berhasil dibuat. Silakan scan kode QR.', 'success')
      } else {
        showToast('Transaksi berhasil disimpan ✓', 'success')
      }

      productCart.value = []
      payment_method.value = 'Cash'
      payment_amount.value = 0
      barcode.value = 'all'
      showCart.value = false

      // console.log('Fetching latest sales...')
      await saleStore.fetchSaleItem({
        order: 'createdAt',
        sort: 'DESC'
      })
    }else {
      showToast(saleStore.errorMessage)
    }
  } catch (error) {
    console.log(error)
    showToast('Error completing sale', 'error')
  } finally {
    loading.value = false
  }
}

const closeQrisModal = () => {
  showQrisModal.value = false
  qrisPaymentData.value = null
}

const formatRupiah = (value) => {
  return Number(value || 0).toLocaleString('id-ID')
}

const formatQrisExpiredAt = (value) => {
  if (!value) return '-'
  return new Date(value).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
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
      // error scan (diabaikan)
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
            <div class="relative w-full aspect-4/3 rounded-xl overflow-hidden mb-3 bg-gray-100">
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

        <LoadingScreen v-if="saleStore.loading" ></LoadingScreen>
      </div>
    </main>
    <!-- Side bar Cart -->
    <aside
      v-show="showCart"
      class="max-w-88.25 max-md:min-w-full overflow-y-scroll bg-surface-light dark:bg-surface-dark border-l border-border-light dark:border-border-dark flex justifu-center flex-col z-30 shadow-xl shrink-0 transition-all duration-300">
      <form @submit.prevent="handleForm">
        <div
          class="p-3 border-b border-border-light dark:border-border-dark flex justify-between items-start"
        >
          <div>
            <h2 class="text-lg font-bold text-secondary dark:text-white">Orderan saat ini</h2>
            <!-- <p class="text-sm text-gray-500 dark:text-gray-400">
              #ORD-2023-001 • <span class="text-primary font-medium">Dine In</span>
            </p> -->
          </div>
          <button type="button" @click="handleShowCart" class="cursor-pointer text-gray-400 hover:text-red-500 transition-colors p-1" title="Hapus Keranjang">
            <span class="material-symbols-outlined">delete_sweep</span>
          </button>
        </div>
        <div class="p-2">
          <button type="button" @click="handleShowScanner" class="hover:text-primary cursor-pointer flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 m-1 transition-all duration-200 ">
            <span class="material-symbols-outlined text-[14px] text-primary">scan</span>
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
                type="button"
                @click="item.quantity--"
                :class="item.quantity === 0 ? 'hidden' : ''"
                class="cursor-pointer w-6 h-6 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors text-xs"
              >
                <span class="material-symbols-outlined text-[16px]">remove</span>
              </button>
              <span
                class="w-4 text-center text-sm font-semibold">{{ item.quantity }}</span>
              <button
                type="button"
                @click="item.quantity++"
                class="cursor-pointer w-6 h-6 flex items-center justify-center rounded bg-primary text-secondary hover:bg-primary-dark transition-colors text-xs"
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
            <!-- <div
              class="border-t border-dashed border-gray-300 dark:border-gray-700 my-2 pt-2 flex justify-between items-end"
            >
              <span class="text-base font-bold text-secondary dark:text-white">Total yang harus dibayar</span>
              <span class="text-xl font-black text-secondary dark:text-white">Rp {{ cartSubtotal.toLocaleString('id-ID') }}</span>
            </div> -->
          </div>
          <!-- Payment method -->
          <div class="grid grid-cols-2 gap-2">
            <button
              type="button"
              @click="payment_method = 'Cash'"
              :class="payment_method === 'Cash' ? 'border-2 border-primary text-primary bg-white dark:bg-surface-dark' : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-500 dark:text-gray-400 hover:border-primary hover:text-primary'"
              class="flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border"
            >
              <span class="material-symbols-outlined mb-1">payments</span>
              Cash
            </button>
            <button
              type="button"
              @click="payment_method = 'QRIS'"
              :class="payment_method === 'QRIS' ? 'border-2 border-primary text-primary bg-white dark:bg-surface-dark' : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-500 dark:text-gray-400 hover:border-primary hover:text-primary'"
              class="flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border"
            >
              <span class="material-symbols-outlined mb-1">qr_code_scanner</span>
              QRIS
            </button>
            <!-- <button
              type="button"
              @click="payment_method = 'Transfer'"
              :class="payment_method === 'Transfer' ? 'border-2 border-primary text-primary bg-white dark:bg-surface-dark' : 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-500 dark:text-gray-400 hover:border-primary hover:text-primary'"
              class="flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border"
            >
              <span class="material-symbols-outlined mb-1">send</span>
              Transfer
            </button> -->
          </div>

          <!-- Payment amount -->
          <div class="relative">
            <label class="text-xs font-semibold text-gray-500 uppercase mb-1 block truncate"
              >Jumlah uang yang diterima</label
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
                type="button"
                @click="payment_amount = cartSubtotal"
                class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-primary/20 hover:text-primary whitespace-nowrap"
              >
                Uang Pas
              </button>
              <button
                type="button"
                @click="payment_amount = 50000"
                class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-primary/20 hover:text-primary whitespace-nowrap"
              >
                50.000
              </button>
              <button
                type="button"
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
            <span class="text-sm text-green-700 dark:text-green-400 font-medium">Kembalian:</span>
            <span class="text-lg font-bold text-green-700 dark:text-green-400">Rp {{ cartChangeAmount }}</span>
          </div>

          <button
            type="submit"
            :disabled="loading ||productCart.length === 0"
            class="cursor-pointer w-full bg-primary hover:bg-primary-dark text-secondary font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-green-200 dark:shadow-none hover:shadow-green-300 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined">check_circle</span>
            {{ payment_method === 'QRIS' ? 'Proses Pembayaran' : 'Selesaikan Pembayaran' }}
          </button>
        </div>
        </form>
    </aside>
    <!-- Camera scan barcode button -->
    <div class="relative">
      <button type="button" @click="handleShowCart" :title="cartQuantity ? 'Keranjang' : 'Scan Barcode'" class="absolute bottom-10 right-10 flex items-center justify-center rounded-full shadow-lg w-14 h-14 bg-green-500 hover:bg-green-600 cursor-pointer transition-all duration-200">
        <div v-show="cartQuantity" class="absolute -left-2 -top-2 rounded-full bg-red-600 h-6 w-6 text-white">
          {{ cartQuantity }}
        </div>
        <span v-if="cartQuantity" class="material-symbols-outlined text-[20px] hover:text-white duration-200">shopping_cart</span>
        <span v-else class="material-symbols-outlined text-[20px] hover:text-white duration-200">scan</span>
      </button>
    </div>

    <div
      v-if="showQrisModal && qrisPaymentData"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4"
    >
      <div class="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-5 space-y-4">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="text-xl font-bold text-secondary dark:text-white">Pembayaran QRIS</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Silakan scan QR di bawah ini.</p>
          </div>
          <button type="button" @click="closeQrisModal" class="cursor-pointer text-gray-500 hover:text-red-500">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div class="bg-white rounded-xl p-4 flex justify-center">
          <QrcodeVue
            :value="qrisPaymentData.qris_code"
            :size="230"
            level="M"
            render-as="svg"
          />
        </div>

        <div class="text-sm space-y-1 text-secondary dark:text-gray-100">
          <div class="flex justify-between">
            <span>Total</span>
            <span class="font-semibold">Rp {{ formatRupiah(qrisPaymentData.total_payment) }}</span>
          </div>
          <div class="flex justify-between text-gray-500 dark:text-gray-400">
            <span>Biaya Admin</span>
            <span>Rp {{ formatRupiah(qrisPaymentData.fee) }}</span>
          </div>
          <div class="flex justify-between text-gray-500 dark:text-gray-400">
            <span>Berlaku Sampai</span>
            <span>{{ formatQrisExpiredAt(qrisPaymentData.expired_at) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
