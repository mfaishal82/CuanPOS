import axios from "axios";
import { defineStore } from "pinia";

const usePaymentStore = defineStore('payment', () => {
  const apiUrl = import.meta.env.VITE_API_URL

  async function createQRIS(options = {}) {
    const { sale_id, payment_amount } = options
    try {
      const response = await axios.post(`${apiUrl}/payment/create-qris`, {
        sale_id,
        payment_amount
      }, {
        withCredentials: true,
      })
      return {
        success: true,
        data: response.data?.data || null,
        message: response.data?.message || '',
      }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to create QRIS',
      }
    }
  }
  return{createQRIS}
})

export default usePaymentStore
