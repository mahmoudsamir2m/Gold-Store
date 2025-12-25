import { z } from "zod";

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size > 0, "يجب اختيار صورة")
  .refine((file) => file.type.startsWith("image/"), "الملف يجب أن يكون صورة");

// خيارات مسموحة
const allowedCategories = [
  "سلسلة",
  "خاتم",
  "سوار",
  "أقراط",
  "خاتم زفاف",
  "سبيكة",
  "عملة",
] as const;
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

export const productFormSchema = z
  .object({
    title: z.string().min(1, "العنوان مطلوب"),
    category: z.enum(allowedCategories, { message: "اختر فئة صحيحة" }),
    type: z.enum(allowedTypes, { message: "اختر نوعًا صحيحًا" }),
    metal: z.enum(["gold", "silver"] as const),
    karat: z.string().min(1, "العيار مطلوب"),
    price: z.number().positive("السعر يجب أن يكون أكبر من 0"),
    description: z.string().min(10, "الوصف قصير جدًا"),
    images: z.array(fileSchema).min(1, "يجب رفع صورة واحدة على الأقل"),
    name: z.string().min(1, "الاسم مطلوب"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صحيح"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    country: z.string().min(1, "الدولة مطلوبة"),
    city: z.string().min(1, "المدينة مطلوبة"),
  })
  .refine(
    (data) => {
      if (data.metal === "gold") {
        return goldKarats.includes(data.karat as (typeof goldKarats)[number]);
      } else if (data.metal === "silver") {
        return silverKarats.includes(
          data.karat as (typeof silverKarats)[number]
        );
      }
      return false;
    },
    {
      message: "العيار غير صحيح للمعدن المختار",
      path: ["karat"],
    }
  );
