# Express va PostgreSQL bilan Autentifikatsiya loyihasi

## Texnik talablar

1. **Backend**: Node.js, Express.js
2. **Ma'lumotlar bazasi**: PostgreSQL
3. **Parollar xavfsizligi**: bcrypt bilan hashlash
4. **API**: RESTful API formatida

## API endpointlari

### 1. Ro'yxatdan o'tish (Registration)

- **Endpoint**: `POST /api/auth/register`
- **Request body**:

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "phone_number": "+998901234567",
  "password": "password123"
}
```

- **Response (Muvaffaqiyatli)**:

```json
{
  "success": true,
  "message": "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

- **Response (Xato - 409 Conflict)**:

```json
{
  "success": false,
  "message": "Bu email manzil allaqachon ro'yxatdan o'tgan",
  "status": 409
}
```

### 2. Tizimga kirish (Login)

- **Endpoint**: `POST /api/auth/login`
- **Request body**:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

_yoki telefon raqami orqali:_

```json
{
  "phone_number": "+998901234567",
  "password": "password123"
}
```

- **Response (Muvaffaqiyatli)**:

```json
{
  "success": true,
  "message": "Muvaffaqiyatli tizimga kirdingiz",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

- **Response (Xato - 401 Unauthorized)**:

```json
{
  "success": false,
  "message": "Noto'g'ri login ma'lumotlari",
  "status": 401
}
```

### 3. Foydalanuvchi ma'lumotlarini olish

- **Endpoint**: `GET /api/auth/me`
- **Headers**: `Authorization: Bearer jwt_token_here`
- **Response (Muvaffaqiyatli)**:

```json
{
  "id": 1,
  "username": "testuser",
  "email": "test@example.com",
  "created_at": "2025-03-21T10:00:00Z"
}
```

- **Response (Xato)**:

```json
{
  "success": false,
  "message": "Avtorizatsiya token topilmadi"
}
```

## Ma'lumotlar bazasi strukturasi

### Users jadvali

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone_number VARCHAR(20) UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Qo'shimcha ma'lumotlar

- JWT tokeni yordamida session boshqarish ixtiyoriy, lekin tavsiya etiladi
- Loyiha REST API sifatida qurilishi kerak, frontend qismi talab qilinmaydi
- Xato holatlarini to'g'ri qaytarish muhim:
  - 400: Noto'g'ri so'rov (Bad Request) - ma'lumotlar validatsiyadan o'tmasa
  - 401: Avtorizatsiyadan o'tmagan (Unauthorized) - login paytida noto'g'ri ma'lumotlar kiritilsa
  - 403: Taqiqlangan (Forbidden) - ruxsat bo'lmagan resursga murojaat
  - 409: Ma'lumot konflikt holatida (Conflict) - masalan, phone_number bazada mavjud bo'lsa
  - 404: Resurs topilmadi (Not Found) - masalan, foydalanuvchi ID bo'yicha topilmasa
  - 500: Serverda xato (Internal Server Error)

## Xavfsizlik maslahatlar

### Login va xatolik xabarlari

Login paytida, foydalanuvchi topilmasa ham, parol noto'g'ri bo'lsa ham, bir xil xabar qaytarish tavsiya etiladi: **"Noto'g'ri login ma'lumotlari"**.

Bu xavfsizlik nuqtai nazaridan muhim, chunki:

- Hujumchilarga qaysi ma'lumot (login yoki parol) noto'g'ri ekanligini bildirishdan qochish kerak
- Hujumchiga foydalanuvchi mavjudligi haqida ma'lumot bermaslik kerak
- Har doim 401 status kodi ishlatish kerak, 404 emas (hatto foydalanuvchi topilmasa ham)
- Express.js yordamida RESTful API yaratish
- PostgreSQL bilan ishlash
- Autentifikatsiya tizimini yaratish
- Xavfsizlik bilan ishlash (parollarni hashlash)
- API endpointlarini testlash
