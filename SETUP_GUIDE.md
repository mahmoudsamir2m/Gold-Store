# Frontend-Backend Integration Setup

## ✅ Completed Configuration

### 1. Environment Variables
Created `.env.local` in frontend with:
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

### 2. Updated All API Routes
All frontend API routes now use `process.env.NEXT_PUBLIC_API_URL` instead of hardcoded URLs:
- ✅ Products API
- ✅ Product Details API
- ✅ Reviews API
- ✅ Auth Service (login, register, logout)
- ✅ User Profile API
- ✅ Upload API
- ✅ Privacy Policy API
- ✅ Related Products API
- ✅ App Content API

### 3. CORS Configuration
Created `config/cors.php` and updated `bootstrap/app.php` to allow requests from:
- http://localhost:3000
- http://127.0.0.1:3000

## 🚀 How to Run

### Backend (Laravel)
```bash
cd d:\laragon\gold
php artisan serve
```
Backend will run at: http://127.0.0.1:8000

### Frontend (Next.js)
```bash
cd d:\laragon\gold\react\Gold-Store
npm install
npm run dev
```
Frontend will run at: http://localhost:3000

## 📋 Available Endpoints

### Public Endpoints (No Auth)
- `GET /api/products` - Get products with filters
- `GET /api/products/{id}` - Get product details
- `GET /api/products/categories` - Get categories
- `GET /api/products/{id}/reviews` - Get reviews
- `GET /api/privacy` - Get privacy policy
- `GET /api/blogs` - Get blogs
- `GET /api/settings` - Get settings

### Auth Endpoints
- `POST /api/login` - Login
- `POST /api/register` - Register
- `POST /api/logout` - Logout (requires token)

### Protected Endpoints (Require Bearer Token)
- `GET /api/me` - Get current user
- `POST /api/update-profile` - Update profile
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `POST /api/products/{id}/reviews` - Add review
- `POST /api/upload` - Upload files

## 🔑 Authentication
Protected endpoints require Authorization header:
```
Authorization: Bearer {your_token}
```

## 📝 Notes
- Make sure Laravel backend is running before starting frontend
- Products endpoint is public (no authentication required)
- All other user-specific endpoints require authentication
- CORS is configured to allow localhost:3000 and 127.0.0.1:3000

## 🐛 Troubleshooting

### CORS Errors
If you see CORS errors, make sure:
1. Backend is running at http://127.0.0.1:8000
2. Frontend is running at http://localhost:3000
3. `config/cors.php` exists and is properly configured

### API Not Found (404)
Check that:
1. Backend routes are defined in `routes/api.php`
2. URL in frontend matches backend routes
3. Environment variable `NEXT_PUBLIC_API_URL` is set correctly

### Authentication Issues
Verify:
1. Token is stored correctly after login
2. Authorization header is included in requests
3. Token format is: `Bearer {token}`
