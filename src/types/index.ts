export interface Product {
  _id: string;
  title: string;
  bodyHtml: string;
  slug: string;
  image: string;
  images: string[];
  options: ProductOption[];
  variants: Variant[];
}

export interface Variant {
  _id: string;
  title: string;
  option: object;
  price: number;
}

export interface ProductOption {
  _id: string;
  name: string;
  values: string[];
}

export interface CartState {
  cartItems: CartItem[];
}
export interface CartItem {
  productId: string;
  variantId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}
