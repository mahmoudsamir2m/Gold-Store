"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { productFormSchema } from "./schemas/productSchema";
import type { ProductFormData, MetalType } from "./types/ProductFormTypes";
import {
  FiTag,
  FiUser,
  FiPhone,
  FiMail,
  FiFileText,
  FiImage,
  FiMapPin,
} from "react-icons/fi";
import Image from "next/image";

// ✅ استيرادات صحيحة (بدون مشاكل)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// الفئات والأنواع
const CATEGORIES = [
  { label: "مشغولات", value: "jewelry" },
  { label: "سبائك وعملات", value: "bullion" },
];

const TYPES: Record<string, { label: string; value: string }[]> = {
  jewelry: [
    { label: "سلاسل", value: "Necklaces" },
    { label: "خواتم", value: "Rings" },
    { label: "أساور", value: "Bracelets" },
    { label: "أقراط", value: "Earrings" },
    { label: "خواتم زفاف", value: "Wedding Bands" },
  ],
  bullion: [
    { label: "سبائك", value: "Bars" },
    { label: "عملات", value: "Coins" },
  ],
};

const GOLD_KARATS = ["24", "22", "21", "18"];
const SILVER_KARATS = ["925", "900", "800"];

const CURRENCY_MAP: Record<string, string> = {
  مصر: "جنيه",
  الإمارات: "درهم",
  السعودية: "ريال",
};

const CITIES: Record<string, string[]> = {
  مصر: [
    "القاهرة",
    "الجيزة",
    "الاسكندرية",
    "الشرقية",
    "الدقهلية",
    "المنوفية",
    "سوهاج",
    "أسيوط",
    "الفيوم",
    "بنى سويف",
    "الاقصر",
    "اسوان",
    "السويس",
  ],
  السعودية: [
    "الرياض",
    "جدة",
    "مكة",
    "المدينة",
    "الدمام",
    "الهفوف",
    "تبوك",
    "خميس مشيط",
    "أبها",
  ],
  الإمارات: [
    "دبي",
    "ابوظبي",
    "الشارقة",
    "العين",
    "رأس الخيمة",
    "الفجيرة",
    "عجمان",
    "أم القيوين",
  ],
};

