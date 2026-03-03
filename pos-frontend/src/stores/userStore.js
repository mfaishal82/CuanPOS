import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const useUserStore = defineStore('user', () => {
  // const name = ref(localStorage.getItem('userName') || "Muhammad Faisal")
  // const username = ref( localStorage.getItem('username') || "mfaishal82")
  // const role = ref(localStorage.getItem('userRole') || "Admin")
  // const isLoggedIn = ref()
  const user = ref(null)
  const allUsers = ref([])
  const loading = ref(false)
  const authChecked = ref(false)
  const message = ref('')
  const errMessage = ref('')
  const apiUrl = import.meta.env.VITE_API_URL
  // console.log(apiUrl)
  const isLoggedIn = computed(() => user.value !== null)

  function setUser(userData) {
    user.value = userData
    // name.value = userData.name
    // username.value = userData.username
    // role.value = userData.role
    // isLoggedIn.value = true
    // localStorage.setItem('userName', userData.name)
    // localStorage.setItem('username', userData.username)
    // localStorage.setItem('userRole', userData.role)
    // localStorage.setItem('isLoggedIn', 'true')
  }

  function clearUser() {
    user.value = null
    // name.value = ""
    // username.value = ""
    // role.value = ""
    // isLoggedIn.value = false
    // localStorage.removeItem('userName')
    // localStorage.removeItem('username')
    // localStorage.removeItem('userRole')
    // localStorage.removeItem('isLoggedIn')
  }

  async function login(username, password) {
    try {
      loading.value = false
      await axios.post(
        `${apiUrl}/auth/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        },
      )
      // console.log(response.data)
      loading.value = true
      authChecked.value = false
      await fetchUser()
      return true
    } catch (error) {
      // console.log("Login error", error.response.data.message)

      message.value = error?.response?.data?.message || 'Tidak bisa terhubung dengan server'
      if (error.response) {
        // Server responded with error status
        // console.error('Response data:', error.response.data)
        // console.error('Response status:', error.response.status)
        // console.error('Response headers:', error.response.headers)
      } else if (error.request) {
        // Request was made but no response
        console.error('No response received:', error.request)
      } else {
        // Something else happened
        console.error('Error message:', error.message)
      }
      return false
    }
  }

  async function logout() {
    // name.value = ""
    // username.value = ""
    // role.value = ""
    await axios.post(
      `${apiUrl}/auth/logout`,
      {},
      {
        withCredentials: true,
      },
    )
    clearUser()
  }

  async function fetchUser() {
    if (authChecked.value) return //Dont retry

    try {
      const response = await axios.get(`${apiUrl}/auth/getme`, {
        withCredentials: true,
      })
      // console.log(response.data)
      if (!response.data) throw new Error()
      setUser(response.data)
      // return true
    } catch {
      // console.log(error)
      clearUser()
      // return false
    } finally {
      loading.value = false
      authChecked.value = true
    }
  }

  async function getAllUsers() {
    try {
      const response = await axios.get(`${apiUrl}/auth/list-users`, {
        withCredentials: true,
      })
      // console.log(response.data)
      allUsers.value = response.data.data
    } catch (error) {
      console.log(error)
    }
  }

  async function createUser(options = {}) {
    try {
      // console.log(options)
      const { name, username, role, password } = options
      await axios.post(
        `${apiUrl}/auth/register`,
        {
          name,
          username,
          role,
          password,
        },
        {
          withCredentials: true,
        },
      )

      // console.log(response.data)
      return true
    } catch (error) {
      // console.log(error)
      console.error(error)
      errMessage.value = error
      return false
    }
  }

  async function deleteUser(id) {
    try {
      // console.log(id)
      const response = await axios.delete(`${apiUrl}/auth/user/${id}`, {
        withCredentials: true,
      })

      // console.log(response.data)
      message.value = response.data.message
    } catch (error) {
      errMessage.value = error
    }
  }

  return {
    message,
    setUser,
    clearUser,
    loading,
    user,
    login,
    logout,
    isLoggedIn,
    fetchUser,
    authChecked,
    getAllUsers,
    allUsers,
    createUser,
    errMessage,
    deleteUser,
  }
})

export default useUserStore
