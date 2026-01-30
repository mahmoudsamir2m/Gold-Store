"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { useEffect, useState } from "react";

interface LinkItem {
  id: number;
  name: string;
  value: string;
  type: string | null;
  description: string;
  created_at: string;
  updated_at: string;
}

export default function Footer() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  const [meta, setMeta] = useState<any>(null);

  // ✅ تفعيل التصفح حسب حجم الشاشة
  const [enablePagination, setEnablePagination] = useState(true);

  // ✅ تحسين الاستجابة للشاشة
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // تحسين التصميم لجميع أحجام الشاشات
      if (width >= 1280) {
        setEnablePagination(false);
        setPerPage(8);
      } else if (width >= 1024) {
        setEnablePagination(true);
        setPerPage(6);
      } else if (width >= 768) {
        setEnablePagination(true);
        setPerPage(4);
      } else {
        setEnablePagination(true);
        setPerPage(3);
      }

      // تأكد من العودة لصفحة أولى عند تغيير العرض
      setPage(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/outside-links?page=${page}&per_page=${perPage}`,
        );
        const data = await res.json();

        if (data.success) {
          setLinks(data.data);
          setMeta(data.meta);
        }
      } catch (error) {
        console.error("Error fetching links:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, [page, perPage]);

  const totalPages = meta?.last_page || 1;

  return (
    <footer dir="rtl" className="bg-[#042D24] text-white py-10 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* القسم العلوي: الشعار والوصف */}
          <div className="text-center mb-10 px-4">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Image
                src="/icon-gold.png"
                alt="دهبنا"
                width={70}
                height={70}
                className="rounded-full"
              />
              <span className="text-2xl md:text-3xl font-bold text-yellow-400">
                دهبنا
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
              اكتشف مجوهرات ذهبية فاخرة تجمع بين الأناقة والجودة ولمعان لا مثيل
              له.
            </p>
          </div>

          {/* سياسة الخصوصية */}
          <div className="max-w-2xl mx-auto mb-10 px-4">
            <Link href="/privacy-policy" prefetch={false} className="pt-10">
              <div className="flex justify-center items-center gap-2 text-yellow-400 hover:text-yellow-600 transition-colors">
                <HiOutlineShieldCheck className="w-10 h-10" />
                <h3 className="font-semibold text-xl md:text-2xl">
                  سياسة الخصوصية
                </h3>
              </div>
            </Link>
          </div>
        </div>

        {/* روابط خارجية */}
        <div className="mb-10">
          <h3 className="text-yellow-400 text-xl md:text-2xl font-semibold text-center mb-6">
            روابط خارجية
          </h3>

          {loading ? (
            <div className="text-gray-400 text-center py-8">
              جاري التحميل...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {links.map((link) => (
                  <Link
                    key={link.id}
                    href={link.value}
                    prefetch={false}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900/50 p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 block border border-gray-800 hover:border-yellow-400/50"
                  >
                    <h4 className="text-yellow-400 font-semibold text-lg mb-2 text-center">
                      {link.name}
                    </h4>
                    <p className="text-gray-300 text-sm text-center leading-relaxed">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>

              {/* تصفح */}
              {enablePagination && totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-6">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-md bg-gray-900/50 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800/70 transition"
                  >
                    السابق
                  </button>

                  <span className="text-gray-300 text-sm">
                    صفحة {page} من {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded-md bg-gray-900/50 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800/70 transition"
                  >
                    التالي
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* خط فاصل وحقوق النشر */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm md:text-base">
          <p>
            © 2025 TrueCode. جميع الحقوق محفوظة. يمنع النسخ أو التوزيع دون إذن.
          </p>
        </div>
      </div>
    </footer>
  );
}
