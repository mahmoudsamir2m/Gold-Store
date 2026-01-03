import { Suspense } from "react";
import ProductsPageContent from "./ProductsPageContent";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={<div className="text-center py-10">جاري التحميل...</div>}
    >
      <ProductsPageContent />
    </Suspense>
  );
}
