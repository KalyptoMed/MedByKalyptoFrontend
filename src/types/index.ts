import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount?: number;
  image: StaticImageData | string;
  category: string;
  brand?: string;
  genericName?: string;
  inStock: boolean;
  howToUse?: string;
  fullDescription?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "vendor" | "admin";
  avatar?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  deliveryAddress: DeliveryAddress;
}

export interface DeliveryAddress {
  firstName: string;
  surname: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNo: string;
}
