<template>
  <div class="space-y-4 overflow-y-auto">
    <!-- Profil Toko -->
    <details
      class="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
    >
      <summary class="p-6 cursor-pointer flex items-center justify-between select-none">
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center"
          >
            <span class="material-symbols-outlined">storefront</span>
          </div>
          <div>
            <h3 class="font-bold text-xl">Profil Toko</h3>
            <p class="text-sm text-slate-500">
              Identitas bisnis yang akan tampil di aplikasi dan struk.
            </p>
          </div>
        </div>
        <span
          class="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform"
          >expand_more</span
        >
      </summary>
      <div class="px-6 pb-8 pt-2">
        <div
          class="p-4 mb-6 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl flex gap-3"
        >
          <span class="material-symbols-outlined text-blue-500 text-xl">lightbulb</span>
          <p class="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
            <strong>Tips:</strong> Gunakan nama yang mudah diingat pelanggan. Nomor telepon dan
            alamat email akan digunakan untuk komunikasi resmi dan pengiriman invoice digital.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-5">
            <div>
              <label class="block text-sm font-semibold mb-2">Nama Toko</label>
              <input
                class="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm p-3"
                type="text"
                value="Cuan Coffee &amp; Roastery"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2">Nomor Telepon</label>
              <input
                class="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm p-3"
                type="tel"
                value="+62 812 3456 7890"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2">Email Bisnis</label>
              <input
                class="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm p-3"
                type="email"
                value="hello@cuancoffee.com"
              />
            </div>
          </div>
          <div class="space-y-5">
            <div>
              <label class="block text-sm font-semibold mb-2">Logo Toko</label>
              <div class="flex items-center gap-5">
                <div
                  class="w-28 h-28 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden"
                >
                  <img
                    alt="Store Logo"
                    class="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD93Clw8qiZpVZf-n6bG4y9hmHbgovnindk-ohKwAtBN5TvY6oZ8I1-ckxyDfVlSOi441cKp0-eBnFwNv_UNw_5ab7RwqZDO_YNESDuWcn-p5W99PgQknpE-RtSssDwUkl0mN-ly5txKshRhF79T0y0WZhBskOvlNgiJu-aQ6qyuUoHnSaWvZnj9EGUNV8N_7tw3S-AUl5w1N6KmQcOieHCr_sYbM5sonn-8_E8rwCGCRkKMSvfBIx5x85rHNRUMhRj6CCjloOHKeZg"
                  />
                </div>
                <div class="flex-1">
                  <button
                    class="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    Unggah Foto Baru
                  </button>
                  <p class="text-[11px] text-slate-400 mt-2 leading-tight">
                    Format: JPG atau PNG. Ukuran file maksimal 2 MB agar pemuatan aplikasi tetap
                    cepat.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2">Alamat Lengkap</label>
              <textarea
                class="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm p-3"
                rows="3"
              >
              Jl. Kebahagiaan No. 40, Jakarta Selatan, DKI Jakarta 12345</textarea
              >
            </div>
          </div>
        </div>
      </div>
    </details>
    <!-- <details
      class="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
    >
      <summary class="p-6 cursor-pointer flex items-center justify-between select-none">
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center"
          >
            <span class="material-symbols-outlined">settings_suggest</span>
          </div>
          <div>
            <h3 class="font-bold text-xl">Pengaturan Sistem</h3>
            <p class="text-sm text-slate-500">Sesuaikan bahasa, mata uang, dan zona waktu lokal.</p>
          </div>
        </div>
        <span
          class="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform"
          >expand_more</span
        >
      </summary>
      <div class="px-6 pb-8 pt-2">
        <div
          class="p-4 mb-6 bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-xl flex gap-3"
        >
          <span class="material-symbols-outlined text-orange-500 text-xl">info</span>
          <p class="text-sm text-orange-800 dark:text-orange-300 leading-relaxed">
            <strong>Penting:</strong> Pastikan zona waktu sudah benar agar laporan penjualan harian
            Anda tercatat secara akurat sesuai waktu operasional toko.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-semibold mb-2">Bahasa Aplikasi</label>
            <select
              class="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm p-3"
            >
              <option selected="">Bahasa Indonesia</option>
              <option>English (US)</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Mata Uang</label>
            <select
              class="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm p-3"
            >
              <option selected="">IDR (Rupiah)</option>
              <option>USD (Dollar)</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Zona Waktu</label>
            <select
              class="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm p-3"
            >
              <option selected="">(GMT+07:00) Jakarta</option>
              <option>(GMT+08:00) Makassar</option>
              <option>(GMT+09:00) Jayapura</option>
            </select>
          </div>
        </div>
      </div>
    </details>

    <details
      class="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
    >
      <summary class="p-6 cursor-pointer flex items-center justify-between select-none">
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center"
          >
            <span class="material-symbols-outlined">description</span>
          </div>
          <div>
            <h3 class="font-bold text-xl">Konfigurasi Struk</h3>
            <p class="text-sm text-slate-500">
              Percantik tampilan bukti pembayaran untuk pelanggan.
            </p>
          </div>
        </div>
        <span
          class="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform"
          >expand_more</span
        >
      </summary>
      <div class="px-6 pb-8 pt-2">
        <div
          class="p-4 mb-6 bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 rounded-xl flex gap-3"
        >
          <span class="material-symbols-outlined text-purple-500 text-xl">auto_fix_high</span>
          <p class="text-sm text-purple-800 dark:text-purple-300 leading-relaxed">
            <strong>Saran:</strong> Tambahkan ucapan terima kasih atau informasi promosi di bagian
            footer untuk memberikan kesan positif kepada pelanggan.
          </p>
        </div>
        <div
          class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-6"
        >
          <div>
            <h4 class="font-bold text-sm">Tampilkan Logo di Struk</h4>
            <p class="text-xs text-slate-500">Logo toko Anda akan muncul di bagian atas struk.</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input checked="" class="sr-only peer" type="checkbox" />
            <div
              class="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
            ></div>
          </label>
        </div>
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-semibold mb-2">Header Struk</label>
            <textarea
              class="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm p-3"
              placeholder="Contoh: Selamat Datang di Toko Kami!"
              rows="2"
            >
            Cuan Coffee &amp; Roastery
            Nikmati Setiap Tetes Kebahagiaan</textarea
            >
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">Footer Struk</label>
            <textarea
              class="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm p-3"
              placeholder="Contoh: Ikuti Instagram kami @toko_kami"
              rows="2"
            >
            Terima Kasih Atas Kunjungan Anda!
            Barang yang sudah dibeli tidak dapat ditukar.</textarea
            >
          </div>
        </div>
      </div>
    </details>

    <details
      class="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
    >
      <summary class="p-6 cursor-pointer flex items-center justify-between select-none">
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center justify-center"
          >
            <span class="material-symbols-outlined">lock_reset</span>
          </div>
          <div>
            <h3 class="font-bold text-xl">Keamanan Akun</h3>
            <p class="text-sm text-slate-500">
              Perbarui kata sandi untuk menjaga keamanan akses sistem.
            </p>
          </div>
        </div>
        <span
          class="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform"
          >expand_more</span
        >
      </summary>
      <div class="px-6 pb-8 pt-2">
        <div
          class="p-4 mb-6 bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl flex gap-3"
        >
          <span class="material-symbols-outlined text-red-500 text-xl">security</span>
          <p class="text-sm text-red-800 dark:text-red-300 leading-relaxed">
            <strong>Panduan:</strong> Kata sandi yang kuat mengandung minimal 8 karakter dengan
            kombinasi huruf besar, huruf kecil, dan angka.
          </p>
        </div>
        <div class="max-w-md space-y-5">
          <div>
            <label class="block text-sm font-semibold mb-2">Kata Sandi Lama</label>
            <input
              class="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm p-3"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold mb-2">Kata Sandi Baru</label>
              <input
                class="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm p-3"
                placeholder="••••••••"
                type="password"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-2">Konfirmasi Sandi</label>
              <input
                class="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm p-3"
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>
        </div>
      </div>
    </details> -->
  </div>
  <div
    class="fixed bottom-0 left-64 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-5 z-10"
  >
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <p class="text-sm text-slate-500 italic hidden md:block">
        Pastikan semua data sudah benar sebelum menyimpan.
      </p>
      <div class="flex gap-4 w-full md:w-auto">
        <button
          class="flex-1 md:flex-none px-8 py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
        >
          Batal
        </button>
        <button
          class="flex-1 md:flex-none px-10 py-3 rounded-xl bg-primary text-slate-900 font-bold text-sm shadow-xl shadow-primary/30 hover:brightness-105 active:scale-[0.98] transition-all"
        >
          Simpan Pengaturan
        </button>
      </div>
    </div>
  </div>
  <div class="h-32"></div>
</template>
