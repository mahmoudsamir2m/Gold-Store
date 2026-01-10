export type MetalType = "gold" | "silver";
export type KaratType = string;

export type CategoryType = "jewelry" | "bullion"; // ملاحظة: في الفورم، القيمة "jewelry" مش "سلسلة"!

export type TypeType =
  | "Necklaces"
  | "Rings"
  | "Bracelets"
  | "Earrings"
  | "Wedding Bands"
  | "Bars"
  | "Coins";

export type CountryType = "مصر" | "السعودية" | "الإمارات";

export interface ProductFormData {
  title: string;
  category: CategoryType;
  type: TypeType;
  metal: MetalType;
  karat: KaratType;
  price: number;
  weight: number;
  description: string;
  images: File[];
  name: string;
  phone: string;
  email: string;
  country: CountryType;
  city: string;
}
