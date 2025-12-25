export type MetalType = "gold" | "silver";
export type KaratType = string;

export type CategoryType =
  | "سلسلة"
  | "خاتم"
  | "سوار"
  | "أقراط"
  | "خاتم زفاف"
  | "سبيكة"
  | "عملة";
export type TypeType =
  | "Necklaces"
  | "Rings"
  | "Bracelets"
  | "Earrings"
  | "Wedding Bands"
  | "Bars"
  | "Coins";

export interface ProductFormData {
  title: string;
  category: CategoryType;
  type: TypeType;
  metal: MetalType;
  karat: KaratType;
  price: number;
  description: string;
  images: File[];
  name: string;
  phone: string;
  email: string;
  country: string;
  city: string;
}
