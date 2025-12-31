// app/_components/productDetails/types/types.ts

export type Product = {
  id: number;
  title: string;
  metal: string;
  category: string;
  product_type: string;
  karat: string;
  weight: string;
  price: number; 
  originalPrice?: number; 
  label: string;
  images: string[];
  description: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  country: string;
  city: string;
  rating: number;
  reviewsCount: number; 
};

export type Review = {
  id: number;
  rating: number;
  title: string;
  comment: string;
  author: string; // ← من user.name
  date: string; // ← من created_at_human
};
