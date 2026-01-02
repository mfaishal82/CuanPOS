<template>
  <!-- Media Upload Card -->
  <section
    class="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-6"
  >
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
        <p class="text-sm font-medium text-text-main dark:text-white mb-1">Klik untuk upload</p>
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
</template>
