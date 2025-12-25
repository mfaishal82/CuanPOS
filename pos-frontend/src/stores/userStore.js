import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

const useUserStore = defineStore('user', () => {
  const name = ref("Muhammad Faisal")
  const username = ref("mfaishal82")
  const role = ref("Admin")

  function setUser(userData){
    name.value = userData.name
    username.value = userData.username
    role.value = userData.role
  }

  function clearUser(){
    name.value = ""
    username.value = ""
    role.value = ""
  }

  async function fetchUser(){
    try{
      const response = await axios.get("https://api-backend.biz.id/")
      console.log(response.data)
    }catch(error){
      console.log(error)
    }
  }

  return { name, username, role, setUser, clearUser, fetchUser }
})

export default useUserStore
