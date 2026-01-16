import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"

const useSaleStore = defineStore('sale', () => {
  const loading = ref(false)
  const errorMessage = ref('')
  const summary = ref(null)
  const saleItem = ref([])
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

  const fetchSaleItem = async (options = {}) => {
    loading.value = true
    const { order, sort } = options
    try {
      const params = new URLSearchParams({
        order,
        sort
      })
      const response = await axios.get(`${apiUrl}/sale/list-item?${params}`, {
        withCredentials: true
      })
      saleItem.value = response.data.data.saleItems
      console.log(saleItem.value)
      return true
    } catch (error) {
      errorMessage.value = error.response.data.message
      return false
    } finally {
      loading.value = false
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
    createSale,
    fetchSaleItem,
    saleItem
  })
})

export default useSaleStore
