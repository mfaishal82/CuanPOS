# CuanPOS Backend API

Backend RESTful API untuk aplikasi CuanPOS (Point of Sale) yang dibangun menggunakan Node.js, Express, dan Sequelize.

## 🚀 Teknologi Utama

- **Runtime:** Node.js
- **Framework:** Express.js (v5+)
- **ORM:** Sequelize (PostgreSQL)
- **Database:** PostgreSQL
- **Caching:** Redis
- **Autentikasi:** JWT (JSON Web Token) & Bcryptjs
- **Storage:** ImageKit.io (Manajemen Gambar)
- **Middleware:** Multer (Upload file), CORS, Express Rate Limit

## 🛠️ Persiapan & Instalasi

### 1. Prasyarat
Pastikan Anda sudah menginstal:
- Node.js (v16+)
- PostgreSQL
- Redis Server

### 2. Kloning & Instal Dependensi
```bash
cd pos-backend
npm install
```

### 3. Konfigurasi Environment
Salin file `.env sample` menjadi `.env` dan isi nilai variabel yang diperlukan:
```bash
cp ".env sample" .env
```
Isi variabel berikut di `.env`:
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME` (Koneksi Database)
- `JWT_SECRET` (String acak untuk keamanan token)
- `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT` (Untuk upload gambar)
- `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD` (Untuk caching)

### 4. Setup Database
Jalankan migrasi dan seeder untuk menyiapkan skema database dan data awal:
```bash
# Jalankan Migrasi
npx sequelize-cli db:migrate

# Jalankan Seeder (Opsional - untuk data contoh)
npx sequelize-cli db:seed:all
```

## 🏃 Menjalankan Aplikasi

### Mode Pengembangan (Development)
Menggunakan `nodemon` untuk auto-reload saat ada perubahan kode:
```bash
npm run dev
```

### Mode Produksi
```bash
node app.js
```

## 📂 Struktur Folder

- `config/`: Konfigurasi Sequelize dan database.
- `controllers/`: Logika bisnis untuk setiap endpoint.
- `helpers/`: Fungsi utilitas (JWT, Bcrypt, ImageKit, Redis, Invoice/SKU Generator).
- `middlewares/`: Middleware kustom (Auth, Error Handler, RBAC).
- `migrations/`: File migrasi database Sequelize.
- `models/`: Definisi skema database/tabel.
- `routes/`: Definisi routing API.
- `seeders/`: Data awal/dummy untuk database.

## 🔑 Endpoint Utama (Ringkasan)

- `/users`: Autentikasi dan manajemen user.
- `/products`: Manajemen katalog produk (stok, barcode, gambar).
- `/categories`: Kategori produk.
- `/sales`: Transaksi penjualan dan laporan.
- `/purchases`: Transaksi pembelian stok dari supplier.
- `/settings`: Pengaturan profil toko.

## 📜 Lisensi
Proyek ini dilisensikan di bawah [ISC License](LICENSE).
