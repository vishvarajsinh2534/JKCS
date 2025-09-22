export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  specifications: {
    voltage?: string;
    current?: string;
    frequency?: string;
    phases?: string;
    breakingCapacity?: string;
    ratedCurrent?: string;
    mounting?: string;
    protection?: string;
    accuracy?: string;
    display?: string;
    [key: string]: string | undefined;
  };
  inStock: boolean;
  brand: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}