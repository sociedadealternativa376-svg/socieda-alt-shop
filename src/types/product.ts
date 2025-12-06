export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'piercing' | 'tattoo' | 'joia';
  subcategory?: string;
  description: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
