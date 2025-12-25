<script setup>
import useUserStore from '@/stores/userStore';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
// console.log(route, '<<< route saat ini')
// console.log('Path:', route.path)
// console.log('Name:', route.name)
// console.log('Params:', route.params)
// console.log('Query:', route.query)
// result:
//  '<<< route saat ini'
// LeftSidebar.vue?t=1766444753733:26 Path: /sales
// LeftSidebar.vue?t=1766444753733:27 Name: sales
// LeftSidebar.vue?t=1766444753733:28 Params: {}
// LeftSidebar.vue?t=1766444753733:29 Query: {}
const userStore = useUserStore()

</script>

<template>
  <aside
    class="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark hidden md:flex flex-col z-20"
  >
    <div class="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800/50">
      <RouterLink to="/">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center size-8 rounded-lg bg-primary text-slate-900">
            <span class="material-symbols-outlined filled text-[20px]">storefront</span>
          </div>
          <span class="text-lg font-bold tracking-tight">CuanPOS</span>
        </div>
      </RouterLink>
    </div>
    <div class="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1.5">
      <RouterLink to="/">
        <div
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary-dark dark:text-primary font-medium group transition-all duration-200"
          :class="route.path === '/' ? 'bg-primary/10' : 'hover:ml-2  hover:bg-slate-50'"
          >
          <span class="material-symbols-outlined filled">dashboard</span>
          <span>Dashboard</span>
        </div>
      </RouterLink>

      <RouterLink to="/sales">
        <div
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-200 group"
          :class="route.path === '/sales' ? 'bg-primary/10' : 'hover:ml-2 hover:bg-slate-50'"
          >
          <span class="material-symbols-outlined">receipt_long</span>
          <span>Transaksi</span>
        </div>
      </RouterLink>

      <RouterLink to="/product">
        <div
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400  dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-200 group"
          :class="route.path === '/product' ? 'bg-primary/10' : 'hover:ml-2 hover:bg-slate-50'"
        >
          <span class="material-symbols-outlined">inventory_2</span>
          <span>Produk</span>
        </div>
      </RouterLink>

      <RouterLink to="/inventory">
        <div
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-200 group"
          :class="route.path === '/inventory' ? 'bg-primary/10' : 'hover:ml-2 hover:bg-slate-50'"
        >
          <span class="material-symbols-outlined">package_2</span>
          <span>Inventaris</span>
        </div>
      </RouterLink>

      <RouterLink to="#">
        <div
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-200 group"
          href="#"
        >
          <span class="material-symbols-outlined">group</span>
          <span>Pelanggan</span>
        </div>
      </RouterLink>

      <RouterLink to="#">
        <div
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-200 group"
          href="#"
        >
          <span class="material-symbols-outlined">settings</span>
          <span>Pengaturan</span>
        </div>
      </RouterLink>
    </div>

    <div class="p-4 border-t border-slate-200 dark:border-slate-800">
      <div
        class="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50"
      >
        <div
          class="size-9 rounded-full bg-cover bg-center"
          data-alt="User avatar placeholder"
          style="
            background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDssDmUsy4XenPY6svQ35wXxbcgw_UBcyM9PsIdTRNu3lO-QgdwSYphRG9USTteN7DhTFUv8t5ZpcBXBsVA-KrLuZGo4gbH5OUJGznwnWHdPKOH_vv27IAVPPORIOUAmmC49Mt1gT6KgAJ-s-e67ZApgr2JpgwrPPVAPDxfirUxAyU7VRFz2sIi8NRW6IVWTuyp9XkoyuA4VMzXjFxVi0ytDD6_AnF5JdukXoUwk8-1nb4cegqygwTpOzh42toiwgx1jB430CvRq1X2');
          "
        ></div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">{{ userStore.name }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400 truncate">{{ userStore.role }} Toko</p>
        </div>
        <button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <span class="material-symbols-outlined text-[20px]">logout</span>
        </button>
      </div>
    </div>
  </aside>
</template>
