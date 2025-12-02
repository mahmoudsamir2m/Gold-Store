import { Review } from "@/app/_components/productDetails/types/types";

export default function ProductReviews({
  reviews,
  rating,
  reviewsCount,
}: {
  reviews: Review[];
  rating: number;
  reviewsCount: number;
}) {
  const renderStars = (rate?: number) => {
    const stars = [];
    const r = rate ?? rating;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-xl ${
            i <= Math.floor(r) ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </span>
      );
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  return (
    <div className="mt-16 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-right">
        آراء العملاء والتقييمات
      </h2>

      <div className="flex flex-col md:flex-row-reverse items-center gap-10">
        <div className="md:w-1/3 text-center">
          <span className="text-5xl font-bold text-yellow-500">{rating}</span>
          <div className="flex justify-center my-2">{renderStars()}</div>
          <p className="text-gray-600 text-sm">
            بناءً على {reviewsCount} تقييم
          </p>
        </div>

        <div className="w-2/3 space-y-3">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter(
              (r) => Math.floor(r.rating) === star
            ).length;
            const width = Math.min((count / reviews.length) * 100, 100);
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
      </div>

      {reviews.map((review, index) => (
        <div key={index} className="mt-8 border-t pt-6 text-right">
          <div className="flex text-yellow-500 text-lg">
            {"★".repeat(Math.floor(review.rating))}
          </div>
          <p className="font-semibold mt-2">{review.title}</p>
          <p className="text-gray-700 text-sm">{review.comment}</p>
          <p className="text-gray-500 text-xs mt-1">
            - {review.author}، {review.date}
          </p>
        </div>
      ))}
    </div>
  );
}
