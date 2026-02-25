import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSettingStore = defineStore('setting', () => {
  const shopSetting = ref([])
  const errMessage = ref('')
  const successMsg = ref('')
  const apiUrl = import.meta.env.VITE_API_URL

  async function getSetting() {
    try {
      const response = await axios.get(`${apiUrl}/setting/get`, {
        withCredentials: true,
      })
      // console.log(response.data)
      shopSetting.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  async function createSetting(options = {}) {
    try {
      console.log(options)
      const { shopName, email, phone, address, logo } = options
      const response = await axios.post(
        `${apiUrl}/setting/update`,
        {
          shopName,
          email,
          phone,
          address,
          logo,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      console.log(response.data.message)
      successMsg.value = response.data.message
    } catch (error) {
      console.log(error)
      errMessage.value = error.message
    }
  }

  return {
    getSetting,
    createSetting,
    shopSetting,
    errMessage,
    successMsg,
  }
})

export default useSettingStore
