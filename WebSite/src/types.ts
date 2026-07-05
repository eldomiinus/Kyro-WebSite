export type ProductCategory = "Prendas" | "Accesorios" | "Techwear" | "Edicion limitada";

export type StockStatus = "Disponible" | "Ultimas unidades" | "Proximamente";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  priceArs: number;
  image: string;
  palette: [string, string];
  tags: string[];
  sizes: string[];
  badge?: string;
  handmade: boolean;
  description: string;
  stockStatus: StockStatus;
};

export type CartItem = {
  productId: string;
  size: string;
  quantity: number;
};
