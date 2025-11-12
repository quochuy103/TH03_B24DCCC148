import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import "../styles/ProductDetail.css";

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, deleteProduct } = useProducts();

  const product = products.find((p) => p.id === parseInt(id || "0"));

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa "${product?.ten}"?`)) {
      deleteProduct(product!.id);
      navigate("/");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (!product) {
    return (
      <div className="detail-container">
        <div className="not-found">
          <h2>Sản phẩm không tìm thấy</h2>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <button className="btn-back" onClick={() => navigate("/")}>
        ← Quay lại
      </button>

      <div className="detail-card">
        <div className="detail-header">
          <h1>{product.ten}</h1>
          <span className="detail-category">{product.danhMuc}</span>
        </div>

        <div className="detail-body">
          <div className="detail-section">
            <h3>Thông tin sản phẩm</h3>

            <div className="detail-item">
              <strong>Giá:</strong>
              <span className="detail-price">{formatPrice(product.gia)}</span>
            </div>

            <div className="detail-item">
              <strong>Số lượng:</strong>
              <span
                className={`detail-quantity ${
                  product.soLuong === 0 ? "out-of-stock" : ""
                }`}
              >
                {product.soLuong > 0 ? `${product.soLuong} cái` : "Hết hàng"}
              </span>
            </div>

            <div className="detail-item full-width">
              <strong>Mô tả:</strong>
              <p className="detail-description">{product.moTa}</p>
            </div>
          </div>
        </div>

        <div className="detail-actions">
          <button
            className="btn btn-secondary"
            onClick={() => navigate(`/edit/${product.id}`)}
          >
            Chỉnh sửa
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Xóa sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
};
