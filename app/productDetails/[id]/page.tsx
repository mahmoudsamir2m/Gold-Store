import { notFound } from "next/navigation";
import Image from "next/image";
import { products } from "../../_components/Home/ProductsSection/data";
import AddToCartButton from "@/app/_components/AddToCartButton/AddToCartButton";


function getProductById(id: string) {
  return products.find((product) => product.id.toString() === id) || null;
}


export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return notFound();
  }

  // عرض النجوم 
  const renderStars = () => {
    const stars = [];
    const rating = product.rating;
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(
          <span key={i} className="text-yellow-500 text-lg">
            ★
          </span>
        );
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(
          <span key={i} className="text-yellow-500 text-lg opacity-50">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-400 text-lg">
            ★
          </span>
        );
      }
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="container max-w-6xl mx-auto  p-12 bg-white text-gray-900 min-h-screen">
      <div
        className="flex flex-col md:flex-row-reverse gap-10 dir-rtl"
        dir="rtl"
      >
        {/* الصورة */}
        <div className="md:w-1/2">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md ">
            <Image
              src={product.image}
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* المعلومات */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold text-right">{product.title}</h1>

          <div className="flex items-center justify-end gap-2">
            {renderStars()}
            <span className="text-sm text-gray-600">
              ({Math.floor(Math.random() * 50 + 20)} تقييم)
            </span>
          </div>

          <div className="flex items-center justify-end gap-3">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* زر "أضف إلى السلة"  'use client' */}
          <AddToCartButton title={product.title} />

          <div className="text-right space-y-3 mt-6">
            <div>
              <h3 className="font-semibold text-lg">وصف المنتج</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                قطعة فاخرة مصنوعة من الذهب عيار 24 قيراط، بتصميم كلاسيكي يناسب
                جميع المناسبات.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">الشحن</h3>
              <p className="text-sm text-gray-700">
                توصيل سريع خلال 3-5 أيام عمل.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">الإرجاع</h3>
              <p className="text-sm text-gray-700">
                مسموح بالإرجاع خلال 14 يومًا.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



