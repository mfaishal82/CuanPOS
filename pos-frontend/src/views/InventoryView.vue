<template>
  <div class="flex h-screen w-full">
    <main class="flex-1 flex flex-col h-full overflow-hidden relative">
      <div
        class="lg:hidden flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800"
      >
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">point_of_sale</span>
          <span class="font-bold">CuanPOS</span>
        </div>
        <button class="p-2 text-gray-600 dark:text-gray-300">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-4 md:p-8">
        <div class="mx-auto max-w-7xl flex flex-col gap-6">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div class="flex flex-col gap-1">
              <h2 class="text-3xl font-black tracking-tight text-text-main dark:text-white">
                Inventory Management
              </h2>
              <p class="text-text-secondary dark:text-gray-400">
                Track stock, manage suppliers, and monitor product movements.
              </p>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <button
                class="flex items-center gap-2 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-semibold text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
              >
                <span class="material-symbols-outlined text-[20px] text-red-500">remove</span>
                Record Sale
              </button>
              <button
                class="flex items-center gap-2 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-semibold text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
              >
                <span class="material-symbols-outlined text-[20px] text-primary">add</span>
                Record Purchase
              </button>
              <button
                class="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-background-dark hover:bg-primary-dark transition-colors shadow-md shadow-primary/20"
              >
                <span class="material-symbols-outlined text-[20px]">add_box</span>
                New Product
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              class="flex flex-col gap-1 rounded-xl bg-surface-light dark:bg-surface-dark p-5 border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-text-secondary dark:text-gray-400">
                  Total Products
                </p>
                <div
                  class="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                >
                  <span class="material-symbols-outlined text-lg">inventory_2</span>
                </div>
              </div>
              <p class="text-2xl font-bold text-text-main dark:text-white mt-2">1,240</p>
              <div class="flex items-center gap-1 text-xs font-medium text-primary">
                <span class="material-symbols-outlined text-sm">trending_up</span>
                <span>+2.4% this month</span>
              </div>
            </div>
            <div
              class="flex flex-col gap-1 rounded-xl bg-surface-light dark:bg-surface-dark p-5 border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-text-secondary dark:text-gray-400">
                  Low Stock Alerts
                </p>
                <div
                  class="h-8 w-8 flex items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                >
                  <span class="material-symbols-outlined text-lg">warning</span>
                </div>
              </div>
              <p class="text-2xl font-bold text-text-main dark:text-white mt-2">5</p>
              <div class="flex items-center gap-1 text-xs font-medium text-amber-600">
                <span>Needs attention</span>
              </div>
            </div>
            <div
              class="flex flex-col gap-1 rounded-xl bg-surface-light dark:bg-surface-dark p-5 border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-text-secondary dark:text-gray-400">
                  Incoming Orders
                </p>
                <div
                  class="h-8 w-8 flex items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                >
                  <span class="material-symbols-outlined text-lg">local_shipping</span>
                </div>
              </div>
              <p class="text-2xl font-bold text-text-main dark:text-white mt-2">12</p>
              <div class="flex items-center gap-1 text-xs font-medium text-text-secondary">
                <span>Processing</span>
              </div>
            </div>
            <div
              class="flex flex-col gap-1 rounded-xl bg-surface-light dark:bg-surface-dark p-5 border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-text-secondary dark:text-gray-400">
                  Inventory Value
                </p>
                <div
                  class="h-8 w-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary-dark dark:text-primary"
                >
                  <span class="material-symbols-outlined text-lg">attach_money</span>
                </div>
              </div>
              <p class="text-2xl font-bold text-text-main dark:text-white mt-2">$42,500</p>
              <div class="flex items-center gap-1 text-xs font-medium text-text-secondary">
                <span>Updated just now</span>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark shadow-sm overflow-hidden"
          >
            <div
              class="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-gray-100 dark:border-gray-800"
            >
              <div class="relative w-full md:max-w-md">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span class="material-symbols-outlined text-gray-400 text-xl">search</span>
                </div>
                <input
                  class="block w-full rounded-lg border-none bg-gray-50 dark:bg-gray-800/50 py-2.5 pl-10 pr-4 text-sm text-text-main dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-800 transition-all"
                  placeholder="Search by SKU, Product Name, or Invoice #"
                  type="text"
                />
              </div>
              <div
                class="flex w-full md:w-auto items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar"
              >
                <button
                  class="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap"
                >
                  <span class="material-symbols-outlined text-lg">filter_list</span>
                  Filter
                </button>
                <div class="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>
                <button
                  class="rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary-dark dark:text-primary whitespace-nowrap"
                >
                  All Items
                </button>
                <button
                  class="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-text-main dark:hover:text-white whitespace-nowrap"
                >
                  Low Stock
                </button>
                <button
                  class="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-text-main dark:hover:text-white whitespace-nowrap"
                >
                  Out of Stock
                </button>
                <button
                  class="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-text-main dark:hover:text-white whitespace-nowrap"
                >
                  Recent Movers
                </button>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead
                  class="bg-gray-50/50 dark:bg-gray-800/30 text-xs uppercase text-gray-500 dark:text-gray-400"
                >
                  <tr>
                    <th class="px-6 py-4 font-semibold" scope="col">Product Name</th>
                    <th class="px-6 py-4 font-semibold" scope="col">SKU / Code</th>
                    <th class="px-6 py-4 font-semibold" scope="col">Category</th>
                    <th class="px-6 py-4 font-semibold" scope="col">Stock</th>
                    <th class="px-6 py-4 font-semibold" scope="col">Price (Buy/Sell)</th>
                    <th class="px-6 py-4 font-semibold" scope="col">Status</th>
                    <th class="px-6 py-4 font-semibold text-right" scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                  <tr class="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div
                          class="h-10 w-10 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden"
                        >
                          <img
                            class="h-full w-full object-cover"
                            data-alt="White modern smartwatch"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxBFwXmN2znwjXwGed9PzEEAm_BmD_a3fcjr15IwgW9foa01zDa6YChKdV8VTd-FRAdWld4E9pfnzFk7jrKLdIjnHNnc07dItNHL7GGiuZY3dlumrxwHmx0wouiTBYiM3YCqOoelrgW34IBr9KwEbH3iHN2WwB5iK7unwh2bqi8PdwQYK3ZnXLYNXuSMnjTpZt7EvdHl0aJDBmlLOT4UpCCImeibnAP4J58hFBw0znB3iLR3f01LKEsy7as7yjnsruy69XbLItRqag"
                          />
                        </div>
                        <div class="flex flex-col">
                          <span class="font-medium text-text-main dark:text-white"
                            >Smart Watch Series 7</span
                          >
                          <span class="text-xs text-gray-500">Updated: Today, 10:23 AM</span>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">
                      SW-2023-001
                    </td>
                    <td class="px-6 py-4 text-gray-600 dark:text-gray-400">Electronics</td>
                    <td class="px-6 py-4">
                      <div class="flex flex-col">
                        <span class="font-medium text-text-main dark:text-white">45</span>
                        <span class="text-xs text-green-600">+12 incoming</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex flex-col">
                        <span class="font-medium text-text-main dark:text-white">$299.00</span>
                        <span class="text-xs text-gray-400">Buy: $180.00</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-900/20 px-2.5 py-1 text-xs font-medium text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                      >
                        <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                        In Stock
                      </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div
                        class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <button
                          class="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-text-main transition-colors"
                        >
                          <span class="material-symbols-outlined text-[20px]">history</span>
                        </button>
                        <button
                          class="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition-colors"
                        >
                          <span class="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr class="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div
                          class="h-10 w-10 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden"
                        >
                          <img
                            class="h-full w-full object-cover"
                            data-alt="Headphones"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7RMeov86gr3Cl5iarN-CiWkVhdecxMfLLAnBCi0SSxFf7_DJqLRSJC_gpathckjijhHvcsOVLjyav2hI91wy9l5x5aoSi0uBpTiur6qWOFR55-Bhu3VX9-3VfH4ud6j5YdW0R8eEvH6Jp5hc4EsPW0aDyePhVCZUzcCe3WRcQRDeeS8mTsj-DhVdGTzD9-yg9ex9Xx7rn34ADP0UsW9uxxvY8armoLA-6R2V1KdlscogaQZVT_0yFqJp5i92JBRuwSV-7VUoS450h"
                          />
                        </div>
                        <div class="flex flex-col">
                          <span class="font-medium text-text-main dark:text-white"
                            >Wireless Headphones</span
                          >
                          <span class="text-xs text-gray-500">Updated: Yesterday</span>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">WH-BT-500</td>
                    <td class="px-6 py-4 text-gray-600 dark:text-gray-400">Accessories</td>
                    <td class="px-6 py-4">
                      <div class="flex flex-col">
                        <span class="font-medium text-text-main dark:text-white">5</span>
                        <span class="text-xs text-amber-600">Reorder point: 10</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex flex-col">
                        <span class="font-medium text-text-main dark:text-white">$120.00</span>
                        <span class="text-xs text-gray-400">Buy: $65.00</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                      >
                        <span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                        Low Stock
                      </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div
                        class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <button
                          class="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-text-main transition-colors"
                        >
                          <span class="material-symbols-outlined text-[20px]">history</span>
                        </button>
                        <button
                          class="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition-colors"
                        >
                          <span class="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr class="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div
                          class="h-10 w-10 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden"
                        >
                          <img
                            class="h-full w-full object-cover"
                            data-alt="Red sport sneaker"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgzpZW3YqRXmJxFHl4Vv0Ya0LvClUspNapujHQOSUpa6QNx52cp-sVNSiK6XgN0UR-1c5lB22JSv4wenyL-LZvrox_qvNvmdmSoy5QC9Ax5AMkOnl__SFMKaZuf6e5GIR5kKnyAmfCDxreKHhxkGKTcgdU-u9aJXltxgHFGaytTmKYSZtco2RAU8FDVE0_-WrtZEFhdHW4nMfwGtSUMKPfphCzjfj7u3fTFIOdlxoTIyT5YG3B9zzsojABnR91LzLEJGP1ewJ9_z6r"
                          />
                        </div>
                        <div class="flex flex-col">
                          <span class="font-medium text-text-main dark:text-white"
                            >Sport Sneakers Red</span
                          >
                          <span class="text-xs text-gray-500">Updated: 2 days ago</span>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">SNK-RD-42</td>
                    <td class="px-6 py-4 text-gray-600 dark:text-gray-400">Footwear</td>
                    <td class="px-6 py-4">
                      <div class="flex flex-col">
                        <span class="font-medium text-text-main dark:text-white">128</span>
                        <span class="text-xs text-gray-400">-</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex flex-col">
                        <span class="font-medium text-text-main dark:text-white">$89.99</span>
                        <span class="text-xs text-gray-400">Buy: $45.00</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-900/20 px-2.5 py-1 text-xs font-medium text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                      >
                        <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                        In Stock
                      </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div
                        class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <button
                          class="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-text-main transition-colors"
                        >
                          <span class="material-symbols-outlined text-[20px]">history</span>
                        </button>
                        <button
                          class="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition-colors"
                        >
                          <span class="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr class="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div
                          class="h-10 w-10 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden"
                        >
                          <img
                            class="h-full w-full object-cover"
                            data-alt="Brown leather bag"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZj3WmnBCITxOJhZ4gRF25LO5oHgT8F0Bp9JtH4YD01myddZSbLbrR1wQtqAlDvn0S2CWp31umqGRT624phCuuT1YECLRz1pAUFLOK8Up7tyRe1ZjAsHdylaZRRnaBL2tujfw513R971Oln8vB-kQ2oHSekRMX8e4OnMZmYCJSk1-ashoMcqXZQZQddyA4wNt65EcwbIlIkdhsFZWCTTtuUU4-3H9w0rljlIYzuyFjidliTjSIYDzEZePqlJkkFpCbxh20iQo2s2Jz"
                          />
                        </div>
                        <div class="flex flex-col">
                          <span class="font-medium text-text-main dark:text-white"
                            >Classic Leather Bag</span
                          >
                          <span class="text-xs text-gray-500">Updated: Oct 24, 2023</span>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">LB-BR-001</td>
                    <td class="px-6 py-4 text-gray-600 dark:text-gray-400">Accessories</td>
                    <td class="px-6 py-4">
                      <div class="flex flex-col">
                        <span class="font-medium text-text-main dark:text-white">0</span>
                        <span class="text-xs text-red-500">No incoming</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex flex-col">
                        <span class="font-medium text-text-main dark:text-white">$159.00</span>
                        <span class="text-xs text-gray-400">Buy: $90.00</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center gap-1 rounded-full bg-red-50 dark:bg-red-900/20 px-2.5 py-1 text-xs font-medium text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                      >
                        <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                        Out of Stock
                      </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div
                        class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <button
                          class="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-text-main transition-colors"
                        >
                          <span class="material-symbols-outlined text-[20px]">history</span>
                        </button>
                        <button
                          class="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition-colors"
                        >
                          <span class="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr class="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div
                          class="h-10 w-10 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden"
                        >
                          <img
                            class="h-full w-full object-cover"
                            data-alt="Blue canvas shoes"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgRu2myL9ijonemIJRheAjENDMveW13XTWJJimutiXv7b9nYsp58L8N2E4cqYCT3DRNcc8CELcZrh-50ErrplVy9WekOsK_TQ015k_l9sb2yc6nxqFCLv22v7QJYwpwChihQWupQ-dfsyj3ek-ZOu050VvtqRW-D8NSFXczAipGYfpoqyPUJp6oGzRHFI10vjWV7SjyPfQNR9tnRwW3nrpahomOySwUNe1JLRmsY8DYGjRcWcPeJ51L7JRpIL31vqGPqTRPD9-Jbjc"
                          />
                        </div>
                        <div class="flex flex-col">
                          <span class="font-medium text-text-main dark:text-white"
                            >Canvas Shoes Blue</span
                          >
                          <span class="text-xs text-gray-500">Updated: Just now</span>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">CNV-BL-39</td>
                    <td class="px-6 py-4 text-gray-600 dark:text-gray-400">Footwear</td>
                    <td class="px-6 py-4">
                      <div class="flex flex-col">
                        <span class="font-medium text-text-main dark:text-white">82</span>
                        <span class="text-xs text-gray-400">-</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex flex-col">
                        <span class="font-medium text-text-main dark:text-white">$45.00</span>
                        <span class="text-xs text-gray-400">Buy: $20.00</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-900/20 px-2.5 py-1 text-xs font-medium text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                      >
                        <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                        In Stock
                      </span>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div
                        class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <button
                          class="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-text-main transition-colors"
                        >
                          <span class="material-symbols-outlined text-[20px]">history</span>
                        </button>
                        <button
                          class="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary transition-colors"
                        >
                          <span class="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-100 dark:border-gray-800 p-4 bg-gray-50/50 dark:bg-gray-800/30"
            >
              <span class="text-sm text-gray-500 dark:text-gray-400"
                >Showing <span class="font-medium text-text-main dark:text-white">1</span> to
                <span class="font-medium text-text-main dark:text-white">5</span> of
                <span class="font-medium text-text-main dark:text-white">1,240</span>
                results</span
              >
              <div class="flex items-center gap-2">
                <button
                  class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  class="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark px-3 py-1.5 text-sm font-medium text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
