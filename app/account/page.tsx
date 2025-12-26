"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
// استيراد الأيقونات من React Icons
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

// ================= Dummy Data =================
const activeOrders = [
  { id: "ORD-101", total: "25,000 EGP", status: "قيد التنفيذ" },
  { id: "ORD-102", total: "12,500 EGP", status: "قيد الشحن" },
];

const completedOrders = [
  { id: "ORD-090", total: "18,000 EGP", status: "تم التنفيذ" },
];

// نوع البيانات للمنتجات
type SellingItem = {
  id: number;
  name: string;
  price: string;
  status: string;
  category: string;
  type: string;
  metal: string;
  karat: string;
  description: string;
  country: string;
  city: string;
};

// تعديل نوع البيانات ليحتوي على كل الحقول المطلوبة للتعديل
const sellingItems: SellingItem[] = [
  {
    id: 1,
    name: "سبيكة ذهب 10 جرام",
    price: "35,000",
    status: "معروض",
    category: "bullion",
    type: "Bars",
    metal: "gold",
    karat: "24",
    description: "سبيكة ذهب خالص عيار 24",
    country: "مصر",
    city: "القاهرة",
  },
  {
    id: 2,
    name: "جنيه ذهب",
    price: "27,000",
    status: "تم البيع",
    category: "bullion",
    type: "Coins",
    metal: "gold",
    karat: "22",
    description: "جنيه ذهب استثماري",
    country: "مصر",
    city: "الجيزة",
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Mahmoud Samir",
    email: "mahmoud@email.com",
    phone: "01000000000",
  });

  // دالة لحذف منتج
  const handleDelete = (id: number) => {
    if (confirm("هل أنت متأكد أنك تريد حذف هذا المنتج؟")) {
      console.log("تم حذف المنتج برقم:", id);
      // هنا تُضيف الكود للاتصال بـ API لحذف المنتج
    }
  };

  // دالة لتعديل منتج → يُوجه إلى صفحة التعديل المنفصلة
  const handleEdit = (product: any) => {
    // تحويل السعر إلى رقم
    const priceAsNumber = parseFloat(product.price.replace(/,/g, "")) || 0;

    const productData = {
      title: product.name,
      category: product.category,
      type: product.type,
      metal: product.metal,
      karat: product.karat,
      price: priceAsNumber,
      description: product.description,
      country: product.country,
      city: product.city,
      // الصور والبيانات الشخصية ستحتاج لجلبها من مكان آخر — هنا نضع قيم افتراضية
      images: [],
      name: profile.name,
      phone: profile.phone,
      email: profile.email,
    };
    console.log("✅ البيانات المرسلة للتعديل:", productData);
    const encoded = encodeURIComponent(JSON.stringify(productData));
    router.push(`/edit-product?data=${encoded}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6" dir="rtl">
      {/* ===== Profile Info ===== */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-yellow-700">البيانات الشخصية</CardTitle>
          <Button
            className="border-yellow-500 text-yellow-600 hover:bg-yellow-600 hover:text-white"
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "حفظ" : "تعديل"}
          </Button>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>الاسم</Label>
            <Input
              disabled={!isEditing}
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>البريد الإلكتروني</Label>
            <Input disabled value={profile.email} />
          </div>
          <div className="space-y-2">
            <Label>رقم الهاتف</Label>
            <Input
              disabled={!isEditing}
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* ===== Selling Items ===== */}
      <Card>
        <CardHeader>
          <CardTitle className="text-yellow-700">
            المنتجات المعروضة للبيع
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sellingItems.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              لا توجد منتجات حالياً
            </p>
          ) : (
            sellingItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-lg p-3"
              >
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.price} ج.م
                  </p>
                </div>

                {/* الأيقونات */}
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(item)}
                    className="text-yellow-600 hover:bg-yellow-100"
                    aria-label="تعديل"
                  >
                    <FiEdit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:bg-red-100"
                    aria-label="حذف"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
