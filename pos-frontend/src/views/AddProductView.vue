<script setup>
import useProductStore from '@/stores/productStore'
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { Transition } from 'vue'

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
const productStore = useProductStore()
const currentStep = ref(1)
const mode = ref('new')

const router = useRouter()

onMounted(async () => {
  await productStore.fetchCategory({
    search: '',
  })
})

// console.log(selectedCategory.value)

async function handleForm() {
  loading.value = true

  const success = await productStore.addProduct({
    name: productName.value,
    price: price.value,
    cost_price: costPrice.value,
    image: imageFile.value,
    stock: stock.value,
    barcode: barcode.value,
    category_id: selectedCategory.value,
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
    toast('Gambar tidak boleh lebih dari 2MB!', {
      type: 'error',
      dangerouslyHTMLString: true,
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
</script>

<template>
  <main
    class="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6 custom-scrollbar"
  >
    <div class="mx-auto max-w-[1200px] space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            Catat Pembelian
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tambahkan stok masuk dan lacak riwayat pembelian.
          </p>
        </div>
        <div class="flex gap-2">
          <span
            class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
            >Mode Draf</span
          >
        </div>
      </div>
      <div class="relative mb-6">
        <div aria-hidden="true" class="absolute inset-0 flex items-center">
          <div class="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div class="relative flex justify-center">
          <ol class="flex gap-x-4" role="list">
            <li>
              <template v-if="currentStep === 1">
                <a
                  class="flex items-center justify-center size-8 rounded-full bg-primary ring-8 ring-background-light dark:ring-background-dark"
                  href="#"
                >
                  <span class="text-white text-xs font-bold">1</span>
                </a>
              </template>
              <template v-if="currentStep > 1">
                <a
                  @click.prevent="currentStep = 1"
                  class="flex items-center justify-center size-8 rounded-full bg-primary hover:bg-green-400 dark:bg-primary dark:hover:bg-green-600 ring-8 ring-background-light dark:ring-background-dark transition-colors cursor-pointer"
                  href="#"
                >
                  <span class="material-symbols-outlined text-white text-[16px] fill-1">check</span>
                </a>
              </template>
            </li>
            <li>
              <template v-if="currentStep < 2">
                <div
                  class="flex items-center justify-center size-8 rounded-full bg-gray-100 dark:bg-gray-700 ring-8 ring-background-light dark:ring-background-dark"
                >
                  <span class="text-gray-500 text-xs font-bold">2</span>
                </div>
              </template>
              <template v-if="currentStep === 2">
                <a
                  class="flex items-center justify-center size-8 rounded-full bg-primary ring-8 ring-background-light dark:ring-background-dark"
                  href="#"
                >
                  <span class="text-white text-xs font-bold">2</span>
                </a>
              </template>
              <template v-if="currentStep > 2">
                <a
                  @click.prevent="currentStep = 2"
                  class="flex items-center justify-center size-8 rounded-full bg-primary hover:bg-green-400 dark:bg-primary dark:hover:bg-green-600 ring-8 ring-background-light dark:ring-background-dark transition-colors cursor-pointer"
                  href="#"
                >
                  <span class="material-symbols-outlined text-white text-[16px] fill-1">check</span>
                </a>
              </template>
            </li>
            <li>
              <template v-if="currentStep < 3">
                <div
                  class="flex items-center justify-center size-8 rounded-full bg-gray-100 dark:bg-gray-700 ring-8 ring-background-light dark:ring-background-dark"
                >
                  <span class="text-gray-500 text-xs font-bold">3</span>
                </div>
              </template>
              <template v-if="currentStep === 3">
                <a
                  class="flex items-center justify-center size-8 rounded-full bg-primary ring-8 ring-background-light dark:ring-background-dark"
                  href="#"
                >
                  <span class="text-white text-xs font-bold">3</span>
                </a>
              </template>
            </li>
          </ol>
        </div>
      </div>
      <form class="flex flex-col gap-6 lg:flex-row lg:items-start" @submit.prevent>
        <div class="flex flex-1 flex-col gap-6 w-full">
          <!-- Step 1 - Detail pembelian -->
          <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-show="currentStep === 1"
              class="rounded-xl border border-[#e9f3e7] dark:border-gray-700 bg-surface-light dark:bg-surface-dark p-6 shadow-sm"
            >
              <h3
                class="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
              >
                <span class="material-symbols-outlined text-primary">receipt_long</span>
                Detail Pembelian
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <!-- <div class="flex flex-col gap-2">
                  <label class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400"
                    >Pemasok <span class="text-red-500">*</span></label
                  >
                  <div class="relative">
                    <input
                      class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-primary focus:ring-primary dark:text-white"
                      list="suppliers"
                      placeholder="Cari pemasok..."
                      type="text"
                    />
                    <span
                      class="absolute right-3 top-2.5 material-symbols-outlined text-gray-400 text-[20px] pointer-events-none"
                      >expand_more</span
                    >
                    <datalist id="suppliers">
                      <option value="PT. Global Tech"></option>
                      <option value="Sumber Makmur Jaya"></option>
                      <option value="CV. Electro Goods"></option>
                    </datalist>
                  </div>
                </div> -->
                <div class="flex flex-col gap-2">
                  <label class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400"
                    >Tanggal Pembelian <span class="text-red-500">*</span></label
                  >
                  <input
                    class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-primary focus:ring-primary dark:text-white"
                    type="date"
                    value="2023-10-24"
                  />
                </div>
                <!-- <div class="flex flex-col gap-2">
                  <label class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400"
                    >No. Referensi</label
                  >
                  <input
                    class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-primary focus:ring-primary dark:text-white placeholder:text-gray-400"
                    placeholder="No. Invoice (Opsional)"
                    type="text"
                  />
                </div> -->
                <div class="flex flex-col gap-2">
                  <label class="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400"
                    >Status</label
                  >
                  <select
                    class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-primary focus:ring-primary dark:text-white"
                  >
                    <option value="draft">Draf</option>
                    <option value="completed">Selesai</option>
                    <option value="cancelled">Dibatalkan</option>
                  </select>
                </div>
              </div>
              <div class="mt-8 flex justify-end">
                <button
                  @click="currentStep = 2"
                  class="rounded-lg bg-primary py-2.5 px-4 text-sm font-bold text-primary-content shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors flex items-center justify-center gap-2"
                  type="button"
                >
                  Lanjut ke Tambah Item
                  <span class="material-symbols-outlined text-[20px]">arrow_right_alt</span>
                </button>
              </div>
            </div>
          </Transition>

          <!-- Step 2 - Tambah item ke purchase -->
          <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-show="currentStep === 2"
              class="rounded-xl border border-[#e9f3e7] dark:border-gray-700 bg-surface-light dark:bg-surface-dark shadow-sm overflow-hidden"
            >
              <div
                class="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 px-6 py-4 flex justify-between items-center"
              >
                <h3
                  class="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2"
                >
                  <span class="material-symbols-outlined text-primary">add_circle</span>
                  Tambahkan Item ke Pembelian
                </h3>
                <button
                  class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  type="button"
                >
                  <span class="material-symbols-outlined">restart_alt</span>
                </button>
              </div>
              <div class="p-6">
                <div
                  class="flex w-full rounded-lg bg-gray-100 dark:bg-gray-900 p-1 mb-8 max-w-lg mx-auto md:mx-0"
                >
                  <label class="flex-1 cursor-pointer">
                    <input
                      class="peer sr-only"
                      name="item_mode"
                      type="radio"
                      value="existing"
                      v-model="mode"
                    />
                    <div
                      class="flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 transition-all hover:text-gray-700 dark:hover:text-gray-200 peer-checked:bg-white dark:peer-checked:bg-gray-800 peer-checked:shadow-sm peer-checked:text-gray-900 dark:peer-checked:text-white"
                    >
                      <span class="material-symbols-outlined text-[18px]">inventory_2</span>
                      Pilih Produk Tersedia
                    </div>
                  </label>
                  <label class="flex-1 cursor-pointer">
                    <input
                      class="peer sr-only"
                      name="item_mode"
                      type="radio"
                      value="new"
                      v-model="mode"
                    />
                    <div
                      class="flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 transition-all hover:text-gray-700 dark:hover:text-gray-200 peer-checked:bg-white dark:peer-checked:bg-gray-800 peer-checked:shadow-sm peer-checked:text-gray-900 dark:peer-checked:text-white"
                    >
                      <span class="material-symbols-outlined text-[18px]">new_label</span>
                      Tambahkan Produk Baru
                    </div>
                  </label>
                </div>
                <div class="space-y-6">
                  <Transition
                    enter-active-class="transition ease-out duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition ease-in duration-200"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <div v-show="mode === 'existing'" class="animate-fade-in">
                      <label class="block text-xs font-semibold text-gray-500 uppercase mb-2"
                        >Cari Produk <span class="text-red-500">*</span></label
                      >
                      <div class="relative">
                        <div
                          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                        >
                          <span class="material-symbols-outlined text-gray-400 text-[20px]"
                            >search</span
                          >
                        </div>
                        <input
                          class="w-full pl-10 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm py-2.5 focus:border-primary focus:ring-primary shadow-sm"
                          placeholder="Ketik nama, SKU, atau pindai barcode..."
                          type="text"
                        />
                        <div class="absolute inset-y-0 right-0 pr-2 flex items-center">
                          <kbd
                            class="inline-flex items-center border border-gray-200 dark:border-gray-600 rounded px-2 text-xs font-sans font-medium text-gray-400"
                            >⌘K</kbd
                          >
                        </div>
                      </div>
                      <p class="text-xs text-gray-500 mt-2">
                        Cari dari database inventaris Anda yang ada.
                      </p>
                    </div>
                  </Transition>

                  <Transition
                    enter-active-class="transition ease-out duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition ease-in duration-200"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <div
                      v-show="mode === 'new'"
                      class="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in"
                    >
                      <div class="md:col-span-2">
                        <label class="block text-xs font-semibold text-gray-500 uppercase mb-1.5"
                          >Nama Produk <span class="text-red-500">*</span></label
                        >
                        <input
                          class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary py-2.5"
                          placeholder="contoh: Mouse Gaming Nirkabel G304"
                          type="text"
                        />
                      </div>
                      <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase mb-1.5"
                          >Barcode / SKU
                          <span class="text-gray-400 font-normal lowercase">(opsional)</span></label
                        >
                        <div class="flex gap-2">
                          <input
                            class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary py-2.5"
                            placeholder="Pindai atau ketik..."
                            type="text"
                          />
                          <button
                            class="px-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors border border-gray-200 dark:border-gray-600"
                            title="Scan Barcode"
                            type="button"
                          >
                            <span class="material-symbols-outlined text-[20px]"
                              >qr_code_scanner</span
                            >
                          </button>
                        </div>
                      </div>
                      <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase mb-1.5"
                          >Kategori</label
                        >
                        <select
                          class="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary py-2.5"
                        >
                          <option>Tidak Terkategori</option>
                          <option>Elektronik</option>
                          <option>Aksesoris</option>
                          <option>Periferal</option>
                          <option>Minuman</option>
                        </select>
                      </div>
                      <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase mb-1.5"
                          >Harga Pokok (HPP) <span class="text-red-500">*</span></label
                        >
                        <div class="relative">
                          <span class="absolute left-3 top-2.5 text-gray-500 text-xs font-bold"
                            >Rp</span
                          >
                          <input
                            class="w-full pl-9 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary py-2.5"
                            placeholder="0"
                            type="number"
                          />
                        </div>
                      </div>
                      <div>
                        <label class="block text-xs font-semibold text-gray-500 uppercase mb-1.5"
                          >Harga Jual <span class="text-red-500">*</span></label
                        >
                        <div class="relative">
                          <span class="absolute left-3 top-2.5 text-gray-500 text-xs font-bold"
                            >Rp</span
                          >
                          <input
                            class="w-full pl-9 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary py-2.5"
                            placeholder="0"
                            type="number"
                          />
                        </div>
                      </div>
                    </div>
                  </Transition>

                  <div
                    class="bg-primary/5 dark:bg-primary/10 rounded-xl p-5 border border-primary/10 flex flex-col"
                  >
                    <h4
                      class="text-sm font-bold text-gray-800 dark:text-gray-100 mb-4 border-b border-primary/10 pb-2"
                    >
                      Perhitungan Item
                    </h4>
                    <div class="space-y-4">
                      <div class="grid grid-cols-2 gap-3">
                        <div>
                          <label
                            class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5"
                            >Kuantitas <span class="text-red-500">*</span></label
                          >
                          <div class="flex items-center">
                            <button
                              class="w-10 h-9 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors"
                              type="button"
                            >
                              <span class="material-symbols-outlined text-[16px]">remove</span>
                            </button>
                            <input
                              class="w-full h-9 border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm text-center focus:border-primary focus:ring-primary focus:z-10"
                              type="number"
                              value="1"
                            />
                            <button
                              class="w-10 h-9 rounded-r-lg border border-l-0 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors"
                              type="button"
                            >
                              <span class="material-symbols-outlined text-[16px]">add</span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <label
                            class="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5"
                            >Harga Satuan (Beli) <span class="text-red-500">*</span></label
                          >
                          <div class="relative">
                            <span class="absolute left-3 top-2 text-gray-500 text-xs">Rp</span>
                            <input
                              class="w-full pl-8 h-9 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary"
                              placeholder="0"
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="pt-4 border-t border-primary/10 space-y-3">
                        <div class="flex justify-between items-center">
                          <span class="text-sm text-gray-500">Subtotal</span>
                          <span class="text-xl font-bold text-gray-900 dark:text-white">Rp 0</span>
                        </div>
                      </div>
                    </div>
                    <button
                      class="w-full mt-4 py-2.5 bg-primary text-primary-content font-bold rounded-lg shadow-sm hover:bg-green-400 hover:shadow-md transition-all flex items-center justify-center gap-2 transform active:scale-[0.98]"
                      type="button"
                    >
                      <span class="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                      Tambah Item
                    </button>
                  </div>
                </div>
              </div>
              <div
                class="mt-8 px-6 py-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50"
              >
                <button
                  @click="currentStep = 1"
                  class="rounded-lg bg-[#e9f3e7] dark:bg-gray-800 py-2.5 px-4 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-[#dbebd8] dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  type="button"
                >
                  <span class="material-symbols-outlined text-[20px]">arrow_left_alt</span>
                  Kembali
                </button>
                <button
                  @click="currentStep = 3"
                  class="rounded-lg bg-primary py-2.5 px-4 text-sm font-bold text-primary-content shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors flex items-center justify-center gap-2"
                  type="button"
                >
                  Lanjut ke Ringkasan
                  <span class="material-symbols-outlined text-[20px]">arrow_right_alt</span>
                </button>
              </div>
            </div>
          </Transition>

          <!-- Step 3 - Ringkasan pembelian item -->
          <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-show="currentStep === 3"
              class="rounded-xl border border-[#e9f3e7] dark:border-gray-700 bg-surface-light dark:bg-surface-dark overflow-hidden shadow-sm flex flex-col min-h-[300px]"
            >
              <div
                class="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/30 dark:bg-gray-800/20"
              >
                <h3
                  class="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2"
                >
                  <span class="material-symbols-outlined text-gray-400">list_alt</span>
                  Daftar Item
                </h3>
                <span
                  class="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                  >2 Item</span
                >
              </div>
              <div class="overflow-x-auto">
                <table class="w-full min-w-[600px] text-left border-collapse">
                  <thead class="bg-gray-50 dark:bg-gray-800/50">
                    <tr
                      class="border-b border-gray-100 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500"
                    >
                      <th class="py-3 pl-6 pr-4 font-medium w-[30%]">Produk</th>
                      <th class="py-3 px-2 font-medium w-[15%]">SKU</th>
                      <th class="py-3 px-2 font-medium w-[10%] text-center">Stok Saat Ini</th>
                      <th class="py-3 px-2 font-medium w-[10%]">Kuantitas</th>
                      <th class="py-3 px-2 font-medium w-[15%]">Harga Pokok</th>
                      <th class="py-3 px-2 font-medium w-[15%] text-right">Subtotal</th>
                      <th class="py-3 pl-4 pr-6 font-medium w-[5%] text-center"></th>
                    </tr>
                  </thead>
                  <tbody
                    class="text-sm text-gray-700 dark:text-gray-300 divide-y divide-gray-50 dark:divide-gray-800"
                  >
                    <tr class="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td class="py-3 pl-6 pr-4 align-middle">
                        <div class="flex flex-col">
                          <span class="font-medium text-gray-900 dark:text-white"
                            >Wireless Mouse M185</span
                          >
                          <span class="text-xs text-gray-500">Elektronik</span>
                        </div>
                      </td>
                      <td class="py-3 px-2 align-middle text-xs text-gray-500">LOG-M185</td>
                      <td class="py-3 px-2 align-middle text-center">
                        <span
                          class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                          >12</span
                        >
                      </td>
                      <td class="py-3 px-2 align-middle">
                        <input
                          class="w-20 rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-1 px-2 text-sm focus:border-primary focus:ring-primary text-center"
                          type="number"
                          value="50"
                        />
                      </td>
                      <td class="py-3 px-2 align-middle">
                        <input
                          class="w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-1 px-2 text-sm focus:border-primary focus:ring-primary"
                          type="number"
                          value="85000"
                        />
                      </td>
                      <td
                        class="py-3 px-2 align-middle text-right font-medium text-gray-900 dark:text-white"
                      >
                        Rp 4.250.000
                      </td>
                      <td class="py-3 pl-4 pr-6 align-middle text-center">
                        <button
                          class="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                          type="button"
                        >
                          <span class="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </td>
                    </tr>
                    <tr
                      class="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors bg-blue-50/30 dark:bg-blue-900/10"
                    >
                      <td class="py-3 pl-6 pr-4 align-middle">
                        <div class="flex flex-col">
                          <div class="flex items-center gap-2">
                            <span class="font-medium text-gray-900 dark:text-white"
                              >Mechanical Keyboard K2</span
                            >
                            <span
                              class="inline-flex items-center rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 border border-blue-200"
                              >PRODUK BARU</span
                            >
                          </div>
                          <span class="text-xs text-gray-500">Periferal</span>
                        </div>
                      </td>
                      <td class="py-3 px-2 align-middle text-xs text-gray-500">KEY-K2-RGB</td>
                      <td class="py-3 px-2 align-middle text-center">
                        <span class="text-gray-400 text-xs">-</span>
                      </td>
                      <td class="py-3 px-2 align-middle">
                        <input
                          class="w-20 rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-1 px-2 text-sm focus:border-primary focus:ring-primary text-center"
                          type="number"
                          value="10"
                        />
                      </td>
                      <td class="py-3 px-2 align-middle">
                        <input
                          class="w-full rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-1 px-2 text-sm focus:border-primary focus:ring-primary"
                          type="number"
                          value="1200000"
                        />
                      </td>
                      <td
                        class="py-3 px-2 align-middle text-right font-medium text-gray-900 dark:text-white"
                      >
                        Rp 12.000.000
                      </td>
                      <td class="py-3 pl-4 pr-6 align-middle text-center">
                        <button
                          class="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                          type="button"
                        >
                          <span class="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="mt-auto py-4 text-center border-t border-gray-50 dark:border-gray-800 text-xs text-gray-400"
              >
                item yang ditambahkan di atas akan muncul di sini
              </div>
              <div
                class="px-6 py-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50"
              >
                <button
                  @click="currentStep = 2"
                  class="rounded-lg bg-[#e9f3e7] dark:bg-gray-800 py-2.5 px-4 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-[#dbebd8] dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  type="button"
                >
                  <span class="material-symbols-outlined text-[20px]">arrow_left_alt</span>
                  Kembali ke Tambah Item
                </button>
                <div class="flex gap-3">
                  <button
                    class="rounded-lg bg-[#e9f3e7] dark:bg-gray-800 py-2.5 px-4 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-[#dbebd8] dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                    type="button"
                  >
                    <span
                      class="material-symbols-outlined text-[20px] text-gray-600 dark:text-gray-400"
                      >save</span
                    >
                    Simpan sebagai Draf
                  </button>
                  <button
                    class="rounded-lg bg-primary py-2.5 px-4 text-sm font-bold text-primary-content shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors flex items-center justify-center gap-2"
                    type="submit"
                  >
                    <span class="material-symbols-outlined text-[20px]">check</span>
                    Selesaikan Pembelian
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
        <div class="w-full lg:w-80 flex flex-col gap-6 shrink-0">
          <div
            class="rounded-xl border border-[#e9f3e7] dark:border-gray-700 bg-surface-light dark:bg-surface-dark p-6 shadow-sm sticky top-6"
          >
            <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-6">Ringkasan</h3>
            <div class="space-y-4">
              <div
                class="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700"
              >
                <span class="text-sm text-gray-500 dark:text-gray-400">Total Item</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-white">2</span>
              </div>
              <div
                class="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-700"
              >
                <span class="text-sm text-gray-500 dark:text-gray-400">Total Kuantitas</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-white">60</span>
              </div>
              <div class="flex justify-between items-end pt-2">
                <span class="text-sm font-medium text-gray-900 dark:text-white">Total Biaya</span>
                <div class="flex flex-col items-end">
                  <span class="text-2xl font-bold text-primary-content dark:text-primary"
                    >Rp 16.250.000</span
                  >
                  <span class="text-xs text-gray-400">Termasuk pajak</span>
                </div>
              </div>
            </div>
            <Transition
              enter-active-class="transition ease-out duration-300"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition ease-in duration-200"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div v-show="currentStep === 3" class="mt-8 flex flex-col gap-3">
                <button
                  class="w-full rounded-lg bg-primary py-3 px-4 text-sm font-bold text-primary-content shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors flex items-center justify-center gap-2"
                  type="submit"
                >
                  <span class="material-symbols-outlined text-[20px]">check</span>
                  Selesaikan Pembelian
                </button>
                <button
                  class="w-full rounded-lg bg-[#e9f3e7] dark:bg-gray-800 py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white shadow-sm hover:bg-[#dbebd8] dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  type="button"
                >
                  <span
                    class="material-symbols-outlined text-[20px] text-gray-600 dark:text-gray-400"
                    >save</span
                  >
                  Simpan sebagai Draf
                </button>
                <button
                  class="w-full rounded-lg bg-transparent py-2 px-4 text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                  type="button"
                >
                  Batal
                </button>
              </div>
            </Transition>
            <div
              class="mt-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-100 dark:border-blue-900/30"
            >
              <div class="flex gap-3">
                <span class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[20px]"
                  >info</span
                >
                <div>
                  <h4 class="text-xs font-semibold text-blue-900 dark:text-blue-100">Tips Cepat</h4>
                  <p class="mt-1 text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                    Produk baru yang ditambahkan akan secara otomatis terdaftar di sistem
                    inventaris.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
