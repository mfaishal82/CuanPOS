import axios from "axios";
import { defineStore } from"pinia";
import { ref } from "vue";


const useProductStore = defineStore('product', ()=> {
  const product = ref([])
  const apiUrl = import.meta.env.VITE_API_URL

  async function fetchProduct() {
    try{
      const response = await axios.get(`${apiUrl}/product/list`, {
        withCredentials: true
      })
      console.log(response.data)
      setProduct(response.data)
    }catch(error){
      console.log(error)
    }
  }

  async function setProduct(productData){
    product.value = productData
  }

  return { fetchProduct, product }
})

export default useProductStore