export default function AddProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('يجب تسجيل الدخول أولاً');
        router.push('/login');
        return;
      }

      try {
        const res = await fetch('/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setValue('name', data.name || '');
          setValue('phone', data.phone || '');
          setValue('email', data.email || '');
          setValue('country', data.country === 'egypt' ? 'مصر' : data.country === 'saudi' ? 'السعودية' : 'الإمارات');
          setValue('city', data.city || '');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router, setValue]);

  const selectedCategory = watch("category");
  const selectedMetal = watch("metal");
  const selectedCountry = watch("country") || "مصر";
  const currency = CURRENCY_MAP[selectedCountry] || "جنيه";
  const subTypes = TYPES[selectedCategory] || [];
  const karatOptions = selectedMetal === "gold" ? GOLD_KARATS : SILVER_KARATS;

  // تحديث العيار تلقائيًا
  useEffect(() => {
    if (selectedCategory === "bullion") {
      setValue("karat", "24");
    } else {
      const defaultKarat = selectedMetal === "gold" ? "21" : "925";
      setValue("karat", defaultKarat);
    }
  }, [selectedMetal, selectedCategory, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    setValue("images", fileArray, { shouldValidate: true });
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('يجب تسجيل الدخول أولاً');
        router.push('/login');
        return;
      }

      // Update user profile if contact info changed
      const updateRes = await fetch('/api/user/update', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: (() => {
          const formData = new FormData();
          formData.append('name', data.name);
          formData.append('phone', data.phone);
          formData.append('email', data.email);
          formData.append('country', data.country === 'مصر' ? 'egypt' : data.country === 'السعودية' ? 'saudi' : 'uae');
          formData.append('city', data.city);
          return formData;
        })(),
      });

      // Upload images
      const uploadedPaths: string[] = [];
      for (const file of data.images) {
        const formData = new FormData();
        formData.append('file', file);
        
        const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
        });
        
        const uploadData = await uploadRes.json();
        if (uploadData.data?.path) {
          uploadedPaths.push(uploadData.data.path);
        }
      }

      // Create product
      const productData = {
        title: data.title,
        metal: data.metal,
        category: data.category,
        product_type: data.type,
        karat: data.karat,
        price: data.price,
        description: data.description,
        contact_name: data.name,
        contact_phone: data.phone,
        contact_email: data.email,
        country: data.country === 'مصر' ? 'egypt' : data.country === 'السعودية' ? 'saudi' : 'uae',
        city: data.city,
        images: uploadedPaths,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'فشل إضافة المنتج');
      }

      alert('تم إضافة المنتج بنجاح! في انتظار موافقة الإدارة');
      previewImages.forEach(URL.revokeObjectURL);
      router.push('/account');
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'حدث خطأ أثناء إضافة المنتج');
    }
  };

  return (
    <div dir="rtl" className="max-w-2xl mx-auto p-4 md:p-6 my-10">
      {loading ? (
        <div className="text-center py-10">جاري التحميل...</div>
      ) : (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-yellow-600">
            إضافة منتج جديد
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* بيانات التواصل */}
            <div className="border-b pb-4 mb-5">
              <h3 className="text-lg font-semibold text-yellow-700 mb-3">
                بيانات التواصل
              </h3>
              <div>
                <Label className="flex items-center gap-2 mb-1">
                  <FiUser className="text-yellow-500" /> الاسم الكامل
                </Label>
                <Input {...register("name")} />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <FiPhone className="text-yellow-500" /> رقم الهاتف
                  </Label>
                  <Input {...register("phone")} placeholder="01xxxxxxxxx" />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <FiMail className="text-yellow-500" /> البريد الإلكتروني
                  </Label>
                  <Input type="email" {...register("email")} />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <FiMapPin className="text-yellow-500" /> الدولة
                  </Label>
                  <select
                    {...register("country")}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                  >
                    <option value="مصر">مصر</option>
                    <option value="الإمارات">الإمارات</option>
                    <option value="السعودية">السعودية</option>
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-sm">
                      {errors.country.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="flex items-center gap-2 mb-1">
                    <FiMapPin className="text-yellow-500" /> المدينة
                  </Label>
                  <select
                    {...register("city")}
                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                  >
                    {(CITIES[selectedCountry] || []).map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* العنوان */}
            <div>
              <Label className="flex items-center gap-2 mb-1">
                <FiTag className="text-yellow-500" /> العنوان
              </Label>
              <Input {...register("title")} />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* الفئة + النوع */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block mb-1">الفئة</Label>
                <select
                  {...register("category")}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="block mb-1">النوع</Label>
                <select
                  {...register("type")}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white"
                >
                  {subTypes.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <p className="text-red-500 text-sm">{errors.type.message}</p>
                )}
              </div>
            </div>

            {/* المعدن، العيار، السعر */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="block mb-1">المعدن</Label>
                <select
                  {...register("metal")}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white"
                >
                  <option value="gold">ذهب</option>
                  <option value="silver">فضة</option>
                </select>
              </div>
              <div>
                <Label className="block mb-1">العيار</Label>
                <select
                  {...register("karat")}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white"
                  disabled={selectedCategory === "bullion"}
                >
                  {karatOptions.map((k) => (
                    <option key={k} value={k}>
                      {selectedMetal === "gold" ? `عيار ${k}` : k}
                    </option>
                  ))}
                </select>
                {errors.karat && (
                  <p className="text-red-500 text-sm">{errors.karat.message}</p>
                )}
              </div>
              <div>
                <Label className="block mb-1">السعر ({currency})</Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register("price", { valueAsNumber: true })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
            </div>

            {/* الوصف - باستخدام textarea عادي */}
            <div>
              <Label className="flex items-center gap-2 mb-1">
                <FiFileText className="text-yellow-500" /> الوصف
              </Label>
              <textarea
                {...register("description")}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* رفع الصور */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <FiImage className="text-yellow-500" /> الصور
              </Label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full border-dashed border-2 border-gray-400 text-gray-600 hover:bg-gray-50"
                onClick={triggerFileInput}
              >
                اختر صورًا (يمكنك اختيار أكثر من صورة)
              </Button>
              {errors.images?.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.images.message as string}
                </p>
              )}
              {previewImages.length > 0 && (
                <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                  {previewImages.map((src, i) => (
                    <div
                      key={i}
                      className="shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={src}
                        width={96}
                        height={96}
                        alt={`معاينة ${i + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-medium rounded-lg transition"
            >
              {isSubmitting ? "جاري الحفظ..." : "إضافة المنتج"}
            </Button>
          </form>
        </CardContent>
      </Card>
      )}
    </div>
  );
}
