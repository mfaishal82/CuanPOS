const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  password: 'postgres',
  host: '192.168.x.x',
  port: 5432,
  database: 'cuanpos'
})

client.connect((err) => {
  if (err) {
    console.log('❌ Koneksi gagal:', err.message)
  } else {
    console.log('✅ Koneksi berhasil!')
    client.end()
  }
})
