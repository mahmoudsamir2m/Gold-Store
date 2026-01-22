// app/product/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Product, Review } from "@/app/_components/productDetails/types/types";
import { useAuthStore } from "@/app/stores/auth/auth.store";

// مكونات الواجهة
import ImagesSlider from "@/app/_components/ImagesSlider/ImagesSlider";
import ProductInfo from "@/app/_components/productDetails/ProductInfo/ProductInfo";
import ProductReviews from "@/app/_components/productDetails/ProductReviews/ProductReviews";
import RelatedProducts from "@/app/_components/productDetails/RelatedProducts/RelatedProducts";

const decodeUnicode = (str: string): string => {
  if (typeof str !== "string") return "";
  try {
    return str.replace(/\\u([0-9a-fA-F]{4})/g, (_, g1) =>
      String.fromCharCode(parseInt(g1, 16))
    );
  } catch {
    return str;
  }
};

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string };
  const token = useAuthStore((state) => state.token);

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<{
    average_rating: number;
    total_reviews: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: "",
    comment: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // === جلب المنتج ===
        const productRes = await fetch(`/api/product/${id}`);
        if (!productRes.ok) {
          router.push("/not-found"); // أو استخدام صفحة مخصصة
          return;
        }

        // ✅ استخدام .text() لمعالجة Unicode
        const text = await productRes.text();
        const externalProduct = JSON.parse(text);

        // ✅ تحويل مع فك التشفير
        const product: Product = {
          id: externalProduct.id,
          title: decodeUnicode(externalProduct.title),
          metal: decodeUnicode(externalProduct.metal),
          category: decodeUnicode(externalProduct.category),
          product_type: decodeUnicode(externalProduct.product_type),
          karat: externalProduct.karat,
          weight: externalProduct.weight,
          label: decodeUnicode(externalProduct.label),
          images: Array.isArray(externalProduct.images)
            ? externalProduct.images.map((img: string) => img.trim())
            : [],
          description: decodeUnicode(externalProduct.description),
          contact_name: decodeUnicode(externalProduct.contact_name),
          contact_phone: externalProduct.contact_phone,
          contact_email: externalProduct.contact_email,
          country: decodeUnicode(externalProduct.country),
          city: decodeUnicode(externalProduct.city),
          rating: externalProduct.average_rating || 0,
          reviewsCount: externalProduct.reviews_count || 0,
        };
        setProduct(product);

        // === جلب الإحصائيات ===
        const statsRes = await fetch(`/api/product/${id}/reviews/stats`);
        if (statsRes.ok) {
          const statsText = await statsRes.text();
          const statsData = JSON.parse(statsText);
          setStats({
            average_rating: statsData.average_rating || 0,
            total_reviews: statsData.total_reviews || 0,
          });
        }

        // === جلب التقييمات ===
        const reviewsRes = await fetch(`/api/product/${id}/reviews?page=1`);
        if (reviewsRes.ok) {
          const reviewsText = await reviewsRes.text();
          const reviewsData = JSON.parse(reviewsText);
          const reviews: Review[] = (reviewsData.reviews || []).map(
            (r: any) => ({
              id: r.id,
              rating: r.rating,
              title: decodeUnicode(r.title),
              comment: decodeUnicode(r.comment),
              author: decodeUnicode(r.user?.name) || "مستخدم مجهول",
              date: r.created_at_human || "",
            })
          );
          setReviews(reviews);
        }
      } catch (error) {
        console.error("فشل تحميل تفاصيل المنتج:", error);
        toast.error("حدث خطأ أثناء تحميل البيانات");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, router]);

  const handleAddReview = async (review: {
    rating: number;
    title: string;
    comment: string;
  }) => {
    if (!token) {
      toast.error("يجب تسجيل الدخول لإضافة تقييم");
      return;
    }

    const { rating, title, comment } = review;
    if (!title.trim() || !comment.trim()) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    try {
      const res = await fetch(`/api/product/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, title, comment }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "فشل إضافة التقييم");
        return;
      }

      setReviews((prev) => [
        {
          id: result.data.id,
          rating: result.data.rating,
          title: decodeUnicode(result.data.title),
          comment: decodeUnicode(result.data.comment),
          author: decodeUnicode(result.data.user?.name) || "أنت",
          date: result.data.created_at_human || "الآن",
        },
        ...prev,
      ]);

      if (stats) {
        const newTotal = stats.total_reviews + 1;
        const newAvg =
          (stats.average_rating * stats.total_reviews + rating) / newTotal;
        setStats({
          total_reviews: newTotal,
          average_rating: parseFloat(newAvg.toFixed(1)),
        });
      }

      toast.success("تم إضافة التقييم بنجاح");
    } catch (error) {
      console.error("خطأ في إرسال التقييم:", error);
      toast.error("حدث خطأ أثناء الإرسال");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl">جارٍ تحميل تفاصيل الاعلان...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            الاعلان غير موجود
          </h1>
          <p className="text-gray-600 mb-6">
            نأسف، لكننا لم نعثر على هذا الاعلان.
          </p>
          <Link
            href="/"
            className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600"
          >
            العودة إلى الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="container max-w-6xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row-reverse gap-10" dir="rtl">
          <div className="md:w-1/2">
            <ImagesSlider images={product.images} />
          </div>
          <div className="md:w-1/2">
            <ProductInfo product={product} />
          </div>
        </div>

        <ProductReviews
          reviews={reviews}
          rating={stats?.average_rating || 0}
          reviewsCount={stats?.total_reviews || 0}
          onAddReview={handleAddReview}
          token={token}
        />

        <RelatedProducts
          currentProductId={product.id}
          currentCategory={product.category}
        />
      </div>
    </div>
  );
}
