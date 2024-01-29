# TUGAS TEST SENIOR SOFTWARE ENGINER (BACKEND) PT. 62 TEKNOLOGI

#### Ulasan Pemograman
Projek ini adalah salah satu tugas test senior software enginer PT. 62 TEKNOLOGI yang dibuat dengan bahasa pemograman Typescript dengan versi Nodejs V.20.11.0 dengan kerangka kerja(framework) 
Adonisjs untuk lebih jelas mengenai kerangka kerja (framework) tersebut dapat dilihat di [sini](https://docs.adonisjs.com/guides/introduction).
#### Database & driver 
Projek ini menggunakan driver mysql2 dengan konsep orm dari library Lucid untuk lebih jelas mengenai library tersebut dapat dilihat di [sini](https://lucid.adonisjs.com/docs/introduction).
#### Functional/Unit Test
Projek ini juga dilengkapi dengan fungsi unit test dari library Japa.dev untuk lebih jelas mengenai library tersebut dapat dilihat di [sini](https://japa.dev/docs/introduction).
#### Dokumentasi
Projek ini juga dilengkapi dengan dokumentasi untuk lebih jelas mengenai dokumentasi penggunaan API projek ini, dapat dilihat di [sini](https://documenter.getpostman.com/view/8135484/2s9YysBgB2#44d79ddb-c26d-4278-a8c5-334d380cd3cf).


# Panduan instalasi

Unduh repository ke dalam komputer menggunakan perintah `git clone`. Url
repository dapat dilihat di dalam repository hcis-api.

```
git clone <url repository> <folder tujuan>
```

#### Contoh

```
user@host:~$ git clone https://github.com/chocoalano/62teknologi-backend-test-alan-gentina.git 62teknologi-backend-test-alan-gentina
Cloning into '62teknologi-backend-test-alan-gentina'...
remote: Counting objects: 4, done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 4 (delta 0), reused 4 (delta 0), pack-reused 0
Unpacking objects: 100% (4/4), done.
```

#### Install package

```
cd 62teknologi-backend-test-alan-gentina
npm install
```

#### Setup .ENV

```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=(username database)
MYSQL_PASSWORD=(password database)
MYSQL_DB_NAME=(nama database)
```

#### Migration Database

```
# Untuk melakukan migrasi schema table ke database baru yang telah dibuat (database yang masih kosong tanpa table)
node ace migration:run
# Untuk memuat data dummy
node ace db:seed
# Untuk melakukan refresh table yang telah dimigrasi sebelumnya dan sekaligus memuat data dummy
node ace migration:refresh --seed
```

#### Unit testing fungsi

```
node ace test

# [ info ]  running tests...

# tests/functional/hello-world.spec.ts
#   ✔ display welcome page (24ms)

#  PASSED 

# total        : 1
# passed       : 1
# duration     : 28ms

```

#### Jalankan mode development

```
node ace serve --watch

```

#### Jalankan mode production

```
node ace build --production
cd build
node server.js

```
