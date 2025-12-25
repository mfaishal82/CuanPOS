<script setup>

</script>

<template>
  <header
    class="h-16 flex items-center justify-between px-6 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10"
  >
    <div class="flex items-center gap-4">
      <button
        class="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
      >
        <span class="material-symbols-outlined">menu</span>
      </button>
      <h2 class="text-lg font-semibold hidden sm:block">Dashboard Overview</h2>
    </div>
    <div class="flex items-center gap-4">
      <div class="hidden sm:flex relative group">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span class="material-symbols-outlined text-slate-400 text-[20px]">search</span>
        </div>
        <input
          class="block w-64 pl-10 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          placeholder="Cari transaksi, produk..."
          type="text"
        />
      </div>
      <button
        class="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <span class="material-symbols-outlined text-[24px]">notifications</span>
        <span
          class="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-surface-light dark:border-surface-dark"
        ></span>
      </button>
    </div>
  </header>
</template>
