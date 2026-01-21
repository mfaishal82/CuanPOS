<script setup>
import useProductStore from '@/stores/productStore'
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import Swal from 'sweetalert2'
import toastAsync from '@/utils/toast'
import { Html5Qrcode } from 'html5-qrcode'

const productName = ref('')
const categoryName = ref('')
const imageFile = ref(null)
const imagePreview = ref('')
const costPrice = ref(0)
const price = ref(0)
const stock = ref(0)
const barcode = ref('')
const loading = ref(false)
const fileInput = ref(null)
const selectedCategory = ref('')
const currentProduct = ref(null)
const openCam = ref(false)
const productStore = useProductStore()
const route = useRoute()
const router = useRouter()
let html5QrCode = null

const productId = route.params.id

onMounted(async () => {
  currentProduct.value = await productStore.getProductById(productId)
  // console.log('Fetched product:', currentProduct.value)

  await productStore.fetchCategory({
    search: '',
  })

  if (currentProduct.value) {
    productName.value = currentProduct.value.name
    price.value = currentProduct.value.price
    costPrice.value = currentProduct.value.cost_price
    stock.value = currentProduct.value.stock
    barcode.value = currentProduct.value.barcode
    selectedCategory.value = currentProduct.value.category_id || currentProduct.value.category?.id || ''
    imagePreview.value = currentProduct.value.image
  }
})

// console.log(selectedCategory.value)

async function handleForm() {
  loading.value = true

  // console.log(barcode.value)

  const success = await toastAsync (productStore.updateProduct({
    id: productId,
    name: productName.value,
    price: price.value,
    cost_price: costPrice.value,
    image: imageFile.value,
    stock: stock.value,
    barcode: barcode.value,
    category_id: selectedCategory.value,
  }), {
    pending: 'Menyimpan perubahan produk...',
    success: 'Produk berhasil diperbarui!',
    error: `${productStore.errorMessage}`,
  })

  if (success) {
    router.push('/product')
  } else {
    // console.log(productStore.errorMessage)
    toast(`${productStore.errorMessage}`, {
      type: 'error',
      dangerouslyHTMLString: true,
    })
  }

  loading.value = false
}

async function createNewCategory() {
  await productStore.addCategory({
    name: categoryName.value,
  })

  categoryName.value = ''

  await productStore.fetchCategory({
    search: '',
  })
}

function handleImageClick() {
  fileInput.value?.click()
}

function handleImageChange(event) {
  const file = event.target.files?.[0]
  // console.log(file)
  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    Swal.fire({
      title: 'Peringatan!',
      text: `Gambar tidak boleh lebih dari 2MB`,
      color: 'red',
      icon: 'error',
      confirmButtonText: 'Coba lagi',
      confirmButtonColor: 'red',
    })
  }

  imageFile.value = file

  //preview gambar

  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target?.result
  }
  reader.readAsDataURL(file)
}

