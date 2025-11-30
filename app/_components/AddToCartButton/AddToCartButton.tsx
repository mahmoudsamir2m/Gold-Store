"use client";
export default function AddToCartButton({ title }: { title: string }) {
  const handleClick = () => {
    alert(`تم إضافة "${title}" إلى السلة!`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition text-center"
    >
      أضف إلى السلة
    </button>
  );
}
