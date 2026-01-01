# Backend API Endpoints - Frontend Integration

## Base URL
```
http://127.0.0.1:8000/api
```

## Public Endpoints (No Authentication Required)

### Products
- `GET /products` - Get all products (with filters: metal, karat, category, search, city, min_price, max_price, page, per_page)
- `GET /products/categories` - Get product categories
- `GET /products/{id}` - Get single product details

### Reviews
- `GET /products/{id}/reviews` - Get product reviews (with pagination)
- `GET /products/{id}/reviews/stats` - Get review statistics

### Prices
- `GET|POST /prices/live` - Get live gold/silver prices
- `GET|POST /prices/formatted` - Get formatted prices
- `GET /prices/all` - Get all prices

### Location
- `GET|POST /location` - Get location data

### App Content
- `GET /app-content` - Get all app content
- `GET /app-content/{id}` - Get specific app content

### Privacy
- `GET /privacy` - Get privacy policy

### Blogs
- `GET /blogs` - Get all blogs
- `GET /blogs/{id}` - Get single blog

### Settings
- `GET /settings` - Get app settings

## Authentication Endpoints

### Auth
- `POST /login` - Login (email, password)
- `POST /register` - Register (name, email, password, phone, country)
- `POST /forget` - Forgot password
- `POST /verify-otp` - Verify OTP
- `POST /reset` - Reset password

## Protected Endpoints (Require Authentication)

### User Profile
- `GET /me` - Get current user data
- `POST /update-profile/{user?}` - Update profile
- `POST /destroy-avatar` - Delete avatar
- `POST /logout` - Logout

### Products (Auth Required)
- `POST /products` - Create product
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product
- `GET /my-products` - Get user's products

### Reviews (Auth Required)
- `POST /products/{id}/reviews` - Add review
- `PUT /products/{id}/reviews/{reviewId}` - Update review
- `DELETE /products/{id}/reviews/{reviewId}` - Delete review
- `GET /products/{id}/user/reviews` - Get user's review for product

### Upload
- `POST /upload` - Upload file (requires multipart/form-data)

### Admin Routes (Require Admin Role)
- `GET /admin/products` - Get all products for admin
- `POST /admin/products/{id}/approve` - Approve product
- `POST /admin/products/{id}/reject` - Reject product

## Frontend Configuration

### Environment Variables
Create `.env.local` in the frontend root:
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

### CORS Configuration
Make sure your Laravel backend has CORS enabled for `http://localhost:3000` (or your frontend URL).

Check `config/cors.php`:
```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:3000'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

### Authentication Headers
For protected endpoints, include:
```
Authorization: Bearer {token}
```

## Notes
- All product endpoints support pagination with `page` and `per_page` parameters
- Products can be filtered by: metal, karat, category, city, price range, search term
- File uploads use FormData with multipart/form-data
- Review endpoints require authentication
- Admin endpoints require admin role
