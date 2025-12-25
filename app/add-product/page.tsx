"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema } from "./schemas/productSchema";
import type {
  ProductFormData,
  MetalType,
  KaratType,
} from "./types/ProductFormTypes";
import {
  FiTag,
  FiUser,
  FiPhone,
  FiMail,
  FiFileText,
  FiImage,
  FiMapPin,
} from "react-icons/fi";
import Image from "next/image";

// الفئات
const CATEGORIES = [
  "سلسلة",
  "خاتم",
  "سوار",
  "أقراط",
  "خاتم زفاف",
  "سبيكة",
  "عملة",
];

// الأنواع
const TYPES = [
  { label: "سلاسل", value: "Necklaces" },
  { label: "خواتم", value: "Rings" },
  { label: "أساور", value: "Bracelets" },
  { label: "أقراط", value: "Earrings" },
  { label: "خواتم زفاف", value: "Wedding Bands" },
  { label: "سبائك", value: "Bars" },
  { label: "عملات", value: "Coins" },
];

const GOLD_KARATS = ["24", "22", "21", "18"];
const SILVER_KARATS = ["925", "900", "800"];

export default function ProductForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [metal, setMetal] = useState<MetalType>("gold");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "سبيكة ذهب عيار 24",
      category: "سبيكة",
      type: "Bars",
      metal: "gold",
      karat: "24",
      price: 2500.0,
      description: "سبيكة ذهب خالص عيار 24، مناسبة للاستثمار.",
      images: [],
      name: "",
      phone: "",
      email: "",
      country: "",
      city: "",
    },
  });

  const selectedMetal = watch("metal");
  useEffect(() => {
    setMetal(selectedMetal);
    const defaultKarat = selectedMetal === "gold" ? "21" : "925";
    setValue("karat", defaultKarat as KaratType);
  }, [selectedMetal, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    setValue("images", fileArray, { shouldValidate: true });

    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data: ProductFormData) => {
    console.log("Form Data (with English type):", {
      ...data,
      images: data.images.map((f) => f.name),
    });

    previewImages.forEach((url) => URL.revokeObjectURL(url));
  };

  const karatOptions = metal === "gold" ? GOLD_KARATS : SILVER_KARATS;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6 my-15 bg-white rounded-xl shadow-lg"
      dir="rtl"
    >
      <h2 className="text-2xl font-bold text-primary-600 mb-6 text-center">
        إضافة منتج جديد
      </h2>

      <div className="space-y-5">
        {/* العنوان */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FiTag className="text-primary-500" />
            العنوان
          </label>
          <input
            {...register("title")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* الفئة + النوع (النوع بالعربية في الواجهة) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الفئة
            </label>
            <select
              {...register("category")}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              النوع
            </label>
            <select
              {...register("type")}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white"
            >
              {TYPES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>
        </div>

        {/* المعدن، العيار، السعر */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              المعدن
            </label>
            <select
              {...register("metal")}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white"
            >
              <option value="gold">ذهب</option>
              <option value="silver">فضة</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              العيار
            </label>
            <select
              {...register("karat")}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white"
            >
              {karatOptions.map((k) => (
                <option key={k} value={k}>
                  {metal === "gold" ? `عيار ${k}` : k}{" "}
                </option>
              ))}
            </select>
            {errors.karat && (
              <p className="text-red-500 text-sm">{errors.karat.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              السعر (دولار)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
        </div>

        {/* الوصف */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FiFileText className="text-primary-500" />
            الوصف
          </label>
          <textarea
            {...register("description")}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* رفع الصور */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FiImage className="text-primary-500" />
            الصور (اختر من جهازك)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            type="button"
            onClick={triggerFileInput}
            className="w-full py-2 px-4 border border-dashed border-gray-400 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            اختر صورًا (يمكنك اختيار أكثر من صورة)
          </button>
          {errors.images?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.images.message as string}
            </p>
          )}

          {previewImages.length > 0 && (
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
              {previewImages.map((src, i) => (
                <div
                  key={i}
                  className="shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden"
                >
                  <Image
                    src={src}
                    width={96}
                    height={96}
                    alt={`Preview ${i + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* بيانات التواصل */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold text-primary-600 mb-4">
            بيانات التواصل
          </h3>

          <div>
            <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FiUser className="text-primary-500" />
              الاسم الكامل
            </label>
            <input
              {...register("name")}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FiPhone className="text-primary-500" />
                رقم الهاتف
              </label>
              <input
                {...register("phone")}
                placeholder="01xxxxxxxxx"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FiMail className="text-primary-500" />
                البريد الإلكتروني
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FiMapPin className="text-primary-500" />
                الدولة
              </label>
              <input
                {...register("country")}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="مصر"
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FiMapPin className="text-primary-500" />
                المدينة
              </label>
              <input
                {...register("city")}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="القاهرة"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
            isSubmitting
              ? "bg-primary-400"
              : "bg-primary-600 hover:bg-primary-500"
          } transition-colors duration-200`}
        >
          {isSubmitting ? "جاري الإرسال..." : "إضافة المنتج"}
        </button>
      </div>
    </form>
  );
}
