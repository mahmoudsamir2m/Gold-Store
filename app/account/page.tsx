"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "../stores/auth/auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import {
  profileSchema,
  COUNTRIES,
  COUNTRY_LABELS,
  type Country,
} from "./schema/profile.schema";
import Link from "next/link";

type SellingItem = {
  id: number;
  title: string;
  price: string;
  metal: string;
  category: string;
  product_type: string;
  karat: string;
  weight: number;
  description: string;
  country: string;
  city: string;
  images: string[];
};

export default function ProfilePage() {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    country: "egypt" as Country,
    city: "",
  });
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [sellingItems, setSellingItems] = useState<SellingItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ===== جلب بيانات المستخدم =====
  useEffect(() => {
    const fetchProfile = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        toast.error("يجب تسجيل الدخول أولاً");
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/user/me", {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "فشل تحميل البيانات");
        }

        const data = await res.json();

        // تأكد أن country ضمن القيم المسموح بها
        const apiCountry = (data.country?.toLowerCase() || "egypt") as string;
        const validCountry = COUNTRIES.includes(apiCountry as any)
          ? (apiCountry as Country)
          : "egypt";

        setProfile({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          country: validCountry,
          city: data.city || "",
        });
        setSellingItems(data.products || []);
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || "خطأ في تحميل البيانات");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  // ===== حفظ التعديلات =====
  const handleSave = async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      toast.error("يجب تسجيل الدخول أولاً");
      router.push("/login");
      return;
    }

    // تنظيف رقم الهاتف: تحويل 0101234567 → 1012345678
    const cleanPhone = profile.phone.replace(/\D/g, "");
    let phone10 = cleanPhone;
    if (cleanPhone.startsWith("0") && cleanPhone.length === 11) {
      phone10 = cleanPhone.substring(1);
    }

    const dataToValidate = {
      ...profile,
      phone: phone10,
      password: password.trim(),
      passwordConfirmation: passwordConfirmation.trim(),
    };

    // ✅ التحقق باستخدام Zod
    const result = profileSchema.safeParse(dataToValidate);
    if (!result.success) {
      const firstError = result.error.issues[0].message;
      toast.error(firstError);
      return;
    }

    const { name, email, phone, country, city, password: pwd } = result.data;

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("email", email.trim());
    formData.append("phone", phone);
    formData.append("country", country); // e.g., "egypt"
    formData.append("city", city.trim());

    if (pwd) {
      formData.append("password", pwd);
      formData.append("password_confirmation", passwordConfirmation.trim());
    }

    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        const errorMsg = result.message || result.error || "فشل التحديث";
        toast.error(errorMsg);
        console.error("Validation details:", result);
        return;
      }

      toast.success("تم تحديث البيانات بنجاح");
      setIsEditing(false);
      setPassword("");
      setPasswordConfirmation("");
    } catch (err: any) {
      console.error(err);
      toast.error("حدث خطأ أثناء الحفظ");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد أنك تريد حذف هذا المنتج؟")) return;

    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      toast.error("يجب تسجيل الدخول أولاً");
      return;
    }

    try {
      const res = await fetch(`/api/user/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "فشل الحذف");
      }

      setSellingItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("تم حذف المنتج بنجاح");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "حدث خطأ أثناء الحذف");
    }
  };

  const handleEdit = (product: SellingItem) => {
    const productData = {
      id: product.id,
      title: product.title,
      category: product.category,
      type: product.product_type,
      metal: product.metal,
      karat: product.karat,
      price: parseFloat(product.price) || 0,
      weight: product.weight,
      description: product.description,
      country: product.country,
      city: product.city,
      images: product.images,
      name: profile.name,
      phone: profile.phone,
      email: profile.email,
    };
    const encoded = encodeURIComponent(JSON.stringify(productData));
    router.push(`/edit-product?data=${encoded}`);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center min-h-screen flex items-center justify-center" dir="rtl">
       <span>
        جاري التحميل...
      </span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6" dir="rtl">
      {/* Profile Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-yellow-700">البيانات الشخصية</CardTitle>
          <Button
            variant="outline"
            className="border-yellow-500 text-yellow-600 hover:bg-yellow-600 hover:text-white"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
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
            <Input
              disabled={!isEditing}
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>رقم الهاتف</Label>
            <Input
              disabled={!isEditing}
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              placeholder="مثال: 1012345678"
            />
          </div>
          <div className="space-y-2">
            <Label>الدولة</Label>
            <select
              disabled={!isEditing}
              value={profile.country}
              onChange={(e) =>
                setProfile({ ...profile, country: e.target.value as Country })
              }
              className="w-full p-2 border rounded-md bg-white disabled:bg-gray-100"
            >
              {COUNTRIES.map((code) => (
                <option key={code} value={code}>
                  {COUNTRY_LABELS[code]}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>المدينة</Label>
            <Input
              disabled={!isEditing}
              value={profile.city}
              onChange={(e) => setProfile({ ...profile, city: e.target.value })}
            />
          </div>

          {isEditing && (
            <>
              <div className="space-y-2">
                <Label>كلمة المرور (اختياري)</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="اتركه فارغًا إن لم ترد التغيير"
                />
              </div>
              <div className="space-y-2">
                <Label>تأكيد كلمة المرور</Label>
                <Input
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="أعد إدخال كلمة المرور"
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Selling Items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-yellow-700">
            الاعلانات المعروضة للبيع
          </CardTitle>
          <Link
            href="/add-product"
            className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
          >
            إضافة اعلان جديد
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {sellingItems.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              لا توجد اعلانات حالياً
            </p>
          ) : (
            sellingItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-lg p-3"
              >
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                </div>
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
