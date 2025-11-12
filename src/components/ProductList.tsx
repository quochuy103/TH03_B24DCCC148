import React, { useState } from "react";
import { Product, FilterOptions } from "../types/index";
import { ProductCard } from "./ProductCard";
import { SearchBar } from "./SearchBar";
import { Filter } from "./Filter";
import { Pagination } from "./Pagination";
import "../styles/ProductList.css";

interface ProductListProps {
  products: Product[];
}

const ITEMS_PER_PAGE = 6;

export const ProductList = ({ products }: ProductListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    category: "",
    minPrice: 0,
    maxPrice: Infinity,
  });

  // Filter products based on search term, category, and price range
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.ten
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase());
    const matchesCategory =
      !filters.category || product.danhMuc === filters.category;
    const matchesPrice =
      product.gia >= filters.minPrice && product.gia <= filters.maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="product-list-container">
      <SearchBar
        searchTerm={filters.searchTerm}
        onSearchChange={(value) =>
          handleFilterChange({ ...filters, searchTerm: value })
        }
      />

      <Filter filters={filters} onFilterChange={handleFilterChange} />

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>Không tìm thấy sản phẩm phù hợp</p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProducts.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};
