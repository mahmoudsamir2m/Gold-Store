import { z } from "zod";

export const COUNTRIES = ["egypt", "uae", "saudi"] as const;
export type Country = (typeof COUNTRIES)[number];

export const COUNTRY_LABELS: Record<Country, string> = {
  egypt: "مصر",
  uae: "الإمارات",
  saudi: "السعودية",
};

export const profileSchema = z
  .object({
    name: z.string().min(2, "الاسم يجب أن يكون على الأقل حرفين"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    phone: z
      .string()
      .regex(/^\d{10}$/, "يجب أن يكون رقم الهاتف 10 أرقام (مثال: 1012345678)"),
    country: z.enum(COUNTRIES).refine((val) => COUNTRIES.includes(val), {
      message: "يرجى اختيار دولة من القائمة",
    }),
    city: z.string().min(2, "المدينة يجب أن تكون على الأقل حرفين"),
    password: z.string().optional(),
    passwordConfirmation: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password && data.password !== data.passwordConfirmation) {
        return false;
      }
      return true;
    },
    {
      message: "كلمة المرور وتأكيد كلمة المرور غير متطابقين",
      path: ["passwordConfirmation"],
    }
  );
