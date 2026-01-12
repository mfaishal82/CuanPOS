import { toast } from "vue3-toastify"

const toastAsync = async (promise, messages, options = {})=> {

  return await toast.promise(
    promise,
    {
      pending: messages.pending || 'Sedang diproses...',
      success: messages.success || 'Berhasil diproses',
      error: messages.error || 'Terjadi kesalahan'
    },
    options
  )
}

const showToast = (message, type = 'info', options) => {
  return toast(message, {
    type,
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...options
  })
}

const closeAllToast = () => {
  toast.clearAll()
}

export default toastAsync
export { showToast, closeAllToast }
