import React from "react";
import { CategoryType, FilterOptions } from "../types/index";
import "../styles/Filter.css";

interface FilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const categories: CategoryType[] = [
  "Điện tử",
  "Quần áo",
  "Đồ ăn",
  "Sách",
  "Khác",
];

export const Filter = ({ filters, onFilterChange }: FilterProps) => {
  const handleCategoryChange = (value: string) => {
    onFilterChange({
      ...filters,
      category: value as CategoryType | "",
    });
  };

  const handleMinPriceChange = (value: string) => {
    onFilterChange({
      ...filters,
      minPrice: value ? parseInt(value) : 0,
    });
  };

  const handleMaxPriceChange = (value: string) => {
    onFilterChange({
      ...filters,
      maxPrice: value ? parseInt(value) : Infinity,
    });
  };

  return (
    <div className="filter-container">
      <div className="filter-group">
        <label htmlFor="category">Danh mục:</label>
        <select
          id="category"
          value={filters.category}
          onChange={(e: any) => handleCategoryChange(e.target.value)}
          className="filter-select"
        >
          <option value="">Tất cả</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="minPrice">Giá tối thiểu:</label>
        <input
          id="minPrice"
          type="number"
          value={filters.minPrice === 0 ? "" : filters.minPrice}
          onChange={(e: any) => handleMinPriceChange(e.target.value)}
          placeholder="0"
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="maxPrice">Giá tối đa:</label>
        <input
          id="maxPrice"
          type="number"
          value={filters.maxPrice === Infinity ? "" : filters.maxPrice}
          onChange={(e: any) => handleMaxPriceChange(e.target.value)}
          placeholder="Không giới hạn"
          className="filter-input"
        />
      </div>

      <button
        onClick={() =>
          onFilterChange({
            searchTerm: "",
            category: "",
            minPrice: 0,
            maxPrice: Infinity,
          })
        }
        className="btn-reset"
      >
        Reset
      </button>
    </div>
  );
};
