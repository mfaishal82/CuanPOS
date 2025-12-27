import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const useUserStore = defineStore('user', () => {
  const name = ref(localStorage.getItem('userName') || "Muhammad Faisal")
  const username = ref( localStorage.getItem('username') || "mfaishal82")
  const role = ref(localStorage.getItem('userRole') || "Admin")
  const user = ref(null)
  // const isLoggedIn = ref()
  const isLoggedIn = computed(()=> user.value !== null)
  const loading = ref(true)
  const apiUrl = import.meta.env.VITE_API_URL

  function setUser(userData){
    name.value = userData.name
    username.value = userData.username
    role.value = userData.role
    // isLoggedIn.value = true

    user.value = userData

    localStorage.setItem('userName', userData.name)
    localStorage.setItem('username', userData.username)
    localStorage.setItem('userRole', userData.role)
    // localStorage.setItem('isLoggedIn', 'true')
  }

  function clearUser(){
    name.value = ""
    username.value = ""
    role.value = ""
    // isLoggedIn.value = false

    user.value = null

    localStorage.removeItem('userName')
    localStorage.removeItem('username')
    localStorage.removeItem('userRole')
    localStorage.removeItem('isLoggedIn')
  }

  async function login(username, password){
    try{
      const response = await axios.post(`${apiUrl}/auth/login`, {
        username, password
      }, {
        withCredentials: true
      })
      console.log(response.data)
      await fetchUser()
      return true
    }catch(error){
      console.log("Login error", error)

      if (error.response) {
            // Server responded with error status
            console.error('Response data:', error.response.data)
            console.error('Response status:', error.response.status)
            console.error('Response headers:', error.response.headers)
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

  async function logout(){
    name.value = ""
    username.value = ""
    role.value = ""
    await axios.post(`${apiUrl}/auth/logout`, {}, {
      withCredentials: true
    })
    clearUser()
  }

  async function fetchUser(){
    try{
      const response = await axios.get(`${apiUrl}/auth/getme`, {
        withCredentials: true
      })
      console.log(response.data)
      if (!response.data) throw new Error()
      setUser(response.data)
      // return true
    }catch(error){
      console.log(error)
      clearUser()
      // return false
    }finally{
      loading.value = false
    }
  }

  return { name, username, role, setUser, clearUser, loading, user, login, logout, isLoggedIn, fetchUser }
})

export default useUserStore
