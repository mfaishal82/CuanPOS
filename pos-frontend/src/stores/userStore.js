import { defineStore } from "pinia";
import { ref } from "vue";

const useUserStore = defineStore('user', () => {
  const name = ref("")
  const username = ref("")
  const role = ref("")

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

  }

  return { name, username, role, setUser, clearUser, fetchUser }
})

export default useUserStore
