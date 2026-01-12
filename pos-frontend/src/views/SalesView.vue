<script setup>
import useProductStore from '@/stores/productStore';
import { computed, onMounted, ref } from 'vue';

const searcQuery = ref('')
const currentPage = ref(1)
const limitItem = ref(20)
const selectedCategory = ref('')
const orderBy = ref('updatedAt')
const sortBy = ref('DESC')
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
            class="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-xl bg-primary text-secondary font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <span class="material-symbols-outlined text-[20px]">restaurant_menu</span>
            Semua
          </button>
          <button
            v-for="cat in productStore.category"
            :key="cat.id"
            class="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-xl bg-surface-light dark:bg-surface-dark text-secondary dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto px-6 pb-6 scroll-smooth">
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          <!-- List product dengan harga -->
          <div
            v-for="item in productStore.product" :key="item.id"
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
            <h3 class="font-bold text-secondary dark:text-white leading-tight mb-1 text-base">
              {{ item.name }}
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">{{ item.Category.name }}</p>
            <div class="mt-auto flex items-center justify-between">
              <span class="font-bold text-primary text-lg">Rp {{ item.price.toLocaleString('id-ID') }}</span>
              <button
                class="w-8 h-8 cursor-pointer rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-primary text-secondary group-hover:text-secondary flex items-center justify-center transition-colors"
              >
                <span class="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
</style>
