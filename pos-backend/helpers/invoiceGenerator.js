const year = new Date().getFullYear()
const month = new Date().getMonth()

module.exports = {
  invoiceGenerator: (sale_id) => `INV-${year}-${month}-${String(sale_id).padStart(5, '0')}`
}
