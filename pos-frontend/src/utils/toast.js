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

export default toastAsync
