# cms_api

Untuk awalan penggunaan gunakan npm i untuk install dependencies yang dibutuhkan

lalu jalan kan perintah
npx sequelize-cli db:migrate

lalu setelah itu jalankan perintah command
npx sequelize-cli db:seed:all

run menggunakan command 
npm run dev

untuk api nya sendiri ada 5 yaitu 
authenticate (login, register, dan logout)
product(BREAD)
category(BREAD)
cart(BREAD)
pembelian(BREAD)

untuk akses akun user bisa melalui akun 
{
  email: "user@user.id",
  password: "passworduser"
}

atau bisa menggunakan api register

untuk akses akun admin bisa melalui akun 
{
  email: "admin@admin.id",
  password: "passwordadmin"
}

untuk akses api:
1. Authenticate

   /api/post-login

   isi data dengan
   {
     email,
     password
   }

  /api/post-register
  
  isi data dengan
   {
     name,
     phone,
     email,
     password
   }

   /api/logout

2. Product

   /api/data-product  (semua user)

   set bearer tokennya

   /api/data-product/:productID  (semua user)

   set bearer tokennya

   /api/post-product (hanya admin)

   set bearer tokennya

   

   
