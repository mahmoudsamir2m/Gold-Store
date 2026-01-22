export interface ProductCardProps {
  id: number;
  images: string[];
  title: string;
  rating: number;
  karat: number;
  width: string;
  label?: string;
  country?: string;
  weight?: number;
}