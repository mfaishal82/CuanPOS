import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useProductStore = defineStore('product', () => {
  const product = ref([])
  const category = ref([])
  const pagination = ref({})
  const apiUrl = import.meta.env.VITE_API_URL

  async function fetchProduct(options = {} ) {
    const { search, page, limit, category, order, sort} = options

    try {
      const params = new URLSearchParams({
        searchProduct: search,
        category,
        page,
        limit,
        order,
        sort
      })

      const response = await axios.get(`${apiUrl}/product/list?${params}`, {
        withCredentials: true,
      })
      // console.log(response.data.data)
      setProduct(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchCategory(options = {} ) {
    const { search } = options
    const params = new URLSearchParams({
      searchCategory: search
    })
    try{
      const response = await axios.get(`${apiUrl}/category/list?${params}`, {
        withCredentials: true
      })
      setCategory(response.data)
    }catch(error){
      console.log(error)
    }
  }

  function setProduct(productData) {
    product.value = productData.data
    pagination.value = productData.pagination
  }

  function setCategory(categoryData) {
    category.value = categoryData
  }

  return { fetchProduct, product, category, fetchCategory, pagination }
})

export default useProductStore
