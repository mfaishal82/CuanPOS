<script setup>
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import { ref } from 'vue';

const showQuickAdd = ref(false)

const toggleQuickAdd = ()=> {
  showQuickAdd.value = !showQuickAdd.value

  // console.log(showQuickAdd.value)
}

</script>

<template>
  <div class="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-6">
    <div class="max-w-full mx-auto flex flex-col gap-5">
      <div class="flex flex-col gap-0.5">
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Streamlined Inventory Intake
        </h1>
        <p class="text-slate-500 dark:text-slate-400 text-sm">
          Efficiently add new purchases to your inventory.
        </p>
      </div>
      <div
        class="w-full bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-4 order-last md:order-first"
      >
        <div class="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div class="flex items-center gap-3 w-full sm:w-auto">
            <div
              class="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400"
            >
              <span class="material-symbols-outlined text-[20px]">payments</span>
            </div>
            <div>
              <p
                class="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider"
              >
                Total Purchases
              </p>
              <p class="text-lg font-bold text-slate-900 dark:text-white mt-0.5">Rp 45.2M</p>
            </div>
          </div>
          <div
            class="h-px w-full sm:h-12 sm:w-px bg-slate-200 dark:bg-slate-700 mx-0 sm:mx-4"
          ></div>
          <div class="flex items-center gap-3 w-full sm:w-auto">
            <div
              class="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600 dark:text-amber-400"
            >
              <span class="material-symbols-outlined text-[20px]">pending_actions</span>
            </div>
            <div>
              <p
                class="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider"
              >
                Pending Orders
              </p>
              <p class="text-lg font-bold text-slate-900 dark:text-white mt-0.5">3 Orders</p>
            </div>
          </div>
          <div
            class="h-px w-full sm:h-12 sm:w-px bg-slate-200 dark:bg-slate-700 mx-0 sm:mx-4"
          ></div>
          <div class="flex items-center gap-3 w-full sm:w-auto">
            <div
              class="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400"
            >
              <span class="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div>
              <p
                class="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-semibold tracking-wider"
              >
                Active Suppliers
              </p>
              <p class="text-lg font-bold text-slate-900 dark:text-white mt-0.5">12 Active</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick add purchase form -->
      <div
        :class="!showQuickAdd ? 'md:p-3' : 'md:p-8' "
        class="w-full bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-6"
      >
        <div
          type="button"
          @click="toggleQuickAdd"
          :class="!showQuickAdd ? 'mb-1 pb-1' : 'mb-6 pb-4' "
          class="flex cursor-pointer items-center gap-2 border-b border-slate-100 dark:border-slate-800"
        >
          <span class="material-symbols-outlined text-primary text-2xl">
            {{ showQuickAdd ? 'remove_circle' : 'add_circle' }}
          </span>
          <h3 class="text-lg font-bold text-slate-800 dark:text-white tracking-wide">
            {{ showQuickAdd ? 'Hide Purchase Form' : 'Quick Add New Purchase' }}
          </h3>
        </div>
        <TransitionRoot
          as="template"
          :show="showQuickAdd"
        >
          <TransitionChild
            as="template"
            enter="transition duration-300 ease-out"
            enter-from="opacity-0 -translate-y-2"
            enter-to="opacity-100 translate-y-0"
            leave="transition duration-200 ease-in"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 -translate-y-2"
          >
          <form :show="showQuickAdd" class="flex flex-col gap-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div class="flex-1">
                <label
                  class="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2"
                  for="purchase-date"
                  >Purchase Date <span class="text-red-500">*</span></label
                >
                <div class="relative">
                  <input
                    class="block w-full text-base text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:ring-primary dark:focus:border-primary py-3 px-4"
                    id="purchase-date"
                    required=""
                    type="date"
                  />
                </div>
              </div>
              <div class="flex-1">
                <label
                  class="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2"
                  for="invoice-number"
                  >Supplier Invoice (Optional)</label
                >
                <input
                  class="block w-full text-base text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:border-slate-700 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary py-3 px-4"
                  id="invoice-number"
                  placeholder="e.g., INV-XXXX-YY"
                  type="text"
                />
              </div>
              <div class="flex-1">
                <label
                  class="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2"
                  for="purchase-status"
                  >Status</label
                >
                <select
                  class="block w-full text-base text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:ring-primary dark:focus:border-primary py-3 px-4"
                  id="purchase-status"
                >
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div class="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div
                class="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 border-b border-slate-200 dark:border-slate-700"
              >
                <h4 class="text-sm font-bold text-slate-700 dark:text-slate-300">Purchase Items</h4>
              </div>
              <div class="p-5 bg-white dark:bg-surface-dark">
                <div
                  class="hidden sm:grid grid-cols-12 gap-4 mb-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                >
                  <div class="col-span-5">Product</div>
                  <div class="col-span-2">Qty</div>
                  <div class="col-span-3">Cost Price</div>
                  <div class="col-span-2 text-right">Subtotal</div>
                </div>
                <div class="flex flex-col gap-4" id="purchase-items-container">
                  <div
                    class="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center group relative"
                  >
                    <div class="col-span-5">
                      <label class="sm:hidden text-xs text-slate-500 mb-1 block">Product</label>
                      <select
                        class="block w-full text-base text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white py-3 px-4"
                      >
                        <option>Samsung Monitor 24"</option>
                        <option>Logitech MX Master 3</option>
                        <option>Keychron K2 Pro</option>
                      </select>
                    </div>
                    <div class="col-span-2">
                      <label class="sm:hidden text-xs text-slate-500 mb-1 block">Qty</label>
                      <input
                        class="block w-full text-base text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white py-3 px-4"
                        min="1"
                        type="number"
                        value="2"
                      />
                    </div>
                    <div class="col-span-3">
                      <label class="sm:hidden text-xs text-slate-500 mb-1 block">Cost Price</label>
                      <div class="relative">
                        <span
                          class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base"
                          >Rp</span
                        >
                        <input
                          class="block w-full text-base text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white py-3 pl-10 pr-4"
                          type="number"
                          value="2500000"
                        />
                      </div>
                    </div>
                    <div class="col-span-2 flex items-center justify-between sm:justify-end gap-3">
                      <span class="text-base font-semibold text-slate-900 dark:text-white"
                        >Rp 5.000.000</span
                      >
                      <button
                        class="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                        type="button"
                      >
                        <span class="material-symbols-outlined text-[20px]">close</span>
                      </button>
                    </div>
                  </div>
                  <div
                    class="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center group relative"
                  >
                    <div class="col-span-5">
                      <label class="sm:hidden text-xs text-slate-500 mb-1 block">Product</label>
                      <select
                        class="block w-full text-base text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white py-3 px-4"
                      >
                        <option selected="">Logitech MX Master 3</option>
                        <option>Samsung Monitor 24"</option>
                        <option>Keychron K2 Pro</option>
                      </select>
                    </div>
                    <div class="col-span-2">
                      <label class="sm:hidden text-xs text-slate-500 mb-1 block">Qty</label>
                      <input
                        class="block w-full text-base text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white py-3 px-4"
                        min="1"
                        type="number"
                        value="1"
                      />
                    </div>
                    <div class="col-span-3">
                      <label class="sm:hidden text-xs text-slate-500 mb-1 block">Cost Price</label>
                      <div class="relative">
                        <span
                          class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base"
                          >Rp</span
                        >
                        <input
                          class="block w-full text-base text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:ring-primary focus:border-primary dark:bg-slate-800 dark:border-slate-700 dark:text-white py-3 pl-10 pr-4"
                          type="number"
                          value="1450000"
                        />
                      </div>
                    </div>
                    <div class="col-span-2 flex items-center justify-between sm:justify-end gap-3">
                      <span class="text-base font-semibold text-slate-900 dark:text-white"
                        >Rp 1.450.000</span
                      >
                      <button
                        class="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                        type="button"
                      >
                        <span class="material-symbols-outlined text-[20px]">close</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5"
                >
                  <button
                    class="text-base font-semibold text-primary hover:text-primary-dark flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors w-full sm:w-auto justify-center sm:justify-start"
                    type="button"
                  >
                    <span class="material-symbols-outlined text-[20px]">add</span> Add Item
                  </button>
                  <div
                    class="flex items-center gap-5 text-lg w-full sm:w-auto justify-between sm:justify-end"
                  >
                    <span class="text-slate-600 dark:text-slate-300">Total Amount:</span>
                    <span class="text-2xl font-bold text-slate-900 dark:text-white"
                      >Rp 6.450.000</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-end pt-3">
              <button
                class="w-full sm:w-auto bg-primary hover:bg-primary-dark text-slate-900 font-bold text-base py-3 px-8 rounded-xl transition-colors shadow-md shadow-primary/20 flex items-center justify-center gap-2 h-12"
                type="submit"
              >
                <span class="material-symbols-outlined text-[22px]">check_circle</span>
                <span>Save Purchase</span>
              </button>
            </div>
          </form>
          </TransitionChild>
        </TransitionRoot>
      </div>
      <!-- End form -->

      <div
        class="bg-surface-light dark:bg-surface-dark rounded-t-xl border border-slate-200 dark:border-slate-800 border-b-0 p-3 flex flex-wrap items-center gap-2 shadow-sm relative z-10"
      >
        <div class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mr-2">
          <span class="material-symbols-outlined text-[18px]">filter_list</span>
          <span class="text-xs font-bold uppercase tracking-wider">Filter By:</span>
        </div>
        <div class="relative group">
          <button
            class="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
          >
            <span class="material-symbols-outlined text-[16px]">calendar_month</span>
            <span>Date Range</span>
            <span class="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
          <div
            class="absolute z-10 hidden group-hover:block w-48 bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg mt-1"
          >
            <div class="p-2 text-xs text-slate-700 dark:text-slate-300">
              <label
                class="flex items-center gap-2 p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md cursor-pointer"
              >
                <input
                  checked=""
                  class="form-checkbox size-3.5 text-primary rounded border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-primary"
                  type="checkbox"
                />
                Last 7 days
              </label>
              <label
                class="flex items-center gap-2 p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md cursor-pointer"
              >
                <input
                  class="form-checkbox size-3.5 text-primary rounded border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-primary"
                  type="checkbox"
                />
                Last 30 days
              </label>
              <label
                class="flex items-center gap-2 p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md cursor-pointer"
              >
                <input
                  class="form-checkbox size-3.5 text-primary rounded border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-primary"
                  type="checkbox"
                />
                This Quarter
              </label>
            </div>
          </div>
        </div>
        <div class="relative group">
          <button
            class="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
          >
            <span class="material-symbols-outlined text-[16px]">local_shipping</span>
            <span>Supplier</span>
            <span class="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
          <div
            class="absolute z-10 hidden group-hover:block w-48 bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg mt-1"
          >
            <div class="p-2 text-xs text-slate-700 dark:text-slate-300">
              <label
                class="flex items-center gap-2 p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md cursor-pointer"
              >
                <input
                  checked=""
                  class="form-checkbox size-3.5 text-primary rounded border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-primary"
                  type="checkbox"
                />
                Mitra Abadi
              </label>
              <label
                class="flex items-center gap-2 p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md cursor-pointer"
              >
                <input
                  class="form-checkbox size-3.5 text-primary rounded border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-primary"
                  type="checkbox"
                />
                Toko Jaya
              </label>
              <label
                class="flex items-center gap-2 p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md cursor-pointer"
              >
                <input
                  class="form-checkbox size-3.5 text-primary rounded border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-primary"
                  type="checkbox"
                />
                Supplier A
              </label>
            </div>
          </div>
        </div>
        <div class="relative group">
          <button
            class="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
          >
            <span class="material-symbols-outlined text-[16px]">list_alt</span>
            <span>Status</span>
            <span class="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
          <div
            class="absolute z-10 hidden group-hover:block w-48 bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg mt-1"
          >
            <div class="p-2 text-xs text-slate-700 dark:text-slate-300">
              <label
                class="flex items-center gap-2 p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md cursor-pointer"
              >
                <input
                  checked=""
                  class="form-checkbox size-3.5 text-primary rounded border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-primary"
                  type="checkbox"
                />
                Completed
              </label>
              <label
                class="flex items-center gap-2 p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md cursor-pointer"
              >
                <input
                  class="form-checkbox size-3.5 text-primary rounded border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-primary"
                  type="checkbox"
                />
                Draft
              </label>
              <label
                class="flex items-center gap-2 p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md cursor-pointer"
              >
                <input
                  class="form-checkbox size-3.5 text-primary rounded border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-primary"
                  type="checkbox"
                />
                Cancelled
              </label>
            </div>
          </div>
        </div>
        <div class="h-5 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>
        <div class="relative group">
          <button
            class="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
          >
            <span class="material-symbols-outlined text-[16px]">sort</span>
            <span>Sort By</span>
            <span class="material-symbols-outlined text-[14px]">expand_more</span>
          </button>
          <div
            class="absolute right-0 z-10 hidden group-hover:block w-48 bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg mt-1"
          >
            <div class="p-2 text-xs text-slate-700 dark:text-slate-300">
              <a class="block p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md" href="#"
                >Date (Newest)</a
              >
              <a class="block p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md" href="#"
                >Total Cost (High to Low)</a
              >
              <a class="block p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md" href="#"
                >Supplier (A-Z)</a
              >
            </div>
          </div>
        </div>
        <button
          class="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <span class="material-symbols-outlined text-[16px]">download</span>
          Export Data
        </button>
      </div>
      <div
        class="bg-surface-light dark:bg-surface-dark rounded-b-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col -mt-px"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr
                class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700"
              >
                <th
                  class="px-3 py-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-[120px]"
                >
                  Date
                </th>
                <th
                  class="px-3 py-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-[100px]"
                >
                  Invoice
                </th>
                <th
                  class="px-3 py-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                >
                  Supplier
                </th>
                <th
                  class="px-3 py-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-[140px] text-right"
                >
                  Total Cost
                </th>
                <th
                  class="px-3 py-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-[120px]"
                >
                  Payment Due
                </th>
                <th
                  class="px-3 py-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-[100px]"
                >
                  Status
                </th>
                <th
                  class="px-3 py-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right w-[80px]"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                <td class="px-3 py-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  Oct 24, 2023 <span class="text-slate-400 ml-1">10:45</span>
                </td>
                <td class="px-3 py-2 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                  <span class="font-mono text-[11px]">INV-001</span>
                </td>
                <td class="px-3 py-2 text-slate-700 dark:text-slate-200 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <div
                      class="size-4 rounded bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 flex items-center justify-center text-[9px] font-bold"
                    >
                      M
                    </div>
                    Mitra Abadi
                  </div>
                </td>
                <td
                  class="px-3 py-2 font-semibold text-slate-900 dark:text-white whitespace-nowrap text-right"
                >
                  Rp 5.000.000
                </td>
                <td
                  class="px-3 py-2 text-slate-600 dark:text-slate-300 whitespace-nowrap font-medium text-red-600 dark:text-red-400"
                >
                  <span class="flex items-center gap-1"
                    ><span class="material-symbols-outlined text-[14px]">warning</span> Nov 24</span
                  >
                </td>
                <td class="px-3 py-2 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900"
                  >
                    Completed
                  </span>
                </td>
                <td class="px-3 py-2 text-right whitespace-nowrap">
                  <button
                    class="text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary transition-colors"
                  >
                    <span class="material-symbols-outlined text-[18px]">more_horiz</span>
                  </button>
                </td>
              </tr>
              <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                <td class="px-3 py-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  Oct 23, 2023 <span class="text-slate-400 ml-1">14:15</span>
                </td>
                <td class="px-3 py-2 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                  <span class="font-mono text-[11px]">INV-002</span>
                </td>
                <td class="px-3 py-2 text-slate-700 dark:text-slate-200 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <div
                      class="size-4 rounded bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center text-[9px] font-bold"
                    >
                      T
                    </div>
                    Toko Jaya
                  </div>
                </td>
                <td
                  class="px-3 py-2 font-semibold text-slate-900 dark:text-white whitespace-nowrap text-right"
                >
                  Rp 1.200.000
                </td>
                <td class="px-3 py-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  Nov 23, 2023
                </td>
                <td class="px-3 py-2 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                  >
                    Draft
                  </span>
                </td>
                <td class="px-3 py-2 text-right whitespace-nowrap">
                  <button
                    class="text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary transition-colors"
                  >
                    <span class="material-symbols-outlined text-[18px]">more_horiz</span>
                  </button>
                </td>
              </tr>
              <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                <td class="px-3 py-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  Oct 20, 2023 <span class="text-slate-400 ml-1">09:00</span>
                </td>
                <td class="px-3 py-2 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                  <span class="font-mono text-[11px]">INV-003</span>
                </td>
                <td class="px-3 py-2 text-slate-700 dark:text-slate-200 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <div
                      class="size-4 rounded bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 flex items-center justify-center text-[9px] font-bold"
                    >
                      S
                    </div>
                    Supplier A
                  </div>
                </td>
                <td
                  class="px-3 py-2 font-semibold text-slate-900 dark:text-white whitespace-nowrap text-right"
                >
                  Rp 3.500.000
                </td>
                <td class="px-3 py-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  Nov 20, 2023
                </td>
                <td class="px-3 py-2 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-900"
                  >
                    Cancelled
                  </span>
                </td>
                <td class="px-3 py-2 text-right whitespace-nowrap">
                  <button
                    class="text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary transition-colors"
                  >
                    <span class="material-symbols-outlined text-[18px]">more_horiz</span>
                  </button>
                </td>
              </tr>
              <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                <td class="px-3 py-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  Oct 18, 2023 <span class="text-slate-400 ml-1">11:30</span>
                </td>
                <td class="px-3 py-2 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                  <span class="font-mono text-[11px]">INV-004</span>
                </td>
                <td class="px-3 py-2 text-slate-700 dark:text-slate-200 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <div
                      class="size-4 rounded bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 flex items-center justify-center text-[9px] font-bold"
                    >
                      G
                    </div>
                    Gudang Sejahtera
                  </div>
                </td>
                <td
                  class="px-3 py-2 font-semibold text-slate-900 dark:text-white whitespace-nowrap text-right"
                >
                  Rp 8.750.000
                </td>
                <td class="px-3 py-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  Nov 18, 2023
                </td>
                <td class="px-3 py-2 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900"
                  >
                    Completed
                  </span>
                </td>
                <td class="px-3 py-2 text-right whitespace-nowrap">
                  <button
                    class="text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary transition-colors"
                  >
                    <span class="material-symbols-outlined text-[18px]">more_horiz</span>
                  </button>
                </td>
              </tr>
              <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                <td class="px-3 py-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  Oct 15, 2023 <span class="text-slate-400 ml-1">16:20</span>
                </td>
                <td class="px-3 py-2 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                  <span class="font-mono text-[11px]">INV-005</span>
                </td>
                <td class="px-3 py-2 text-slate-700 dark:text-slate-200 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <div
                      class="size-4 rounded bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400 flex items-center justify-center text-[9px] font-bold"
                    >
                      E
                    </div>
                    Electronic Solutions
                  </div>
                </td>
                <td
                  class="px-3 py-2 font-semibold text-slate-900 dark:text-white whitespace-nowrap text-right"
                >
                  Rp 12.000.000
                </td>
                <td class="px-3 py-2 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  Nov 15, 2023
                </td>
                <td class="px-3 py-2 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900"
                  >
                    Completed
                  </span>
                </td>
                <td class="px-3 py-2 text-right whitespace-nowrap">
                  <button
                    class="text-slate-400 hover:text-primary dark:text-slate-500 dark:hover:text-primary transition-colors"
                  >
                    <span class="material-symbols-outlined text-[18px]">more_horiz</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 px-4 py-2 bg-slate-50 dark:bg-slate-800/30"
        >
          <div class="text-xs text-slate-500 dark:text-slate-400">
            Showing <span class="font-bold text-slate-900 dark:text-white">1-5</span> of
            <span class="font-bold text-slate-900 dark:text-white">24</span> records
          </div>
          <div class="flex items-center gap-1">
            <button
              class="p-1.5 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-200 dark:hover:bg-slate-700 dark:hover:text-white disabled:opacity-50 transition-colors"
            >
              <span class="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button
              class="w-6 h-6 flex items-center justify-center rounded-md bg-primary text-slate-900 font-bold text-xs shadow-sm"
            >
              1
            </button>
            <button
              class="w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs transition-colors"
            >
              2
            </button>
            <span class="text-slate-400 px-1 text-xs">...</span>
            <button
              class="w-6 h-6 flex items-center justify-center rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs transition-colors"
            >
              5
            </button>
            <button
              class="p-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-200 dark:hover:bg-slate-700 dark:hover:text-white transition-colors"
            >
              <span class="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
