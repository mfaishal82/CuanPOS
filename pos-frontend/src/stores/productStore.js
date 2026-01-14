import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useProductStore = defineStore('product', () => {
  const loading = ref(false)
  const product = ref([])
  const getIdProduct = ref('')
  const productById = ref({})
  const category = ref([])
  const pagination = ref({})
  const errorMessage = ref('')
  const apiUrl = import.meta.env.VITE_API_URL

  async function fetchProduct(options = {}) {
    const { search, page, limit, category, order, sort, barcode, sku } = options

    try {
      loading.value = true
      const params = new URLSearchParams({
        searchProduct: search,
        category,
        page,
        limit,
        order,
        sort,
        barcode,
        sku
      })

      const response = await axios.get(`${apiUrl}/product/list?${params}`, {
        withCredentials: true,
      })
      // console.log(response.data.data)
      setProduct(response.data)
      loading.value = false
      return true
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  async function fetchCategory(options = {}) {
    const { search } = options
    const params = new URLSearchParams({
      searchCategory: search,
    })
    try {
      loading.value = true
      const response = await axios.get(`${apiUrl}/category/list?${params}`, {
        withCredentials: true,
      })
      // console.log(response)
      setCategory(response.data.data || response.data)
      loading.value = false
      return true
    } catch (error) {
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

  async function addProduct(options = {}) {
    const { name, price, cost_price, stock, category_id, image, barcode } = options
    try {
      await axios.post(
        `${apiUrl}/product/add`,
        {
          name,
          price,
          cost_price,
          stock,
          category_id,
          image,
          barcode,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      return true
    } catch (error) {
      // console.log(error.response.data.message)
      errorMessage.value = error.response.data.message
      return false
    }
  }

  async function getProductById(id) {
    try {
      // console.log(id)
      if (!id) {
        errorMessage.value = 'Tidak ada product yg dipilih!'
      }
      const response = await axios.get(`${apiUrl}/product/${id}`, {
        withCredentials: true,
      })

      productById.value = response.data
      return productById.value
    } catch (error) {
      // console.log(error)
      errorMessage.value = error.response.data.message
    }
  }

  async function updateProduct(options = {}) {
    // const id = getIdProduct.value
    const { id, name, price, cost_price, stock, category_id, image, barcode } = options
    // console.log(barcode, "<< dari store update")
    try {
      if (!id) {
        errorMessage.value = 'ID produk tidak ada'
        return false
      }
      const response = await axios.put(
        `${apiUrl}/product/${id}`,
        {
          name,
          price,
          cost_price,
          stock,
          category_id,
          image,
          barcode,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      // console.log(response.data)
      return true
    } catch (error) {
      // console.log(error)
      errorMessage.value = error.response.data.message
      return false
    }
  }

  async function deleteProduct(productId) {
    // console.log(productId, "<<< dari store")
    try {
      if (!productId) {
        console.log('Id tidak ada')
      }
      await axios.delete(`${apiUrl}/product/${productId}`, {
        withCredentials: true,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function addCategory(options = {}) {
    const { name } = options
    try {
      await axios.post(
        `${apiUrl}/category/add`,
        {
          name,
        },
        {
          withCredentials: true,
        },
      )
    } catch (error) {
      console.log(error)
      errorMessage.value = error
    }
  }

  async function deleteCategory(id) {
    try {
      await axios.delete(`${apiUrl}/category/${id}`, {
        withCredentials: true,
      })
    } catch (error) {
      console.log(error)
      errorMessage.value = error
    }
  }

  return {
    fetchProduct,
    product,
    category,
    fetchCategory,
    pagination,
    addProduct,
    deleteProduct,
    errorMessage,
    addCategory,
    deleteCategory,
    getIdProduct,
    productById,
    getProductById,
    updateProduct,
  }
})

export default useProductStore
