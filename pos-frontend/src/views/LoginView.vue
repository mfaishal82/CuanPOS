<script setup lang="ts">
import useUserStore from '@/stores/userStore'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
const userStore = useUserStore()

const username = ref('mfaisal')
const password = ref('12345678')
const loading = ref(false)
const showPassword = ref(false)

async function handleLogin() {
  loading.value = true
  // console.log(`username: ${username.value} || password: ${password.value}`)
  const success = await userStore.login(username.value, password.value)
  if (success) {
    router.push('/')
  } else {
    Swal.fire({
      title: 'Gagal masuk!',
      text: `${userStore.message}`,
      color: 'red',
      icon: 'error',
      confirmButtonText: 'Coba lagi',
      confirmButtonColor: 'red',
    })
  }
  loading.value = false
}

function togglePassword() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <main>
    <div class="min-h-screen w-full flex flex-col lg:flex-row">
      <div
        class="flex-1 flex flex-col min-h-screen relative bg-background-light dark:bg-background-dark overflow-y-auto"
      >
        <div class="w-full px-6 py-8 lg:px-20 lg:pt-10 flex-none">
          <RouterLink to="/">
            <div class="flex items-center gap-3">
              <div class="size-8 text-primary">
                <svg
                  class="w-full h-full"
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                  ></path>
                  <path
                    clip-rule="evenodd"
                    d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <h2 class="text-text-main dark:text-white text-xl font-bold tracking-tight">
                CuanPOS
              </h2>
            </div>
          </RouterLink>
        </div>
        <div class="flex-1 flex flex-col justify-center px-6 lg:px-20 xl:px-32 pb-12">
          <div class="max-w-120 w-full mx-auto">
            <div class="mb-12 text-center lg:text-left">
              <h1
                class="text-3xl lg:text-4xl font-black text-text-main dark:text-white tracking-tight mb-3"
              >
                Welcome Back
              </h1>
              <p class="text-text-muted dark:text-gray-400 text-base">
                Manage your store efficiently and boost your sales.
              </p>
            </div>
            <form class="flex flex-col gap-6" @submit.prevent="handleLogin">
              <label class="flex flex-col gap-2">
                <span class="text-text-main dark:text-gray-200 text-sm font-semibold"
                  >Username</span
                >
                <div class="relative group">
                  <div
                    class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted"
                  >
                    <span class="material-symbols-outlined text-[20px]">person</span>
                  </div>
                  <input
                    class="w-full h-12 rounded-lg bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-main dark:text-white placeholder:text-text-muted/70 pl-11 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    v-model="username"
                    placeholder="yourusername"
                    type=""
                  />
                </div>
              </label>
              <label class="flex flex-col gap-2">
                <span class="text-text-main dark:text-gray-200 text-sm font-semibold"
                  >Password</span
                >
                <div class="relative group">
                  <div
                    class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted"
                  >
                    <span class="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input
                    class="w-full h-12 rounded-lg bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-main dark:text-white placeholder:text-text-muted/70 pl-11 pr-12 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    v-model="password"
                    placeholder="Enter your password"
                    :type="showPassword ? 'text' : 'password'"
                  />
                  <button
                    @click="togglePassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text-main dark:hover:text-white cursor-pointer transition-colors"
                    type="button"
                  >
                    <span class="material-symbols-outlined text-[20px]">
                      {{ showPassword ? 'visibility' : 'visibility_off' }}
                    </span>
                  </button>
                </div>
              </label>
              <!-- <div class="flex items-center justify-between mt-1">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    class="w-4 h-4 text-primary bg-white dark:bg-surface-dark border-gray-300 dark:border-border-dark rounded focus:ring-primary focus:ring-offset-0"
                    type="checkbox"
                  />
                  <span class="text-sm text-text-muted dark:text-gray-400">Remember me</span>
                </label>
                <a
                  class="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  href="#"
                  >Forgot password?</a
                >
              </div> -->
              <button
                class="w-full cursor-pointer h-12 mt-2 bg-primary hover:bg-primary/90 text-text-main font-bold text-base rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                :disable="loading"
              >
                <span>
                  {{ loading ? 'Signing in...' : 'Sign in' }}
                </span>
                <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="hidden lg:flex flex-1 relative bg-surface-dark overflow-hidden min-h-screen">
        <div
          class="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          data-alt="Modern payment terminal and point of sale setup in a bright shop environment"
          style="
            background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAdntpDX3XPVDIEJsEVlgYN3aArfq0HkF_uSTsSaBFyjOwfM0Ks6jivY_rZKW4tZ3Cps2IBPMCnDtpSX4SPOVEHy8Ac7QCQkazSRaFMZvwalB7eU910bll2PrYUrc2cfJpVYp6QHPy4u1Q2BxIf7fAJ0JsbUwqbRfzLY6s0AMYz9a-FoL131NdH9SCQnCxFFk4KgfLiVXZ1n0qCvCH8Q4d3KOhRDU8OUlFzgNfnmfxDyxu78V2MXgx5PeRFG0yD3843uCzmrc0E83iE');
          "
        ></div>
        <div class="absolute inset-0 bg-linear-to-br from-primary/30 to-background-dark/90"></div>
        <div class="relative z-10 flex flex-col justify-end p-20 h-full w-full max-w-2xl">
          <div
            class="bg-background-dark/30 backdrop-blur-md rounded-2xl p-8 border border-white/10"
          >
            <div class="flex gap-1 mb-4 text-primary">
              <span class="material-symbols-outlined text-[24px] fill-current">star</span>
              <span class="material-symbols-outlined text-[24px] fill-current">star</span>
              <span class="material-symbols-outlined text-[24px] fill-current">star</span>
              <span class="material-symbols-outlined text-[24px] fill-current">star</span>
              <span class="material-symbols-outlined text-[24px] fill-current">star</span>
            </div>
            <blockquote class="text-2xl font-bold text-white mb-6 leading-relaxed">
              "CuanPOS transformed how we manage our inventory. Sales are up 40% since we switched!"
            </blockquote>
            <div class="flex items-center gap-4">
              <img
                alt="Portrait of a smiling business man"
                class="w-12 h-12 rounded-full object-cover border-2 border-primary"
                data-alt="Portrait of Muhammad Faisal, store owner"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdxrLLwH1xJOYPsUH11dIUzEh_a0S6HgYh8ZfecbduqmMjazNo8s6cpaqulkwVhSXlYHY13qcQtLHGnU5TpQlVs3UBqDv996u6KJBl89e1dVnxOX7ILlIonyNff4U9twWFvIL_taxkN5bYKQeWCfxIUe7JcRTjsj5IVTciVbwv592OhMzPpCUMbdcNn4oxQIfxspDOJ68B8Af_bNUJM9f68HubIv9BAUCETbLIXOWmbR-WnVfrup5Znh9mKkQWofP0aIDgSZ7a3vfK"
              />
              <div>
                <div class="text-white font-bold">Muhammad Faisal</div>
                <div class="text-primary text-sm font-medium">Owner, Tech Haven</div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="absolute top-10 right-10 size-32 bg-primary rounded-full blur-[80px] opacity-20 animate-pulse"
        ></div>
        <div
          class="absolute bottom-1/3 left-10 size-64 bg-primary rounded-full blur-[100px] opacity-10"
        ></div>
      </div>
    </div>
  </main>
</template>
