// app/_components/productDetails/ProductReviews/ProductReviews.tsx
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Review } from "@/app/_components/productDetails/types/types";

interface ProductReviewsProps {
  reviews: Review[];
  rating: number;
  reviewsCount: number;
  onAddReview?: (review: {
    rating: number;
    title: string;
    comment: string;
  }) => void;
  token?: string | null;
}

export default function ProductReviews({
  reviews,
  rating,
  reviewsCount,
  onAddReview,
  token,
}: ProductReviewsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
  });

  const renderStars = (rate?: number) => {
    const stars = [];
    const r = rate ?? rating;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-xl cursor-pointer ${
            i <= Math.floor(r) ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => {
            if (token) {
              setNewReview((prev) => ({ ...prev, rating: i }));
            }
          }}
        >
          ★
        </span>
      );
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("يجب تسجيل الدخول لإضافة تقييم");
      return;
    }
    if (!newReview.title.trim() || !newReview.comment.trim()) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }
    onAddReview?.(newReview);
    setIsAdding(false);
    setNewReview({ rating: 5, title: "", comment: "" });
  };

  return (
    <div className="mt-16 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-right">
        آراء العملاء والتقييمات
      </h2>

      {/* مربع إضافة تقييم (يظهر عند تسجيل الدخول) */}
      {token && (
        <div className="mb-10 p-6 border border-gray-200 rounded-xl bg-gray-50">
          <h3 className="font-bold text-lg text-right mb-4">أضف تقييمك</h3>
          <form onSubmit={handleAddReview}>
            {/* التقييم بالنجوم */}
            <div className="mb-4">
              <label className="block text-right mb-2">تقييمك</label>
              <div className="flex justify-end">
                {renderStars(newReview.rating)}
              </div>
            </div>

            {/* العنوان */}
            <div className="mb-4">
              <label className="block text-right mb-2">العنوان</label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) =>
                  setNewReview({ ...newReview, title: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md text-right"
                placeholder="مثال: منتج ممتاز"
              />
            </div>

            {/* التعليق */}
            <div className="mb-6">
              <label className="block text-right mb-2">التعليق</label>
              <textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md text-right"
                placeholder="شاركنا رأيك بالتفصيل..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-md"
              >
                إضافة التقييم
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ملخص التقييمات */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-10 mb-10">
        <div className="md:w-1/3 text-center">
          <span className="text-5xl font-bold text-yellow-500">{rating}</span>
          <div className="flex justify-center my-2">{renderStars()}</div>
          <p className="text-gray-600 text-sm">
            بناءً على {reviewsCount} تقييم
          </p>
        </div>

        {reviewsCount > 0 && (
          <div className="w-2/3 space-y-3">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter(
                (r) => Math.floor(r.rating) === star
              ).length;
              const width = reviewsCount > 0 ? (count / reviewsCount) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="w-12 text-right">{star} نجوم</span>
                  <div className="flex-1 bg-gray-200 h-2 rounded-full relative">
                    <div
                      className="bg-yellow-500 h-full rounded-full"
                      style={{ width: `${width}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* قائمة التقييمات */}
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">لا توجد تقييمات حتى الآن.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="mt-8 border-t pt-6 text-right">
            <div className="flex text-yellow-500 text-lg">
              {"★".repeat(Math.floor(review.rating))}
            </div>
            <p className="font-semibold mt-2">{review.title}</p>
            <p className="text-gray-700 text-sm">{review.comment}</p>
            <p className="text-gray-500 text-xs mt-1">
              - {review.author}, {review.date}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
