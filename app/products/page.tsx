import { Suspense } from "react";
import ProductsPageContent from "./ProductsPageContent";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={<div className="text-center py-10 min-h-screen flex items-center justify-center"> <span>جاري التحميل...</span></div>}
    >
      <ProductsPageContent />
    </Suspense>
  );
}
