export interface Review {
  rating: number;
  title: string;
  comment: string;
  author: string;
  date: string;
}

export interface ProductProps {
  id: number;
  title: string;
  category: string;
  type: string;
  metal: "gold" | "silver";
  karat: string;
  rating: number;
  price: number;
  originalPrice: number;
  reviewsCount: number;
  description: string;
  images: string[];
  reviews: Review[];
}
