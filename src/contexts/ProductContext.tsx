import React from "react";
import { createContext, useReducer } from "react";
import { Product, ProductAction, ProductContextType } from "../types/index";

interface ProductProviderProps {
  children: React.ReactNode;
}

const initialProducts: Product[] = [
  {
    id: 1,
    ten: "iPhone 15 Pro",
    danhMuc: "Điện tử",
    gia: 25000000,
    soLuong: 10,
    moTa: "Điện thoại thông minh cao cấp với chip A17 Pro, camera 48MP, màn hình ProMotion 120Hz",
  },
  {
    id: 2,
    ten: "Áo Thun Nam",
    danhMuc: "Quần áo",
    gia: 150000,
    soLuong: 50,
    moTa: "Áo thun nam 100% cotton, thoáng mát, kiểu dáng trẻ trung",
  },
  {
    id: 3,
    ten: "Cà Phê Hạt Nguyên Chất",
    danhMuc: "Đồ ăn",
    gia: 250000,
    soLuong: 30,
    moTa: "Cà phê hạt nguyên chất 100% Arabica từ Đà Lạt, hương thơm đặc biệt",
  },
  {
    id: 4,
    ten: "Sách Lập Trình Web",
    danhMuc: "Sách",
    gia: 180000,
    soLuong: 25,
    moTa: "Hướng dẫn lập trình web từ cơ bản đến nâng cao với HTML, CSS, JavaScript",
  },
  {
    id: 5,
    ten: "Nón Bảo Hiểm Fullface",
    danhMuc: "Khác",
    gia: 800000,
    soLuong: 15,
    moTa: "Nón bảo hiểm fullface cao cấp, an toàn, thoải mái",
  },
  {
    id: 6,
    ten: "Quần Jean Nam",
    danhMuc: "Quần áo",
    gia: 350000,
    soLuong: 40,
    moTa: "Quần jean nam co dãn, phong cách Hàn Quốc, bền lâu",
  },
  {
    id: 7,
    ten: "Laptop Dell XPS 13",
    danhMuc: "Điện tử",
    gia: 22000000,
    soLuong: 8,
    moTa: "Laptop mỏng nhẹ, hiệu suất cao, màn hình FHD 13 inch, SSD 512GB",
  },
  {
    id: 8,
    ten: "Bánh Mỳ Pháp",
    danhMuc: "Đồ ăn",
    gia: 35000,
    soLuong: 100,
    moTa: "Bánh mỳ pháp tươi nướng hằng ngày, vị ngon đặc trưng",
  },
  {
    id: 9,
    ten: "Lịch Sử Việt Nam",
    danhMuc: "Sách",
    gia: 120000,
    soLuong: 20,
    moTa: "Cuốn sách về lịch sử Việt Nam từ xa xưa đến hiện đại",
  },
  {
    id: 10,
    ten: "Tai Nghe Sony WH-1000XM5",
    danhMuc: "Điện tử",
    gia: 7500000,
    soLuong: 12,
    moTa: "Tai nghe chống ồn tốt nhất, pin 30 giờ, âm thanh studio",
  },
  {
    id: 11,
    ten: "Váy Maxi Nữ",
    danhMuc: "Quần áo",
    gia: 450000,
    soLuong: 35,
    moTa: "Váy maxi nữ thoáng mát, phù hợp cho mùa hè",
  },
  {
    id: 12,
    ten: "Trà Xanh Matcha",
    danhMuc: "Đồ ăn",
    gia: 180000,
    soLuong: 20,
    moTa: "Trà xanh matcha nhập khẩu từ Nhật Bản, chất lượng cao",
  },
];

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

const productReducer = (state: Product[], action: ProductAction): Product[] => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const newId = Math.max(...state.map((p) => p.id), 0) + 1;
      return [...state, { ...action.payload, id: newId }];
    }
    case "UPDATE_PRODUCT": {
      return state.map((product) =>
        product.id === action.payload.id
          ? { ...product, ...action.payload.product }
          : product
      );
    }
    case "DELETE_PRODUCT": {
      return state.filter((product) => product.id !== action.payload);
    }
    case "SET_PRODUCTS": {
      return action.payload;
    }
    default:
      return state;
  }
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, dispatch] = useReducer(productReducer, initialProducts);

  const addProduct = (product: Omit<Product, "id">) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
  };

  const updateProduct = (id: number, product: Omit<Product, "id">) => {
    dispatch({ type: "UPDATE_PRODUCT", payload: { id, product } });
  };

  const deleteProduct = (id: number) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id });
  };

  const value: ProductContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
