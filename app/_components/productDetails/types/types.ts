export interface Review {
  rating: number;
  title: string;
  comment: string;
  author: string;
  date: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  images: string[];
  category: string;
  reviews: Review[];
}
