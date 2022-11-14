export interface Product {
  _id: string;
  title: string;
  bodyHtml: string;
  slug: string;
  image: string;
  images: string[];
  variants: Variant[];
}

export interface Variant {
  _id: string;
  title: string;
  colour: string;
  material: string;
  price: number;
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
