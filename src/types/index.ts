export type CategoryType = "Điện tử" | "Quần áo" | "Đồ ăn" | "Sách" | "Khác";

export interface Product {
  id: number;
  ten: string;
  danhMuc: CategoryType;
  gia: number;
  soLuong: number;
  moTa: string;
}

export interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: number, product: Omit<Product, "id">) => void;
  deleteProduct: (id: number) => void;
}

export interface ProductAction {
  type: "ADD_PRODUCT" | "UPDATE_PRODUCT" | "DELETE_PRODUCT" | "SET_PRODUCTS";
  payload?: any;
}

export interface FilterOptions {
  searchTerm: string;
  category: CategoryType | "";
  minPrice: number;
  maxPrice: number;
}
