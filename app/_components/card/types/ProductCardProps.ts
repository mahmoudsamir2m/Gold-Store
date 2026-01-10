export interface ProductCardProps {
  id: number;
  images: string[];
  title: string;
  rating: number;
  price: number;
  originalPrice?: number;
  width: string;
  label?: string;
  country?: string;
  weight?: number;
}