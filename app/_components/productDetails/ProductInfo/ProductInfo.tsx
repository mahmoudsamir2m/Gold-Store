import AddToCartButton from "@/app/_components/AddToCartButton/AddToCartButton";
import { Product } from "@/app/_components/productDetails/types/types";

export default function ProductInfo({ product }: { product: Product }) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-xl ${
            i <= Math.floor(product.rating)
              ? "text-yellow-500"
              : "text-gray-300"
          }`}
        >
          ★
        </span>
      );
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-right">{product.title}</h1>
      <div className="flex items-center justify-end gap-2">
        {renderStars()}
        <span className="text-sm text-gray-600">
          ({product.reviewsCount} تقييم)
        </span>
      </div>

      <div className="flex items-center justify-end gap-3">
        <span className="text-3xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </span>
        {product.originalPrice && (
          <span className="text-sm text-gray-500 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
      </div>

      <AddToCartButton title={product.title} />

      <div className="text-right space-y-4 mt-6">
        <div>
          <h3 className="font-semibold text-lg">وصف المنتج</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>
        <div>
          <h3 className="font-semibold">الشحن</h3>
          <p className="text-sm text-gray-700">توصيل سريع خلال 3-5 أيام عمل.</p>
        </div>
        <div>
          <h3 className="font-semibold">الإرجاع</h3>
          <p className="text-sm text-gray-700">
            مسموح بالإرجاع خلال 14 يومًا من الاستلام.
          </p>
        </div>
      </div>
    </div>
  );
}
