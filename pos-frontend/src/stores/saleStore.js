import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"

const useSaleStore = defineStore('sale', () => {
  const loading = ref(false)
  const errorMessage = ref('')
  const summary = ref(null)
  const apiUrl = import.meta.env.VITE_API_URL

  const fetchSummary = async (option = {}) => {
    loading.value = true
    errorMessage.value = null

    try {
      const { date } = option
      const params = date ? new URLSearchParams({
        date
      }) : null
      const response = await axios.get(`${apiUrl}/sale/summary?${params}`, {
        withCredentials: true
      })
      // console.log(response)
      // console.log(date)
      summary.value = response.data.data
    } catch (error) {
      errorMessage.value = error
    } finally {
      loading.value = false
    }
  }

  return ({
    loading,
    errorMessage,
    summary,
    fetchSummary
  })
})

export default useSaleStore
