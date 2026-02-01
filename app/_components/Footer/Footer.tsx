"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineShieldCheck } from "react-icons/hi";
import {
  RiInstagramLine,
  RiTwitterXLine,
  RiLinkedinLine,
  RiFacebookLine,
  RiYoutubeLine,
  RiTiktokLine,
  RiWhatsappLine,
} from "react-icons/ri";
import { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";

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

  const getSocialIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    switch (lowerName) {
      case "facebook":
        return RiFacebookLine;
      case "youtube":
        return RiYoutubeLine;
      case "instagram":
        return RiInstagramLine;
      case "tiktok":
        return RiTiktokLine;
      case "whatsapp":
        return RiWhatsappLine;
      case "twitter":
      case "x":
        return RiTwitterXLine;
      case "linkedin":
        return RiLinkedinLine;
      default:
        return FaLink;
    }
  };

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch("/api/outside-links");
        const data = await res.json();
        if (data.success) setLinks(data.data);
      } catch (error) {
        console.error("Error fetching links:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const socialLinks = links.filter((link) => link.type === "social");
  const otherLinks = links.filter((link) => link.type === "other");

  return (
    <footer
      dir="rtl"
      className="bg-[#042D24] text-white pt-16 pb-8 border-t border-yellow-600/20"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* القسم الأول: العلامة التجارية */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-2 rounded-xl">
                <Image
                  src="/icon-gold.png"
                  alt="دهبنا"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-l from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
                دهبنا
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-lg">
              وجهتكم الأولى لاكتشاف أرقى المجوهرات الذهبية التي تجمع بين أصالة
              التصميم وجودة التصنيع، لنضفي لمسة من البريق على كل لحظاتكم.
            </p>
          </div>

          {/* القسم الثاني: روابط سريعة (Other Links) */}
          <div className="lg:col-span-4 lg:mr-auto">
            <h3 className="text-xl font-bold mb-6 border-r-4 border-yellow-500 pr-3">
              روابط تهمك
            </h3>
            <ul className="grid grid-cols-2 gap-y-4 gap-x-8 text-gray-300">
              {otherLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.value}
                    className="hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="h-1 w-1 bg-yellow-500 rounded-full group-hover:w-3 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* القسم الثالث: التواصل والخصوصية */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-6 border-r-4 border-yellow-500 pr-3">
                تابعنا على
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => {
                  const Icon = getSocialIcon(link.name);
                  return (
                    <Link
                      key={link.id}
                      href={link.value}
                      target="_blank"
                      className="bg-white/5 p-3 rounded-full hover:bg-yellow-500 hover:text-[#042D24] transition-all duration-300 text-yellow-500"
                    >
                      <Icon size={24} />
                    </Link>
                  );
                })}
              </div>
            </div>

            <Link
              href="/privacy-policy"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-yellow-500 hover:text-yellow-500 transition-all group"
            >
              <HiOutlineShieldCheck className="text-xl group-hover:rotate-12 transition-transform" />
              <span>سياسة الخصوصية والأمان</span>
            </Link>
          </div>
        </div>

        {/* خط النهاية والحقوق */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-gray-500 text-sm md:text-lg">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="text-yellow-600 font-semibold">TrueCode</span>.
              جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
