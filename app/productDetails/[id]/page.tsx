import { notFound } from "next/navigation";
import { products } from "@/app/_components/Home/ProductsSection/data";
import ImagesSlider from "@/app/_components/ImagesSlider/ImagesSlider";
import ProductInfo from "@/app/_components/productDetails/ProductInfo/ProductInfo";
import ProductReviews from "@/app/_components/productDetails/ProductReviews/ProductReviews";
import RelatedProducts from "@/app/_components/productDetails/RelatedProducts/RelatedProducts";

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

  if (!product) return notFound();

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="container max-w-6xl mx-auto bg-white p-10 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row-reverse gap-10" dir="rtl">
          {/* الصور */}
          <div className="md:w-1/2">
            <ImagesSlider images={product.images} />
          </div>

          {/* معلومات المنتج */}
          <div className="md:w-1/2">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* تقييمات العملاء */}
        <ProductReviews
          reviews={product.reviews}
          rating={product.rating}
          reviewsCount={product.reviewsCount}
        />

        {/* المنتجات المرتبطة */}
        <RelatedProducts
          currentProductId={product.id}
          currentCategory={product.category}
        />
      </div>
    </div>
  );
}
