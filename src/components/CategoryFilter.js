import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="d-inline flex-wrap">
      <button
        className={`btn btn-sm me-2 mb-2 ${selectedCategory === '' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => onCategoryChange('')}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={`btn btn-sm me-2 mb-2 ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onCategoryChange(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;