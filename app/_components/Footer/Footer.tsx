"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineShieldCheck } from "react-icons/hi";
import {
  RiInstagramLine,
  RiTwitterLine,
  RiLinkedinLine,
  RiFacebookLine,
} from "react-icons/ri";

export default function Footer() {
  return (
    <footer dir="rtl" className="bg-[#042D24] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* Logo + description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/icon-gold.png" alt="دهبنا" width={70} height={70} />
              <span className="text-xl font-bold text-yellow-400">دهبنا</span>
            </div>

            <p className="text-gray-300 leading-relaxed max-w-md">
              اكتشف مجوهرات ذهبية فاخرة تجمع بين الأناقة والجودة ولمعان لا مثيل
              له.
            </p>
          </div>

          {/* خواتم */}
          <div>
            <h3 className="font-semibold text-lg mb-3">الخواتم</h3>
            <ul className="space-y-1 text-gray-300">
              <li>خاتم بسيط</li>
              <li>خاتم ختم</li>
              <li>خاتم بحجر</li>
            </ul>
          </div>

          {/* الأقراط */}
          <div>
            <h3 className="font-semibold text-lg mb-3">الأقراط</h3>
            <ul className="space-y-1 text-gray-300">
              <li>حلق صغير</li>
              <li>حلق دائري</li>
              <li>حلق طويل</li>
            </ul>
          </div>

          {/* الأساور */}
          <div>
            <h3 className="font-semibold text-lg mb-3">الأساور</h3>
            <ul className="space-y-1 text-gray-300">
              <li>إسوارة عريضة</li>
              <li>إسوارة مزينة</li>
              <li>إسوارة كاف</li>
            </ul>
          </div>

          {/* العقود */}
          <div>
            <h3 className="font-semibold text-lg mb-3">العقود</h3>
            <ul className="space-y-1 text-gray-300">
              <li>سلسلة ذهب</li>
              <li>عقد بندنت</li>
              <li>طبقات</li>
            </ul>
          </div>

          {/* privacy-policy */}
          <Link
            href="/privacy-policy"
            className="lg:col-span-1 flex flex-col justify-start"
          >
            <div className="flex items-center gap-2 text-yellow-400 text-2xl hover:text-yellow-600">
              <HiOutlineShieldCheck className="w-8 h-8" />
              <h3 className="font-semibold text-lg mb-1">سياسة الخصوصية</h3>
            </div>
          </Link>
        </div>

        {/* bottom line */}
        <div className="border-t mb-10 md:mb-0 border-gray-600 mt-10 pt-4 text-center text-gray-400 text-sm">
          © 2025 TrueCode. جميع الحقوق محفوظة. يمنع النسخ أو التوزيع دون إذن.
        </div>
      </div>
    </footer>
  );
}
