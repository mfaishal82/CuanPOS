import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"

const useSaleStore = defineStore('sale', () => {
  const loading = ref(false)
  const errorMessage = ref('')
  const summary = ref(null)
  const apiUrl = import.meta.env.VITE_API_URL

  const createSale = async (options = {}) => {
    const { sale_id, product_id, quantity, payment_method, payment_amount, change_amount  } = options
    try {
      const response = await axios.post(`${apiUrl}/sale/add-item`, {
        sale_id,
        product_id,
        quantity,
        payment_method,
        payment_amount,
        change_amount
      }, {
        withCredentials: true,
      })

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

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
    fetchSummary,
    createSale
  })
})

export default useSaleStore
