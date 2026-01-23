export interface ProductCardProps {
  id: number;
  images: string[];
  title: string;
  rating: number;
  karat?: string;
  width: string;
  label?: string;
  weight?: number;
}