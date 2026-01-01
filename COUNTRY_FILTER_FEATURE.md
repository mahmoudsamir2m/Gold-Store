# Country Filter Feature

## Overview
تم إضافة فلتر الدولة للموقع بحيث يمكن للمستخدم اختيار دولة معينة (السعودية، الإمارات، مصر) أو عرض الكل.

## Features

### 1. Country Selector في Navbar
- يعرض الدولة المختارة حالياً
- يحفظ الاختيار في localStorage
- الخيارات المتاحة:
  - 🌍 الكل (all)
  - 🇸🇦 السعودية (saudi)
  - 🇦🇪 الإمارات (uae)
  - 🇪🇬 مصر (egypt)

### 2. Prices Ticker
- يجلب الأسعار من `/api/prices/formatted?country={selectedCountry}`
- يتحدث تلقائياً عند تغيير الدولة
- يعرض العملة المناسبة للدولة:
  - السعودية: ر.س (SAR)
  - الإمارات: د.إ (AED)
  - مصر: ج.م (EGP)
  - الكل: $ (USD)

### 3. Products Page
- يفلتر المنتجات حسب الدولة المختارة
- عند اختيار "الكل" يعرض جميع المنتجات
- عند اختيار دولة معينة يعرض منتجات المستخدمين من تلك الدولة فقط

## Backend Changes

### PriceController
```php
// يدعم country=all لعرض جميع الأسعار
// أو country=saudi/uae/egypt لدولة معينة
GET /api/prices/formatted?country={country}
GET /api/prices/live?country={country}
```

### ProductController
```php
// يدعم country=all لعرض جميع المنتجات
// أو country=saudi/uae/egypt لفلترة حسب الدولة
GET /api/products?country={country}
```

## Frontend Implementation

### Context
```typescript
// contexts/CountryContext.tsx
- selectedCountry: "all" | "saudi" | "uae" | "egypt"
- setSelectedCountry(country)
- يحفظ في localStorage
```

### Components
1. **CountrySelector** - في Navbar
2. **PricesTicker** - يستخدم useCountry()
3. **ProductsPage** - يستخدم useCountry()

## Usage

```typescript
import { useCountry } from "@/contexts/CountryContext";

function MyComponent() {
  const { selectedCountry, setSelectedCountry } = useCountry();
  
  // استخدام الدولة المختارة
  useEffect(() => {
    fetchData(selectedCountry);
  }, [selectedCountry]);
}
```

## Database Schema

### prices table
```sql
- country: varchar (saudi, uae, egypt)
- currency: varchar (SAR, AED, EGP, USD)
- metal: varchar (gold, silver)
- karat: varchar (24, 22, 21, 18, 925, 999)
- price_per_gram: decimal
- price_per_ounce: decimal
- fetched_at: timestamp
```

### products table
```sql
- country: varchar (saudi, uae, egypt)
- city: varchar
- user_id: foreign key
```

## Notes
- الفلتر يعمل على مستوى الموقع بالكامل
- يتم حفظ الاختيار في localStorage
- عند اختيار "الكل" يتم عرض جميع البيانات من جميع الدول
- الأسعار والمنتجات تتحدث تلقائياً عند تغيير الدولة
