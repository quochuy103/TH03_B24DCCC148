import React from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/index";
import { useProducts } from "../hooks/useProducts";
import "../styles/ProductCard.css";

interface ProductCardProps {
  product: Product;
  [key: string]: any;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { deleteProduct } = useProducts();

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa "${product.ten}"?`)) {
      deleteProduct(product.id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="product-card">
      <div className="product-header">
        <h3 className="product-name">{product.ten}</h3>
        <span className="product-category">{product.danhMuc}</span>
      </div>

      <div className="product-body">
        <p className="product-description">{product.moTa}</p>

        <div className="product-info">
          <div className="info-item">
            <strong>Giá:</strong>
            <span className="product-price">{formatPrice(product.gia)}</span>
          </div>
          <div className="info-item">
            <strong>Số lượng:</strong>
            <span className="product-quantity">
              {product.soLuong > 0 ? `${product.soLuong} cái` : "Hết hàng"}
            </span>
          </div>
        </div>
      </div>

      <div className="product-actions">
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          Chi tiết
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/edit/${product.id}`)}
        >
          Sửa
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Xóa
        </button>
      </div>
    </div>
  );
};
