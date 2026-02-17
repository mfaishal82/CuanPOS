import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSaleStore = defineStore('sale', () => {
  const loading = ref(false)
  const errorMessage = ref('')
  const summary = ref(null)
  const saleItem = ref([])
  const sale = ref([])
  const dailyAnalytics = ref([])
  const weeklyAnalytics = ref([])
  const monthlyAnalytics = ref([])
  const topProducts = ref([])
  const apiUrl = import.meta.env.VITE_API_URL

  const createSale = async (items = [], paymentInfo = {}) => {
    if (!Array.isArray(items) || items.length === 0) {
      console.error('❌ items must be a non-empty array')
      errorMessage.value = 'Keranjang kosong!'
      return false
    }

    const { payment_method, payment_amount, change_amount } = paymentInfo

    loading.value = true

    try {
      await axios.post(
        `${apiUrl}/sale/add-item`,
        {
          items,
          payment_method,
          payment_amount,
          change_amount,
        },
        {
          withCredentials: true,
        },
      )

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
        sort,
      })
      const response = await axios.get(`${apiUrl}/sale/list-item?${params}`, {
        withCredentials: true,
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
        withCredentials: true,
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

  const fetchSale = async () => {
    try {
      const response = await axios.get(`${apiUrl}/sale/list-sale`, {
        withCredentials: true,
      })
      console.log(response.data.data.allSales)
      sale.value = response.data.data.allSales
    } catch (error) {
      console.log(error)
    }
  }

  // ===== ANALYTICS METHODS =====
  const fetchDailyAnalytics = async (options = {}) => {
    loading.value = true
    try {
      const { month, year } = options
      const params = new URLSearchParams()
      if (month) params.append('month', month)
      if (year) params.append('year', year)

      const response = await axios.get(`${apiUrl}/sale/analytics/daily?${params}`, {
        withCredentials: true,
      })
      dailyAnalytics.value = response.data.data.analytics
      return true
    } catch (error) {
      errorMessage.value = error.response?.data?.message || 'Failed to fetch daily analytics'
      console.error(error)
      return false
    } finally {
      loading.value = false
    }
  }

  const fetchWeeklyAnalytics = async (options = {}) => {
    loading.value = true
    try {
      const { month, year } = options
      const params = new URLSearchParams()
      if (month) params.append('month', month)
      if (year) params.append('year', year)

      const response = await axios.get(`${apiUrl}/sale/analytics/weekly?${params}`, {
        withCredentials: true,
      })
      weeklyAnalytics.value = response.data.data.analytics
      return true
    } catch (error) {
      errorMessage.value = error.response?.data?.message || 'Failed to fetch weekly analytics'
      console.error(error)
      return false
    } finally {
      loading.value = false
    }
  }

  const fetchMonthlyAnalytics = async (options = {}) => {
    loading.value = true
    try {
      const { year } = options
      const params = year ? new URLSearchParams({ year }) : new URLSearchParams()

      const response = await axios.get(`${apiUrl}/sale/analytics/monthly?${params}`, {
        withCredentials: true,
      })
      monthlyAnalytics.value = response.data.data.analytics
      return true
    } catch (error) {
      errorMessage.value = error.response?.data?.message || 'Failed to fetch monthly analytics'
      console.error(error)
      return false
    } finally {
      loading.value = false
    }
  }

  const fetchTopProducts = async (options = {}) => {
    loading.value = true
    try {
      const { limit = 10, month, year } = options
      const params = new URLSearchParams()
      params.append('limit', limit)
      if (month) params.append('month', month)
      if (year) params.append('year', year)

      const response = await axios.get(`${apiUrl}/sale/analytics/top-products?${params}`, {
        withCredentials: true,
      })
      topProducts.value = response.data.data.products
      return true
    } catch (error) {
      errorMessage.value = error.response?.data?.message || 'Failed to fetch top products'
      console.error(error)
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    errorMessage,
    summary,
    fetchSummary,
    createSale,
    fetchSaleItem,
    saleItem,
    fetchSale,
    sale,
    dailyAnalytics,
    weeklyAnalytics,
    monthlyAnalytics,
    topProducts,
    fetchDailyAnalytics,
    fetchWeeklyAnalytics,
    fetchMonthlyAnalytics,
    fetchTopProducts,
  }
})

export default useSaleStore
