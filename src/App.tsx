import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext";
import { ProductList, ProductForm, ProductDetail } from "./components";
import { useProducts } from "./hooks/useProducts";
import "./App.css";

const AppContent = () => {
  const { products } = useProducts();

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-container">
          <Link to="/" className="app-title">
            <h1>📦 Quản Lý Sản Phẩm</h1>
          </Link>
          <nav className="app-nav">
            <Link to="/" className="nav-link">
              Danh Sách
            </Link>
            <Link to="/add" className="nav-link btn-add">
              + Thêm Sản Phẩm
            </Link>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route path="/add" element={<ProductForm />} />
          <Route path="/edit/:id" element={<ProductForm isEditing={true} />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Ứng dụng quản lý sản phẩm. Tất cả quyền được bảo lưu.</p>
      </footer>
    </div>
  );
};

const NotFound = () => (
  <div className="not-found-page">
    <h2>404 - Trang không tìm thấy</h2>
    <p>Trang bạn đang tìm kiếm không tồn tại.</p>
    <Link to="/" className="btn btn-primary">
      Quay lại trang chủ
    </Link>
  </div>
);

function App() {
  return (
    <ProductProvider>
      <Router>
        <AppContent />
      </Router>
    </ProductProvider>
  );
}

export default App;
