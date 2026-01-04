import { defineStore } from "pinia";
import { ref } from "vue";

const useResponsiveStore = defineStore('responsive', ()=> {
  const isMobile = ref(false)

  const toggleMobileMenu = ()=> {
    isMobile.value = !isMobile.value
  }

  const closeMobileMenu = ()=> {
    isMobile.value = false
  }

  return {
    isMobile,
    toggleMobileMenu,
    closeMobileMenu,
  }
})

export default useResponsiveStore
