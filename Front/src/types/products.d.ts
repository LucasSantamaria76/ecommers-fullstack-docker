export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  discount: number;
  categoryId: string;
  category: Category;
  photos: Photo[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Photo {
  id: string;
  photo: string;
}
