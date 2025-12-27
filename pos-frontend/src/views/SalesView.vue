<template>
  <div class="flex flex-1 overflow-hidden">
    <main
      class="flex-1 flex flex-col bg-background-light dark:bg-background-dark overflow-hidden relative"
    >
      <div
        class="px-6 py-4 overflow-x-auto shrink-0 bg-background-light dark:bg-background-dark z-10 sticky top-0"
      >
        <div class="flex gap-3 min-w-max pb-2">
          <button
            class="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-secondary font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <span class="material-symbols-outlined text-[20px]">grid_view</span>
            All Items
          </button>
          <button
            class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark text-gray-600 dark:text-gray-300 font-medium hover:border-primary hover:text-primary transition-colors"
          >
            <span class="material-symbols-outlined text-[20px]">local_fire_department</span>
            Best Seller
          </button>
          <button
            class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark text-gray-600 dark:text-gray-300 font-medium hover:border-primary hover:text-primary transition-colors"
          >
            <span class="material-symbols-outlined text-[20px]">lunch_dining</span>
            Food
          </button>
          <button
            class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark text-gray-600 dark:text-gray-300 font-medium hover:border-primary hover:text-primary transition-colors"
          >
            <span class="material-symbols-outlined text-[20px]">local_cafe</span>
            Beverages
          </button>
          <button
            class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark text-gray-600 dark:text-gray-300 font-medium hover:border-primary hover:text-primary transition-colors"
          >
            <span class="material-symbols-outlined text-[20px]">cookie</span>
            Snacks
          </button>
          <button
            class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark text-gray-600 dark:text-gray-300 font-medium hover:border-primary hover:text-primary transition-colors"
          >
            <span class="material-symbols-outlined text-[20px]">icecream</span>
            Desserts
          </button>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto px-6 pb-6 scroll-smooth">
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          <div
            class="group bg-surface-light dark:bg-surface-dark rounded-2xl p-3 shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-primary cursor-pointer flex flex-col h-full"
          >
            <div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-100">
              <div
                class="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105 duration-500"
                data-alt="Iced coffee with milk and palm sugar"
                style="
                  background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDRcBxWT2GQT21ZyT8wI_IlRe7EcfABprLxbKvc70fWPlXjmu1aHOuLk0xS7Xh27LsZSa5HbAE1SpWkv6JoYVMDecACsXvZLlkHBQdnjJK_Rszhva4EPSKWDO2hoS0bhrQ6eNxB-BP7SUI2uVEMm-RtlOwEzGzbayhOVbBD0BSNksinX4KSqn1xIFtvXcwKcF70VTZqvIu7JKGpkd7K_WfraTjDmLLKsFe_8fXWwgdl_ZUQqELAXbbNVRHFZKVORJLQOTbBqtpVTFCx');
                "
              ></div>
              <div
                class="absolute top-2 right-2 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-bold text-secondary dark:text-white shadow-sm"
              >
                45 Left
              </div>
            </div>
            <h3 class="font-bold text-secondary dark:text-white leading-tight mb-1 text-base">
              Kopi Susu Gula Aren
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Beverage • Cold</p>
            <div class="mt-auto flex items-center justify-between">
              <span class="font-bold text-primary text-lg">Rp 18.000</span>
              <button
                class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-primary text-secondary group-hover:text-secondary flex items-center justify-center transition-colors"
              >
                <span class="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
          </div>
          <div
            class="group bg-surface-light dark:bg-surface-dark rounded-2xl p-3 shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-primary cursor-pointer flex flex-col h-full"
          >
            <div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-100">
              <div
                class="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105 duration-500"
                data-alt="Chocolate toast with melted topping"
                style="
                  background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsDsAHSmHrIG7mFgIM2bO2JBSvwRnN2WHw9q5L4J3jSXyOGKAB3irh2loV3J5KOeZ5uC64ZkIOt6dUvaN9LSSlkNa2hfcRk6z1oWmTlhoWSOAigSXQR9b4z8AyfMqOOpbeF6JWKI29v6QjmHmlVJJ-L1n7dCZ7JXEbJEyC6bC7HDArgtdjIF7vS5eL5R0-sYJpyqdMRyg0MTUudQTCcKoW3hpVCRHeTTyB3aUYr-ywPHiA3ok8ldlBdFuji4zXqeYgWHBuIXUPG1x9');
                "
              ></div>
              <div
                class="absolute top-2 right-2 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-bold text-secondary dark:text-white shadow-sm"
              >
                20 Left
              </div>
            </div>
            <h3 class="font-bold text-secondary dark:text-white leading-tight mb-1 text-base">
              Roti Bakar Coklat
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Snack • Sweet</p>
            <div class="mt-auto flex items-center justify-between">
              <span class="font-bold text-primary text-lg">Rp 15.000</span>
              <button
                class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-primary text-secondary group-hover:text-secondary flex items-center justify-center transition-colors"
              >
                <span class="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
          </div>
          <div
            class="group bg-surface-light dark:bg-surface-dark rounded-2xl p-3 shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-primary cursor-pointer flex flex-col h-full"
          >
            <div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-100">
              <div
                class="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105 duration-500"
                data-alt="Glass of iced lemon tea"
                style="
                  background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB9PQDdZaz6buNQNZ73-rD3AadUJ8Lto3fP6T81RXK5NO4ScE8L_zHJdR8OXVOFFAmQuYFTdXZxmIpMHycBVTXZd6Z5kjJwMw_mJPu39r866RegrVGv_CYinWydOu5o_gbOF5Fl5HpjmuLKZPhLJMnvtA14biIn2Z4ll1QORD5FsAFvDZ2fBIcvx4rakbM3PY-S3123yquY51ONXlRsW-plsGAzzcvacmsIE8Ls_ogoQSiSB20JdiMe92ip19QHvGtsue-u02gUuuoQ');
                "
              ></div>
              <div
                class="absolute top-2 right-2 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-bold text-secondary dark:text-white shadow-sm"
              >
                50 Left
              </div>
            </div>
            <h3 class="font-bold text-secondary dark:text-white leading-tight mb-1 text-base">
              Ice Lemon Tea
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Beverage • Cold</p>
            <div class="mt-auto flex items-center justify-between">
              <span class="font-bold text-primary text-lg">Rp 12.000</span>
              <button
                class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-primary text-secondary group-hover:text-secondary flex items-center justify-center transition-colors"
              >
                <span class="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
          </div>
          <div
            class="group bg-surface-light dark:bg-surface-dark rounded-2xl p-3 shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-primary cursor-pointer flex flex-col h-full"
          >
            <div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-100">
              <div
                class="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105 duration-500"
                data-alt="Large serving of french fries"
                style="
                  background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuA1zN8lvxQaWX9namolMb1XjcINLJqWmX1upPQ8PDYm_KdtzupqNewUS0q8SRi5XuUQLVzfH39vjjpwPc_P0tBXzEm1Tz2R7UNMz6vw4ycw2sCRrnBQcX6eju1wK1L0Xo-UfJmxBXDlSalgVg1xThFeLDE9yHQvrhnxrQ-t8KULPAB1U7wxbu5z4Tu9EkJhKhE-N5N--x_GZompq4QN83zRRhiCuyGT9-zt6lVyHeAjjo1kbYdaxRPTGTRJAu0ZDM-eY7ttk8Gx2y6k');
                "
              ></div>
              <div
                class="absolute top-2 right-2 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-bold shadow-sm"
              >
                15 Left
              </div>
            </div>
            <h3 class="font-bold text-secondary dark:text-white leading-tight mb-1 text-base">
              French Fries Large
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Snack • Savory</p>
            <div class="mt-auto flex items-center justify-between">
              <span class="font-bold text-primary text-lg">Rp 22.000</span>
              <button
                class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-primary text-secondary group-hover:text-secondary flex items-center justify-center transition-colors"
              >
                <span class="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
          </div>
          <div
            class="group bg-surface-light dark:bg-surface-dark rounded-2xl p-3 shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-primary cursor-pointer flex flex-col h-full"
          >
            <div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-100">
              <div
                class="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105 duration-500"
                data-alt="Plate of special fried rice"
                style="
                  background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfvD7Xesj9oT1iI2rkW9ThD27Deldw-ryyhTn7Kxyb_ES5JlrMvWerjqa2yPUQfZIezQuTG5lzJLpyVzxLmO64s4vZHgayurM3k2tjMgSi0adi6RuCcfkryFpXReTQvwo09WRgB9PUieQKsp66lEGB8vVtuEPCZh4mDIx0lXDNYFhgvdIAboqqhEYEmcgKdHeK641RgXu5FDgGFAOBa3SGFPnR6zTqyJcLmP-s4yCvJPPZLmXE7BimuYPSf2BAyf808ZRf1fQLaTyj');
                "
              ></div>
              <div
                class="absolute top-2 right-2 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-bold shadow-sm"
              >
                10 Left
              </div>
            </div>
            <h3 class="font-bold text-secondary dark:text-white leading-tight mb-1 text-base">
              Nasi Goreng Special
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Food • Main Course</p>
            <div class="mt-auto flex items-center justify-between">
              <span class="font-bold text-primary text-lg">Rp 35.000</span>
              <button
                class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-primary text-secondary group-hover:text-secondary flex items-center justify-center transition-colors"
              >
                <span class="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
          </div>
          <div
            class="group bg-surface-light dark:bg-surface-dark rounded-2xl p-3 shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-primary cursor-pointer flex flex-col h-full"
          >
            <div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-100">
              <div
                class="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105 duration-500"
                data-alt="Bottle of mineral water"
                style="
                  background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCNmJtjJDYHCrn2fw15uPvCE2EiW4v2uDoXttQIAQf7FzuFdL60ueaei3rrfnmFEacwgYb5puLNnQs8TuxTGlurK86byz4l7w-tPiZYOlqt4tCYIFFnutX6zPb3D2HF0u6rex9NGMXKZ2cM5jlaESMzhY_Wlvypj7quuVBkXs1jMJhBLnPVfRgxzLsuYQm_yundF252WoM0hAyPe8LHHYgabkGzISVSIUCHeQWTZrK-9ipLzEXJjqOK2Rxq_-s5K48UkJJZCBkJ2GkD');
                "
              ></div>
              <div
                class="absolute top-2 right-2 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-bold text-secondary dark:text-white shadow-sm"
              >
                100+ Left
              </div>
            </div>
            <h3 class="font-bold text-secondary dark:text-white leading-tight mb-1 text-base">
              Mineral Water 600ml
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Beverage • Cold</p>
            <div class="mt-auto flex items-center justify-between">
              <span class="font-bold text-primary text-lg">Rp 5.000</span>
              <button
                class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-primary text-secondary group-hover:text-secondary flex items-center justify-center transition-colors"
              >
                <span class="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <aside
      class="w-[420px] overflow-scroll bg-surface-light dark:bg-surface-dark border-l border-border-light dark:border-border-dark flex flex-col z-30 shadow-xl shrink-0"
    >
      <div
        class="p-5 border-b border-border-light dark:border-border-dark flex justify-between items-start"
      >
        <div>
          <h2 class="text-lg font-bold text-secondary dark:text-white">Current Order</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            #ORD-2023-001 • <span class="text-primary font-medium">Dine In</span>
          </p>
        </div>
        <button class="text-gray-400 hover:text-red-500 transition-colors p-1" title="Clear All">
          <span class="material-symbols-outlined">delete_sweep</span>
        </button>
      </div>
      <div class="flex-1 p-4 space-y-3">
        <div
          class="flex items-center gap-3 bg-background-light dark:bg-background-dark p-2 rounded-xl group animate-fade-in-up"
        >
          <div
            class="w-14 h-14 rounded-lg bg-cover bg-center shrink-0"
            data-alt="Small thumbnail of coffee"
            style="
              background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpmo0oYFajPRkPBJzf5X5dnYXIG-BTpwfAwvKtA0v5EI7_Wi-YpJ0LE-GP_QP2p4IUeAaHbMgFQU3sYyGBNYv4FOgJxtc_bZWUNphphADt2KXsb2FRMVvlcj7S4Wm3JFQZ7cgKMsvGRhyvmjz8DrIl7lKuP7iEOMNv3xs0IOtum5P-tG0xahOsOIylN8iiWmTVWUSCWDhAIZS9vZwI5i26v0FAyn2vDNumU7PRCVMiVfuJ1S7u1u8jbxAucDjW1-ZhigpmJlDLXiIz');
            "
          ></div>
          <div class="flex-1 min-w-0">
            <h4 class="font-semibold text-secondary dark:text-white truncate">
              Kopi Susu Gula Aren
            </h4>
            <div class="text-sm text-primary font-medium">Rp 18.000</div>
          </div>
          <div
            class="flex items-center gap-2 bg-white dark:bg-surface-dark rounded-lg p-1 border border-border-light dark:border-border-dark shadow-sm"
          >
            <button
              class="w-6 h-6 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors text-xs"
            >
              <span class="material-symbols-outlined text-[16px]">remove</span>
            </button>
            <span class="w-4 text-center text-sm font-semibold">2</span>
            <button
              class="w-6 h-6 flex items-center justify-center rounded bg-primary text-secondary hover:bg-primary-dark transition-colors text-xs"
            >
              <span class="material-symbols-outlined text-[16px]">add</span>
            </button>
          </div>
        </div>
        <div
          class="flex items-center gap-3 bg-background-light dark:bg-background-dark p-2 rounded-xl group animate-fade-in-up"
          style="animation-delay: 50ms"
        >
          <div
            class="w-14 h-14 rounded-lg bg-cover bg-center shrink-0"
            data-alt="Small thumbnail of toast"
            style="
              background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6vxevxtDqLirl7_TAADTQeju8wSXZVnYsu_a1FRDh4sMyQvBmbiia-V7wEskKhbXHVtNAmbVmHr7Qb4AmJdX3JruItOOn91j1H9iDLTo9ISPFjLWbz0CGsXLJxyNNpfoYFpH9tTNylKFSijQJc7yPdGTjyaMFLStTdOadlRJuPZv_GH4CBE0UxCMBectVaYEbegQ6G0REAAEqLaWZvb5DoQFzfGcJHSCXgxG0E4K6_5zTO5No5dVFDv3Eae6juSU-c1K6yNXV49f9');
            "
          ></div>
          <div class="flex-1 min-w-0">
            <h4 class="font-semibold text-secondary dark:text-white truncate">Roti Bakar Coklat</h4>
            <div class="text-sm text-primary font-medium">Rp 15.000</div>
          </div>
          <div
            class="flex items-center gap-2 bg-white dark:bg-surface-dark rounded-lg p-1 border border-border-light dark:border-border-dark shadow-sm"
          >
            <button
              class="w-6 h-6 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors text-xs"
            >
              <span class="material-symbols-outlined text-[16px]">remove</span>
            </button>
            <span class="w-4 text-center text-sm font-semibold">1</span>
            <button
              class="w-6 h-6 flex items-center justify-center rounded bg-primary text-secondary hover:bg-primary-dark transition-colors text-xs"
            >
              <span class="material-symbols-outlined text-[16px]">add</span>
            </button>
          </div>
        </div>
        <div
          class="flex items-center gap-3 bg-background-light dark:bg-background-dark p-2 rounded-xl group animate-fade-in-up"
          style="animation-delay: 100ms"
        >
          <div
            class="w-14 h-14 rounded-lg bg-cover bg-center shrink-0"
            data-alt="Small thumbnail of water bottle"
            style="
              background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpAx_6wWAISfeQp9rkiBPMPW2PmNyQzfsa7_4-aGlVSRnOtrhtZSFEE8rlGLK0m3X1eCPK6yFaICJgMaCKKdrp6QqZJYEwY9ycZn0VEF8tPaIkeG7db0T-Z2ARxjJI1qs5mD4Jwe_i2NBkELzlcK057zzHpvRluyuihrUXRcT4wiK-3A3D2qk4JXcfiEFFk_iduVWXyUExcpfFVRWHS9Tld5hfMmZF-W1OLbxFWT_l3K-mJS_LmfpxmFP44_qEv17jNAQmkoDH0hdU');
            "
          ></div>
          <div class="flex-1 min-w-0">
            <h4 class="font-semibold text-secondary dark:text-white truncate">
              Mineral Water 600ml
            </h4>
            <div class="text-sm text-primary font-medium">Rp 5.000</div>
          </div>
          <div
            class="flex items-center gap-2 bg-white dark:bg-surface-dark rounded-lg p-1 border border-border-light dark:border-border-dark shadow-sm"
          >
            <button
              class="w-6 h-6 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors text-xs"
            >
              <span class="material-symbols-outlined text-[16px]">remove</span>
            </button>
            <span class="w-4 text-center text-sm font-semibold">1</span>
            <button
              class="w-6 h-6 flex items-center justify-center rounded bg-primary text-secondary hover:bg-primary-dark transition-colors text-xs"
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
            <span class="font-medium text-secondary dark:text-white">Rp 56.000</span>
          </div>
          <div class="flex justify-between text-gray-500 dark:text-gray-400">
            <span>Tax (11%)</span>
            <span class="font-medium text-secondary dark:text-white">Included</span>
          </div>
          <div class="flex justify-between text-gray-500 dark:text-gray-400">
            <span>Discount</span>
            <span class="font-medium text-green-500">-Rp 0</span>
          </div>
          <div
            class="border-t border-dashed border-gray-300 dark:border-gray-700 my-2 pt-2 flex justify-between items-end"
          >
            <span class="text-base font-bold text-secondary dark:text-white">Total Payable</span>
            <span class="text-2xl font-black text-secondary dark:text-white">Rp 56.000</span>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <button
            class="flex flex-col items-center justify-center p-3 rounded-lg border-2 border-primary bg-primary/10 text-primary font-bold text-sm transition-all shadow-sm"
          >
            <span class="material-symbols-outlined mb-1">payments</span>
            Cash
          </button>
          <button
            class="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-500 dark:text-gray-400 font-medium text-sm hover:border-primary hover:text-primary transition-all"
          >
            <span class="material-symbols-outlined mb-1">qr_code_scanner</span>
            QRIS
          </button>
          <button
            class="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-gray-500 dark:text-gray-400 font-medium text-sm hover:border-primary hover:text-primary transition-all"
          >
            <span class="material-symbols-outlined mb-1">credit_card</span>
            Card
          </button>
        </div>
        <div class="relative">
          <label class="text-xs font-semibold text-gray-500 uppercase mb-1 block"
            >Cash Amount Received</label
          >
          <div
            class="flex items-center bg-background-light dark:bg-background-dark rounded-lg border border-gray-200 dark:border-gray-700 px-3 h-12 focus-within:ring-2 ring-primary transition-all"
          >
            <span class="text-gray-500 font-semibold mr-2">Rp</span>
            <input
              class="w-full bg-transparent border-none text-lg font-bold p-0 focus:ring-0 text-secondary dark:text-white placeholder:text-gray-300"
              placeholder="0"
              type="number"
              value="60000"
            />
          </div>
          <div class="flex gap-2 mt-2 overflow-x-auto pb-1">
            <button
              class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-primary/20 hover:text-primary whitespace-nowrap"
            >
              Exact
            </button>
            <button
              class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-primary/20 hover:text-primary whitespace-nowrap"
            >
              60.000
            </button>
            <button
              class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-primary/20 hover:text-primary whitespace-nowrap"
            >
              100.000
            </button>
          </div>
        </div>
        <div
          class="flex justify-between items-center bg-green-50 dark:bg-green-900/20 p-2 rounded-lg border border-green-100 dark:border-green-800/30"
        >
          <span class="text-sm text-green-700 dark:text-green-400 font-medium">Change Due:</span>
          <span class="text-lg font-bold text-green-700 dark:text-green-400">Rp 4.000</span>
        </div>
        <button
          class="w-full bg-primary hover:bg-primary-dark text-secondary font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-green-200 dark:shadow-none hover:shadow-green-300 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span class="material-symbols-outlined">check_circle</span>
          Complete Payment
        </button>
      </div>
    </aside>
  </div>
</template>
