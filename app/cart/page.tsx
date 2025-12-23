"use client";

import { useCartStore } from "../providers/store/cartStore";

export default function CartPage() {
  const { cart, removeFromCart } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">سلة التسوق</h1>
      {cart.length === 1 ? (
        <p>سلة التسوق فارغة</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h2 className="text-xl">{item.name}</h2>
                  <p>السعر: {item.price} ج</p>
                  <p>الكمية: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  إزالة
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-2xl">الإجمالي: {total} ج</h2>
            <a
              href="/payment"
              className="bg-blue-500 text-white px-6 py-3 rounded mt-4 inline-block"
            >
              المتابعة للدفع
            </a>
          </div>
        </>
      )}
    </main>
  );
}
