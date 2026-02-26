<script setup></script>
<template>
  <main class="ml-64 flex-1 p-8">
    <!-- Breadcrumbs -->
    <nav aria-label="Breadcrumb" class="flex text-sm font-medium text-slate-500 mb-6">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <a class="hover:text-primary" href="#">Home</a>
        </li>
        <li>
          <div class="flex items-center">
            <span class="material-symbols-outlined text-sm mx-1">chevron_right</span>
            <a class="hover:text-primary" href="#">Manajemen User</a>
          </div>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <span class="material-symbols-outlined text-sm mx-1">chevron_right</span>
            <span class="text-slate-900 dark:text-slate-100">Tambah User Baru</span>
          </div>
        </li>
      </ol>
    </nav>
    <!-- Header Section -->
    <div class="mb-8">
      <h1 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
        Tambah User Baru
      </h1>
      <p class="text-slate-500 mt-2">
        Lengkapi formulir di bawah ini untuk menambahkan hak akses pengguna baru ke sistem CuanPOS.
      </p>
    </div>
    <!-- Form Content -->
    <div
      class="max-w-4xl bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden"
    >
      <form action="#" class="p-8" method="POST">
        <!-- Profile Picture Upload Section -->
        <div class="mb-10">
          <label
            class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wider"
            >Foto Profil</label
          >
          <div class="flex items-center gap-8">
            <div class="relative group">
              <div
                class="w-32 h-32 rounded-full border-4 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden"
              >
                <span class="material-symbols-outlined text-slate-300 text-5xl">person</span>
              </div>
              <button
                class="absolute bottom-0 right-0 bg-primary p-2 rounded-full text-white shadow-lg hover:bg-primary/90 transition-transform hover:scale-110"
                type="button"
              >
                <span class="material-symbols-outlined text-base">photo_camera</span>
              </button>
            </div>
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-3">
                <button
                  class="bg-primary px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-primary/90 transition-all"
                  type="button"
                >
                  Pilih Foto
                </button>
                <button
                  class="px-4 py-2 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  type="button"
                >
                  Hapus
                </button>
              </div>
              <p class="text-xs text-slate-400">
                Rekomendasi ukuran 400x400px. Maksimal 2MB (JPG, PNG).
              </p>
            </div>
          </div>
        </div>
        <hr class="border-slate-100 dark:border-slate-800 mb-10" />
        <!-- Basic Information Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div class="col-span-2">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">Informasi Dasar</h3>
            <p class="text-sm text-slate-500 mb-4">
              Informasi identitas pengguna untuk keperluan sistem.
            </p>
          </div>
          <!-- Nama Lengkap -->
          <div class="flex flex-col gap-2">
            <label
              class="text-sm font-semibold text-slate-700 dark:text-slate-300"
              for="nama_lengkap"
              >Nama Lengkap</label
            >
            <input
              class="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              id="nama_lengkap"
              name="nama_lengkap"
              placeholder="Masukkan nama lengkap"
              type="text"
            />
          </div>
          <!-- Alamat Email -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300" for="email"
              >Alamat Email</label
            >
            <input
              class="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              id="email"
              name="email"
              placeholder="contoh@email.com"
              type="email"
            />
          </div>
          <!-- Nomor Telepon -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300" for="phone"
              >Nomor Telepon</label
            >
            <div class="relative">
              <span
                class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 font-medium"
                >+62</span
              >
              <input
                class="w-full pl-14 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                id="phone"
                name="phone"
                placeholder="812-XXXX-XXXX"
                type="tel"
              />
            </div>
          </div>
          <!-- Peran -->
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300" for="peran"
              >Peran (Role)</label
            >
            <div class="relative">
              <select
                class="w-full appearance-none px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                id="peran"
                name="peran"
              >
                <option disabled="" selected="" value="">Pilih Peran</option>
                <option value="admin">Admin</option>
                <option value="kasir">Kasir</option>
                <option value="manager">Manager</option>
              </select>
              <div
                class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400"
              >
                <span class="material-symbols-outlined">expand_more</span>
              </div>
            </div>
          </div>
          <div class="col-span-2 pt-4">
            <div
              class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800"
            >
              <div class="flex flex-col">
                <span class="font-bold text-slate-900 dark:text-white">Status Akun</span>
                <span class="text-xs text-slate-500"
                  >Tentukan apakah akun ini dapat langsung digunakan atau tidak.</span
                >
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input checked="" class="sr-only peer" type="checkbox" value="" />
                <div
                  class="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
                ></div>
                <span class="ms-3 text-sm font-bold text-primary">Aktif</span>
              </label>
            </div>
          </div>
        </div>
        <!-- Actions Buttons -->
        <div class="mt-12 flex items-center justify-end gap-4">
          <button
            class="px-6 py-3 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            type="button"
          >
            Batal
          </button>
          <button
            class="bg-primary px-8 py-3 rounded-lg text-sm font-black text-slate-900 shadow-[0_4px_14px_0_rgba(19,236,128,0.39)] hover:shadow-[0_6px_20px_rgba(19,236,128,0.23)] hover:scale-[1.02] transition-all"
            type="submit"
          >
            TAMBAH USER
          </button>
        </div>
      </form>
    </div>
    <!-- Security Notice -->
    <div class="mt-6 flex items-start gap-3 text-slate-400 max-w-4xl px-4">
      <span class="material-symbols-outlined text-base mt-0.5">info</span>
      <p class="text-xs leading-relaxed italic">
        Password sementara akan dikirimkan secara otomatis ke alamat email yang didaftarkan.
        Pengguna wajib mengganti password pada saat login pertama kali.
      </p>
    </div>
  </main>
</template>
