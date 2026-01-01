import { z } from "zod";

const allowedCategories = ["jewelry", "bullion"] as const;
const allowedTypes = [
  "Necklaces",
  "Rings",
  "Bracelets",
  "Earrings",
  "Wedding Bands",
  "Bars",
  "Coins",
] as const;

const goldKarats = ["24", "22", "21", "18"] as const;
const silverKarats = ["925", "900", "800"] as const;

const fileSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= 5 * 1024 * 1024,
    "يجب أن يكون حجم الصورة أقل من 5 ميجابايت"
  )
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    "الملف يجب أن يكون صورة (JPEG, PNG, WebP)"
  );

// الدول المدعومة
const SUPPORTED_COUNTRIES = ["مصر", "السعودية", "الإمارات"] as const;

export const productFormSchema = z
  .object({
    title: z.string().min(1, "العنوان مطلوب"),
    category: z.enum(allowedCategories, { message: "الفئة غير صالحة" }),
    type: z.enum(allowedTypes, { message: "النوع غير صالح" }),
    metal: z.enum(["gold", "silver"]),
    karat: z.string().min(1, "العيار مطلوب"),
    price: z.number().positive("السعر يجب أن يكون أكبر من 0"),
    description: z.string().min(10, "الوصف قصير جدًا"),
    images: z.array(fileSchema).min(1, "يجب رفع صورة واحدة على الأقل"),
    name: z.string().min(1, "الاسم مطلوب"),
    phone: z.string().min(1, "رقم الهاتف مطلوب"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    country: z.enum(SUPPORTED_COUNTRIES, { message: "الدولة غير مدعومة" }),
    city: z.string().min(1, "المدينة مطلوبة"),
  })
  // التحقق من العيار حسب المعدن
  .refine(
    (data) => {
      if (data.metal === "gold") {
        return goldKarats.includes(data.karat as any);
      } else if (data.metal === "silver") {
        return silverKarats.includes(data.karat as any);
      }
      return false;
    },
    {
      message: "العيار غير صحيح للمعدن المختار",
      path: ["karat"],
    }
  )
  // التحقق من رقم الهاتف حسب الدولة
  .refine(
    (data) => {
      const { phone, country } = data;
      const cleanedPhone = phone.replace(/\D/g, '');

      if (country === "مصر") {
        return /^01[0125][0-9]{8}$/.test(cleanedPhone);
      }
      if (country === "السعودية") {
        return /^(05|5)[0-9]{8}$/.test(cleanedPhone);
      }
      if (country === "الإمارات") {
        return /^(05|5)[0-9]{7,8}$/.test(cleanedPhone);
      }
      return true;
    },
    {
      message: "رقم الهاتف غير صحيح. مصر: 01xxxxxxxxx، السعودية: 05xxxxxxxx، الإمارات: 05xxxxxxx",
      path: ["phone"],
    }
  );
