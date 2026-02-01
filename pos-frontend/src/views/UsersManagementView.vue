<template>
  <main class="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark">
    <header
      class="h-12 flex items-center justify-between px-6 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10"
    >
      <div class="flex items-center gap-4 flex-1">
        <div class="relative w-full max-w-xs">
          <span
            class="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[16px]"
            >search</span
          >
          <input
            class="w-full bg-slate-50 dark:bg-slate-900 border-none rounded text-xs pl-8 pr-3 py-1.5 focus:ring-1 focus:ring-primary placeholder:text-slate-400 dark:text-white"
            placeholder="Search systems..."
            type="text"
          />
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button
          class="size-8 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
        >
          <span class="material-symbols-outlined !text-[20px]">notifications</span>
        </button>
        <div class="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
        <div class="flex items-center gap-2">
          <div class="text-right hidden sm:block">
            <p class="text-[11px] font-bold leading-none">Budi Santoso</p>
          </div>
          <div
            class="size-7 rounded bg-cover bg-center"
            style="
              background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCjBdI3qU84Rf0slc43fHhgye7Ht67lo3SnKSuGwTQC8aISt5F5NA9thXa99P_TNCBR5DpoDwmfxMG1fg5skYOcePjcCYs6qXKunEEy7SEI2Ksi4j3QQA9ZaymFuHhBLKTEQM3H_3MchjiRm1hW8gCCIC8lVELliOoTLwPeySA6GEOqLDV0-d9BsTiwX-YltRGJLAqcmBI581SSvrjRmuJUxfdi94gKnsiOCpSyulIF3c9P5GXrXwQJd4Xly4EL8B3SIzew3i8zkpAi');
            "
          ></div>
        </div>
      </div>
    </header>
    <div class="p-6">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div class="flex flex-col">
          <h2 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Manage CuanPOS Workforce
          </h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Configure access levels and monitor system operators.
          </p>
        </div>
        <button
          class="bg-primary hover:bg-primary/90 text-slate-900 text-xs font-bold px-4 py-2 rounded flex items-center gap-1.5 transition-all shadow-sm"
        >
          <span class="material-symbols-outlined !font-bold text-[18px]">add</span>
          <span>ADD USER</span>
        </button>
      </div>
      <div
        class="flex items-center gap-2 mb-2 p-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded shadow-sm overflow-x-auto"
      >
        <div class="flex items-center gap-1.5 pr-2 border-r border-slate-200 dark:border-slate-800">
          <span class="material-symbols-outlined text-slate-400 text-[18px]">filter_list</span>
          <span class="text-[10px] font-bold text-slate-500 uppercase">Filters</span>
        </div>
        <select
          class="text-[11px] py-1 pl-2 pr-8 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded focus:ring-primary"
        >
          <option>All Roles</option>
          <option>Admin</option>
          <option>Kasir</option>
        </select>
        <select
          class="text-[11px] py-1 pl-2 pr-8 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded focus:ring-primary"
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <div class="flex-1"></div>
        <div class="flex items-center gap-2">
          <span class="text-[10px] text-slate-500">Sort:</span>
          <select
            class="text-[11px] py-1 pl-2 pr-8 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded focus:ring-primary"
          >
            <option>Recent Activity</option>
            <option>Name A-Z</option>
            <option>ID</option>
          </select>
          <button
            class="size-7 flex items-center justify-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-100"
          >
            <span class="material-symbols-outlined text-[18px]">refresh</span>
          </button>
        </div>
      </div>
      <div
        class="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded shadow-sm"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse data-table">
            <thead>
              <tr>
                <th class="w-10 text-center">ID</th>
                <th>Identity &amp; Workforce Name</th>
                <th>Network ID / Email</th>
                <th class="w-32">Assignment</th>
                <th class="w-28">Operational Status</th>
                <th class="text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td class="text-center font-mono text-[10px] text-slate-400">001</td>
                <td>
                  <div class="flex items-center gap-2">
                    <div
                      class="size-6 rounded bg-cover bg-center border border-slate-200 dark:border-slate-800 flex-shrink-0"
                      style="
                        background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDqM29FWWLzGWiiHgIHP92xEiotlo-WwjhM0zGqY3Tr3-bu2SskJ6_Eb0jBgz7hP41oPQFAB7OO3O5fsQ9vXPGF6vpIIRT8Lr2vsRdoZgPQ2AvwEAwkJ-QnQh6RNKXVhARncpXf1ruuX9hect1ze9I5cIYRqpXczpm1NLNN0HTvLMjQohnvCdQuarUls0zNGXQD4vDBizizNBnpogDO4eqyohKsRFOEQ6eiX01dx-uWbi9ZeEnmqqzdq7I0TqDpppthu6WZiFAUJ6dI');
                      "
                    ></div>
                    <span class="font-bold text-slate-800 dark:text-slate-200">Andi Wijaya</span>
                  </div>
                </td>
                <td class="text-slate-500">andi@cuanpos.com</td>
                <td>
                  <div class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px] text-slate-400"
                      >point_of_sale</span
                    >
                    <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400"
                      >KASIR</span
                    >
                  </div>
                </td>
                <td>
                  <div class="flex items-center gap-1.5">
                    <span class="size-1.5 bg-primary rounded-full"></span>
                    <span class="text-[11px] text-slate-600 dark:text-slate-400 uppercase font-bold"
                      >Active</span
                    >
                  </div>
                </td>
                <td class="text-right">
                  <div class="flex justify-end gap-1">
                    <button class="p-1 text-slate-400 hover:text-primary">
                      <span class="material-symbols-outlined !text-[16px]">edit</span>
                    </button>
                    <button class="p-1 text-slate-400 hover:text-slate-600">
                      <span class="material-symbols-outlined !text-[16px]">visibility</span>
                    </button>
                    <button class="p-1 text-slate-400 hover:text-red-500">
                      <span class="material-symbols-outlined !text-[16px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td class="text-center font-mono text-[10px] text-slate-400">002</td>
                <td>
                  <div class="flex items-center gap-2">
                    <div
                      class="size-6 rounded bg-cover bg-center border border-slate-200 dark:border-slate-800 flex-shrink-0"
                      style="
                        background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWRd3IcoQLRBAa83qxRxrxgmi8RbRYeJFDFZts6wJ4TB8D7YEXCkIhR4FsruF85M3dNC-lNmX6Umxq1Adeywij_fLxmWYT3YHlkF9W6icSW5z40BZd-TeRYtSDiZD4PIj7ABvvlmaWc9R-nfUGWqJFKhMnvxoox3zuCYjbfPbdidv920x8f8BUawVSHZmkQZGtYcSiWfsPhn_CPe0MdGR3qisQBxS9Qs_fRQJcZ9ivwjQzDOpbYxY1Ocxv7Bab8N_XBDkrQZu39SJa');
                      "
                    ></div>
                    <span class="font-bold text-slate-800 dark:text-slate-200">Budi Santoso</span>
                  </div>
                </td>
                <td class="text-slate-500">budi@cuanpos.com</td>
                <td>
                  <div class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px] text-slate-400"
                      >admin_panel_settings</span
                    >
                    <span class="text-[11px] font-bold text-blue-600 dark:text-blue-400"
                      >ADMIN</span
                    >
                  </div>
                </td>
                <td>
                  <div class="flex items-center gap-1.5">
                    <span class="size-1.5 bg-primary rounded-full"></span>
                    <span class="text-[11px] text-slate-600 dark:text-slate-400 uppercase font-bold"
                      >Active</span
                    >
                  </div>
                </td>
                <td class="text-right">
                  <div class="flex justify-end gap-1">
                    <button class="p-1 text-slate-400 hover:text-primary">
                      <span class="material-symbols-outlined !text-[16px]">edit</span>
                    </button>
                    <button class="p-1 text-slate-400 hover:text-slate-600">
                      <span class="material-symbols-outlined !text-[16px]">visibility</span>
                    </button>
                    <button class="p-1 text-slate-400 hover:text-red-500">
                      <span class="material-symbols-outlined !text-[16px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td class="text-center font-mono text-[10px] text-slate-400">003</td>
                <td>
                  <div class="flex items-center gap-2">
                    <div
                      class="size-6 rounded bg-cover bg-center border border-slate-200 dark:border-slate-800 flex-shrink-0"
                      style="
                        background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfSWYRlSwY4SAch4PE7S3XOFLgdFDud_r9-ek_iu5MxgoZKO_JdrwtuWrnTGt5WpWRdX9crnuoVnSkv4fYi-O4Mj_64nGIY28zKnHb1RG_J8A-jUIYV25mvLSBeqXv2z0AJo8GbB2OgXCeBcpSqN0troyNm8fTzrJIcoJKGhOwQmSrZijG6beO2MbYYm2V00-GbHqAaXYSJf5vjsIWSCNaDQIAIeu_NQM_n0WjkmRBaStKCnIH8USSThAo2jeYngTVVmuUuOnW2Cc0');
                      "
                    ></div>
                    <span class="font-bold text-slate-800 dark:text-slate-200">Siti Aminah</span>
                  </div>
                </td>
                <td class="text-slate-500">siti@cuanpos.com</td>
                <td>
                  <div class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px] text-slate-400"
                      >point_of_sale</span
                    >
                    <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400"
                      >KASIR</span
                    >
                  </div>
                </td>
                <td>
                  <div class="flex items-center gap-1.5">
                    <span class="size-1.5 bg-slate-300 dark:bg-slate-600 rounded-full"></span>
                    <span class="text-[11px] text-slate-400 dark:text-slate-600 uppercase font-bold"
                      >Disabled</span
                    >
                  </div>
                </td>
                <td class="text-right">
                  <div class="flex justify-end gap-1">
                    <button class="p-1 text-slate-400 hover:text-primary">
                      <span class="material-symbols-outlined !text-[16px]">edit</span>
                    </button>
                    <button class="p-1 text-slate-400 hover:text-slate-600">
                      <span class="material-symbols-outlined !text-[16px]">visibility</span>
                    </button>
                    <button class="p-1 text-slate-400 hover:text-red-500">
                      <span class="material-symbols-outlined !text-[16px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                <td class="text-center font-mono text-[10px] text-slate-400">004</td>
                <td>
                  <div class="flex items-center gap-2">
                    <div
                      class="size-6 rounded bg-cover bg-center border border-slate-200 dark:border-slate-800 flex-shrink-0"
                      style="
                        background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDe1juXh3CgCVyyX1E5snX8NflWr8fsRzgOayTPmck-XnSsYoJBVxTcroZSBpK5QrviOzJGJHDqQwZCv3x8PshvRRRdBmm88pLQcTnzavLO5FO64F_Eq-zShP3QiZHK0z11MZcAfOGCYerbJIDBjSbucXfPzkKmE17RxuXMz8SdT5KufbdesS19kO__TQ3RGH81Oi4MvboRNW2UoQCB_bklrHvEeFljwymqw0BCSReL1Hy4nJIahJJjm8wXRgXWfEPpNEXRf7MqMUQ1');
                      "
                    ></div>
                    <span class="font-bold text-slate-800 dark:text-slate-200">Rizky Pratama</span>
                  </div>
                </td>
                <td class="text-slate-500">rizky@cuanpos.com</td>
                <td>
                  <div class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px] text-slate-400"
                      >point_of_sale</span
                    >
                    <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400"
                      >KASIR</span
                    >
                  </div>
                </td>
                <td>
                  <div class="flex items-center gap-1.5">
                    <span class="size-1.5 bg-primary rounded-full"></span>
                    <span class="text-[11px] text-slate-600 dark:text-slate-400 uppercase font-bold"
                      >Active</span
                    >
                  </div>
                </td>
                <td class="text-right">
                  <div class="flex justify-end gap-1">
                    <button class="p-1 text-slate-400 hover:text-primary">
                      <span class="material-symbols-outlined !text-[16px]">edit</span>
                    </button>
                    <button class="p-1 text-slate-400 hover:text-slate-600">
                      <span class="material-symbols-outlined !text-[16px]">visibility</span>
                    </button>
                    <button class="p-1 text-slate-400 hover:text-red-500">
                      <span class="material-symbols-outlined !text-[16px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="px-3 py-2 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between"
        >
          <p class="text-[11px] text-slate-500 font-condensed">
            Record <span class="font-bold text-slate-900 dark:text-white">1-4</span> of
            <span class="font-bold text-slate-900 dark:text-white">24</span>
          </p>
          <div class="flex gap-1">
            <button
              class="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-[11px] font-bold hover:bg-white dark:hover:bg-slate-800 transition-colors disabled:opacity-30"
              disabled=""
            >
              PREV
            </button>
            <button
              class="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-[11px] font-bold bg-white dark:bg-slate-800 text-primary border-primary"
            >
              1
            </button>
            <button
              class="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-[11px] font-bold hover:bg-white dark:hover:bg-slate-800"
            >
              2
            </button>
            <button
              class="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-[11px] font-bold hover:bg-white dark:hover:bg-slate-800 transition-colors"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div
          class="bg-white dark:bg-slate-950 p-3 rounded border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3"
        >
          <div class="size-8 rounded bg-primary/10 flex items-center justify-center text-primary">
            <span class="material-symbols-outlined !text-[18px]">group</span>
          </div>
          <div>
            <p class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
              TOTAL STAFF
            </p>
            <p class="text-lg font-bold text-slate-900 dark:text-white leading-none">24</p>
          </div>
        </div>
        <div
          class="bg-white dark:bg-slate-950 p-3 rounded border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3"
        >
          <div
            class="size-8 rounded bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600"
          >
            <span class="material-symbols-outlined !text-[18px]">admin_panel_settings</span>
          </div>
          <div>
            <p class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
              ADMINISTRATORS
            </p>
            <p class="text-lg font-bold text-slate-900 dark:text-white leading-none">04</p>
          </div>
        </div>
        <div
          class="bg-white dark:bg-slate-950 p-3 rounded border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3"
        >
          <div
            class="size-8 rounded bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600"
          >
            <span class="material-symbols-outlined !text-[18px]">point_of_sale</span>
          </div>
          <div>
            <p class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">OPERATORS</p>
            <p class="text-lg font-bold text-slate-900 dark:text-white leading-none">20</p>
          </div>
        </div>
        <div
          class="bg-white dark:bg-slate-950 p-3 rounded border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3"
        >
          <div
            class="size-8 rounded bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500"
          >
            <span class="material-symbols-outlined !text-[18px]">sync</span>
          </div>
          <div>
            <p class="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
              SYSTEM LOAD
            </p>
            <p class="text-lg font-bold text-slate-900 dark:text-white leading-none">0.8s</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
