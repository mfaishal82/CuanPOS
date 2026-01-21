import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"

const useSaleStore = defineStore('sale', () => {
  const loading = ref(false)
  const errorMessage = ref('')
  const summary = ref(null)
  const saleItem = ref([])
  const apiUrl = import.meta.env.VITE_API_URL

  const createSale = async (items = [], paymentInfo = {}) => {
    if (!Array.isArray(items) || items.length === 0) {
      console.error('❌ items must be a non-empty array')
      errorMessage.value = 'Keranjang kosong!'
      return false
    }

    const { payment_method, payment_amount, change_amount } = paymentInfo

    loading.value = true
    // console.log('🔄 Creating sale with:', { items, payment_method, payment_amount, change_amount })

    try {
      const response = await axios.post(`${apiUrl}/sale/add-item`, {
        items,
        payment_method,
        payment_amount,
        change_amount
      }, {
        withCredentials: true,
      })

      errorMessage.value = ''
      return true
    } catch (error) {
      console.error('❌ Create sale failed:', error.response?.data || error.message)
      errorMessage.value = error.response?.data?.message || 'Failed to create sale'
      return false
    } finally {
      loading.value = false
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
      return true
    } catch (error) {
      errorMessage.value = error.response?.data?.message || 'Failed to fetch sales'
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
      const params = date ? new URLSearchParams({ date }) : null
      const response = await axios.get(`${apiUrl}/sale/summary?${params}`, {
        withCredentials: true
      })
      summary.value = response.data.data
      return true
    } catch (error) {
      errorMessage.value = error.message
      return false
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
