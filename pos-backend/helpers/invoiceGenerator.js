const year = new Date().getFullYear()
const month = new Date().getMonth()

module.exports = {
  invoiceGenerator: (orderId) => `INV-${year}-${month}-${String(orderId).padStart(5, '0')}`
}
