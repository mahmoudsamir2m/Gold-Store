"use client";

import { useState } from "react";
import { useCartStore } from "../providers/store/cartStore";

export default function PaymentPage() {
  const { cart, clearCart } = useCartStore();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can add logic to send order to backend
    setConfirmed(true);
    clearCart();
  };

  if (confirmed) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">تم تأكيد الطلب</h1>
        <p>شكراً لك! سيتم تسليم طلبك عند الدفع نقداً.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">الدفع</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl mb-4">ملخص الطلب</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>{item.price * item.quantity} ج</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-4">
            <strong>الإجمالي: {total} ج</strong>
          </div>
        </div>
        <div>
          <h2 className="text-2xl mb-4">بيانات التسليم</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">الاسم</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">العنوان</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">رقم الهاتف</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border px-3 py-2"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded"
            >
              تأكيد الطلب (دفع عند التسليم)
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