function startScan() {
  openCam.value = !openCam.value
  html5QrCode = new Html5Qrcode("qr-reader")

  html5QrCode.start(
    { facingMode: "environment" }, // kamera belakang (HP)
    {
      fps: 30,
      qrbox: { width: 500, height: 500 }
    },
    (decodedText) => {
      // hasil scan
      barcode.value = decodedText

      stopScan()
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
  openCam.value = false
}
</script>

<template>
  <div class="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
    <div class="max-w-6xl mx-auto space-y-6">
      <form @submit.prevent="handleForm">
        <!-- Page Heading -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2
              class="text-2xl lg:text-3xl font-bold text-text-main dark:text-white tracking-tight"
            >
              Edit Produk
            </h2>
            <p class="text-text-secondary mt-1">
              Lengkapi formulir di bawah untuk memperbarui item ke inventaris.
            </p>
          </div>
          <div class="flex gap-3">
            <RouterLink
              to="/product"
              class="px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-transparent text-text-main dark:text-gray-300 font-medium text-sm hover:bg-gray-50 dark:hover:bg-border-dark transition-colors"
            >
              Batal
            </RouterLink>
            <button
              :disabled="loading"
              class="px-6 py-2 rounded-lg bg-primary text-text-main font-bold text-sm shadow-sm hover:bg-primary-hover transition-colors flex items-center gap-2"
            >
              <span class="material-symbols-outlined text-[18px]">save</span>
              {{ loading ? 'Sedang simpan produk...' : 'Simpan Produk' }}
            </button>
          </div>
        </div>
        <!-- Main Form Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left Column: Primary Info -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Basic Information Card -->
            <section
              class="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6"
            >
              <h3
                class="text-lg font-bold text-text-main dark:text-white mb-6 border-b border-border-light dark:border-border-dark pb-4"
              >
                Informasi Dasar
              </h3>
              <div class="space-y-5">
                <div>
                  <label
                    class="block text-sm font-medium text-text-main dark:text-gray-300 mb-2"
                    for="product_name"
                    >Nama Produk</label
                  >
                  <input
                    v-model="productName"
                    class="w-full rounded-lg bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark text-text-main dark:text-white placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary transition-all p-2.5 text-sm"
                    id="product_name"
                    placeholder="Contoh: Kopi Susu Gula Aren 500ml"
                    type="text"
                  />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div class="pt-4 border-t border-border-light dark:border-border-dark">
                    <label
                      class="block text-sm font-medium text-text-main dark:text-gray-300 mb-2"
                      for="stock"
                      >Stok Awal</label
                    >
                    <input
                      v-model="stock"
                      class="w-full rounded-lg bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark text-text-main dark:text-white placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary transition-all p-2.5 text-sm"
                      id="stock"
                      placeholder="0"
                      type="number"
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-text-main dark:text-gray-300"
                      >Lacak Stok</span
                    >
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input checked="" class="sr-only peer" type="checkbox" value="" />
                      <div
                        class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
                      ></div>
                    </label>
                  </div>
                  <div>
                    <label
                      class="block text-sm font-medium text-text-main dark:text-gray-300 mb-2"
                      for="barcode"
                      >Barcode (Opsional)</label
                    >
                    <div class="relative">
                      <input
                        v-model="barcode"
                        class="w-full rounded-lg bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark text-text-main dark:text-white placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary transition-all p-2.5 text-sm pr-10"
                        id="barcode"
                        placeholder="Scan barcode..."
                        type="text"
                      />
                      <span @click="startScan" class="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-text-secondary">
                        <span class="material-symbols-outlined text-lg">qr_code_scanner</span>
                      </span>
                    </div>
                  </div>
                  <!-- <div id="qr-reader" class="w-full max-w-sm"></div> -->
                </div>
              </div>
            </section>
            <!-- Pricing Card -->
            <section
              class="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6"
            >
              <h3
                class="text-lg font-bold text-text-main dark:text-white mb-6 border-b border-border-light dark:border-border-dark pb-4"
              >
                Harga &amp; Modal
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    class="block text-sm font-medium text-text-main dark:text-gray-300 mb-2"
                    for="cost_price"
                    >Harga Modal (HPP)</label
                  >
                  <div class="relative">
                    <span
                      class="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary font-medium text-sm"
                      >Rp</span
                    >
                    <input
                      v-model="costPrice"
                      class="w-full rounded-lg bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark text-text-main dark:text-white placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary transition-all p-2.5 pl-10 text-sm"
                      id="cost_price"
                      placeholder="0"
                      type="number"
                    />
                  </div>
                  <p class="text-xs text-text-secondary mt-1">Tidak ditampilkan ke pelanggan.</p>
                </div>
                <div>
                  <label
                    class="block text-sm font-medium text-text-main dark:text-gray-300 mb-2"
                    for="selling_price"
                    >Harga Jual</label
                  >
                  <div class="relative">
                    <span
                      class="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary font-medium text-sm"
                      >Rp</span
                    >
                    <input
                      v-model="price"
                      class="w-full rounded-lg bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark text-text-main dark:text-white placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary transition-all p-2.5 pl-10 text-sm"
                      id="selling_price"
                      placeholder="0"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <!-- Right Column: Media & Org -->
          <div class="space-y-6">
            <!-- Media Upload Card -->
            <!-- Media Upload Card -->
            <section
              class="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6"
            >
              <div v-show="openCam" class="mb-4">
                <div class="text-lg font-bold text-text-main dark:text-white mb-2"> Scan Barcode </div>
                <div id="qr-reader" class="w-full h-full"></div>
              </div>
              <h3 class="text-lg font-bold text-text-main dark:text-white mb-4">Gambar Produk</h3>
              <div
                @click="handleImageClick"
                class="relative w-full aspect-square bg-background-light dark:bg-background-dark rounded-xl border-2 border-dashed border-border-light dark:border-border-dark hover:border-primary transition-colors flex flex-col items-center justify-center p-6 text-center group cursor-pointer overflow-hidden"
              >
                <!-- Preview Gambar -->
                <img
                  v-if="imagePreview"
                  :src="imagePreview"
                  alt="Preview"
                  class="absolute inset-0 w-full h-full object-cover"
                />

                <!-- Upload Icon (tampil jika belum ada gambar) -->
                <div
                  v-if="!imagePreview"
                  class="size-16 rounded-full bg-border-light/50 dark:bg-border-dark/50 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors"
                >
                  <span
                    class="material-symbols-outlined text-text-secondary group-hover:text-primary text-3xl"
                    >cloud_upload</span
                  >
                </div>

                <!-- Text (tampil jika belum ada gambar) -->
                <div v-if="!imagePreview" class="relative z-10">
                  <p class="text-sm font-medium text-text-main dark:text-white mb-1">
                    Klik untuk upload
                  </p>
                  <p class="text-xs text-text-secondary">atau drag &amp; drop gambar disini</p>
                  <p class="text-[10px] text-text-secondary mt-4">JPG, PNG max 2MB</p>
                </div>

                <!-- Overlay saat ada gambar -->
                <div
                  v-if="imagePreview"
                  class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div class="text-center">
                    <span class="material-symbols-outlined text-white text-4xl mb-2 block"
                      >change_circle</span
                    >
                    <p class="text-white text-sm font-medium">Ganti Gambar</p>
                  </div>
                </div>
              </div>

              <!-- Hidden File Input -->
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleImageChange"
              />
            </section>

            <!-- Organization Card -->
            <section
              class="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6"
            >
              <h3
                class="text-lg font-bold text-text-main dark:text-white mb-6 border-b border-border-light dark:border-border-dark pb-4"
              >
                Pengelompokan
              </h3>
              <div class="space-y-5">
                <div>
                  <label
                    class="block text-sm font-medium text-text-main dark:text-gray-300 mb-2"
                    for="category"
                    >Kategori</label
                  >
                  <select
                    v-model="selectedCategory"
                    class="w-full cursor-pointer rounded-lg bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark text-text-main dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all p-2.5 text-sm"
                    id="category"
                  >
                    <option disabled="" selected="" value="">Pilih Kategori</option>
                    <option v-for="item in productStore.category" :key="item.id" :value="item.id">
                      {{ item.name }}
                    </option>
                  </select>
                  <div>
                    <div>
                      <label
                        class="block text-sm font-medium text-text-main dark:text-gray-300 mb-1 mt-1"
                        for="kategori"
                        >Atau buat kategori baru</label
                      >
                      <div class="relative">
                        <input
                          v-model="categoryName"
                          class="w-full rounded-lg bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark text-text-main dark:text-white placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary transition-all p-2.5 text-sm pr-10"
                          id="barcode"
                          placeholder="Buat kategori baru..."
                          type="text"
                        />
                        <span
                          class="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 text-text-secondary"
                        >
                          <button
                            type="button"
                            @click="createNewCategory"
                            class="material-symbols-outlined text-lg"
                          >
                            add
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div>
                    <label
                      class="block text-sm font-medium text-text-main dark:text-gray-300 mb-2"
                      for="brand"
                      >Merek / Brand</label
                    >
                    <select
                      class="w-full rounded-lg bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark text-text-main dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all p-2.5 text-sm"
                      id="brand"
                    >
                      <option disabled="" selected="" value="">Pilih Merek</option>
                      <option value="internal">Produksi Sendiri</option>
                      <option value="supplier_a">Supplier A</option>
                    </select>
                  </div> -->
                <!-- <div class="pt-4 border-t border-border-light dark:border-border-dark">
                    <label
                      class="block text-sm font-medium text-text-main dark:text-gray-300 mb-2"
                      for="stock"
                      >Stok Awal</label
                    >
                    <input
                      v-model="stock"
                      class="w-full rounded-lg bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark text-text-main dark:text-white placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary transition-all p-2.5 text-sm"
                      id="stock"
                      placeholder="0"
                      type="number"
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-text-main dark:text-gray-300"
                      >Lacak Stok</span
                    >
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input checked="" class="sr-only peer" type="checkbox" value="" />
                      <div
                        class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
                      ></div>
                    </label>
                  </div> -->
              </div>
            </section>
          </div>
        </div>
        <!-- Additional Action Area (Mobile Friendly) -->
        <div class="block lg:hidden pt-6 pb-20">
          <button
            class="w-full py-3 rounded-lg bg-primary text-text-main font-bold text-sm shadow-md hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
          >
            <span class="material-symbols-outlined">save</span>
            Simpan Produk
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
