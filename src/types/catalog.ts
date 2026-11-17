export type ProductCategory =
  | 'Licras Cortas'
  | 'Licras Largas'
  | 'Enterizos Cortos'
  | 'Enterizos Largos'
  | 'Tops'
  | 'Conjuntos';

export interface ColorSwatch {
  id: string;
  name: string;
  hex: string;
}

export interface CatalogProduct {
  id: string;
  category: ProductCategory;
  name: string;
  shortDescription: string;
  fabricNote: string;
  imageUrl: string;
  imageAlt: string;
  priceCop: number | null;
  reference: string;
  colors: ColorSwatch[];
  sizes: string[];
}

export interface SelectionItem {
  productId: string;
  colorName: string;
  colorHex: string;
  size: string;
  quantity: number;
}

export interface StoreSettings {
  storeName: string;
  collectionSubtitle: string;
  coverDescription: string;
}
