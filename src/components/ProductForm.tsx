import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryType } from "../types/index";
import { useProducts } from "../hooks/useProducts";
import "../styles/ProductForm.css";

interface ProductFormProps {
  isEditing?: boolean;
}

const categories: CategoryType[] = [
  "Điện tử",
  "Quần áo",
  "Đồ ăn",
  "Sách",
  "Khác",
];

interface FormData {
  ten: string;
  danhMuc: CategoryType;
  gia: string;
  soLuong: string;
  moTa: string;
}

interface FormErrors {
  ten?: string;
  danhMuc?: string;
  gia?: string;
  soLuong?: string;
  moTa?: string;
}

export const ProductForm = ({ isEditing = false }: ProductFormProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { products, addProduct, updateProduct } = useProducts();

  const [formData, setFormData] = useState<FormData>({
    ten: "",
    danhMuc: "Khác",
    gia: "",
    soLuong: "",
    moTa: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Load product data if editing
  useEffect(() => {
    if (isEditing && id) {
      const product = products.find((p) => p.id === parseInt(id));
      if (product) {
        setFormData({
          ten: product.ten,
          danhMuc: product.danhMuc,
          gia: product.gia.toString(),
          soLuong: product.soLuong.toString(),
          moTa: product.moTa,
        });
      }
    }
  }, [isEditing, id, products]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.ten.trim()) {
      newErrors.ten = "Tên sản phẩm không được để trống";
    } else if (formData.ten.trim().length < 3) {
      newErrors.ten = "Tên sản phẩm phải tối thiểu 3 ký tự";
    }

    if (!formData.danhMuc) {
      newErrors.danhMuc = "Vui lòng chọn danh mục";
    }

    if (!formData.gia) {
      newErrors.gia = "Giá không được để trống";
    } else if (
      isNaN(parseFloat(formData.gia)) ||
      parseFloat(formData.gia) <= 0
    ) {
      newErrors.gia = "Giá phải là số dương";
    }

    if (!formData.soLuong) {
      newErrors.soLuong = "Số lượng không được để trống";
    } else if (
      !Number.isInteger(parseFloat(formData.soLuong)) ||
      parseFloat(formData.soLuong) < 0
    ) {
      newErrors.soLuong = "Số lượng phải là số nguyên không âm";
    }

    if (!formData.moTa.trim()) {
      newErrors.moTa = "Mô tả không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const productData = {
      ten: formData.ten.trim(),
      danhMuc: formData.danhMuc,
      gia: parseFloat(formData.gia),
      soLuong: parseInt(formData.soLuong),
      moTa: formData.moTa.trim(),
    };

    if (isEditing && id) {
      updateProduct(parseInt(id), productData);
    } else {
      addProduct(productData);
    }

    navigate("/");
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1>{isEditing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h1>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="ten">Tên sản phẩm:</label>
            <input
              id="ten"
              type="text"
              value={formData.ten}
              onChange={(e: any) => handleChange("ten", e.target.value)}
              placeholder="Nhập tên sản phẩm"
              className={`form-input ${errors.ten ? "error" : ""}`}
            />
            {errors.ten && <span className="error-message">{errors.ten}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="danhMuc">Danh mục:</label>
            <select
              id="danhMuc"
              value={formData.danhMuc}
              onChange={(e: any) => handleChange("danhMuc", e.target.value)}
              className={`form-select ${errors.danhMuc ? "error" : ""}`}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.danhMuc && (
              <span className="error-message">{errors.danhMuc}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gia">Giá (VND):</label>
              <input
                id="gia"
                type="number"
                value={formData.gia}
                onChange={(e: any) => handleChange("gia", e.target.value)}
                placeholder="0"
                className={`form-input ${errors.gia ? "error" : ""}`}
              />
              {errors.gia && (
                <span className="error-message">{errors.gia}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="soLuong">Số lượng:</label>
              <input
                id="soLuong"
                type="number"
                value={formData.soLuong}
                onChange={(e: any) => handleChange("soLuong", e.target.value)}
                placeholder="0"
                className={`form-input ${errors.soLuong ? "error" : ""}`}
              />
              {errors.soLuong && (
                <span className="error-message">{errors.soLuong}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="moTa">Mô tả:</label>
            <textarea
              id="moTa"
              value={formData.moTa}
              onChange={(e: any) => handleChange("moTa", e.target.value)}
              placeholder="Nhập mô tả sản phẩm"
              className={`form-textarea ${errors.moTa ? "error" : ""}`}
              rows={4}
            />
            {errors.moTa && (
              <span className="error-message">{errors.moTa}</span>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {isEditing ? "Cập nhật" : "Thêm sản phẩm"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
