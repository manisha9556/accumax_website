'use client'; // Required in Next.js App Router for using React Hooks like useState

import React, { useState } from 'react';
import Link from 'next/link'; // Next.js specific routing
import { productHierarchy } from '../../data/products';
import './productMenu.css'; // Import the plain CSS file

const ProductMenu = () => {
  // State keeps track of which category ID is currently open. 
  // Null means all are closed.
  const [openCategoryId, setOpenCategoryId] = useState(null);

  // Toggle function handles the open/close logic
  const handleToggle = (categoryId) => {
    // If the clicked category is already open, close it (set to null).
    // Otherwise, open the new one (accordion behavior: only one open at a time).
    setOpenCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <nav className="product-menu-container" aria-label="Product Categories">
      {/* Loop through each parent category in our data file */}
      {productHierarchy.map((category) => {
        const isOpen = openCategoryId === category.id;

        return (
          <div key={category.id} className="menu-item">
            {/* The Parent Category Button */}
            <button
              className={`category-btn ${isOpen ? 'active' : ''}`}
              onClick={() => handleToggle(category.id)}
              aria-expanded={isOpen}
            >
              <span>{category.title}</span>
              
              {/* Arrow Icon that rotates when open */}
              <svg 
                className={`arrow-icon ${isOpen ? 'open' : ''}`} 
                viewBox="0 0 24 24"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* The Sub-menu container (Children) */}
            {/* We apply the "open" class to trigger the smooth CSS Grid expansion */}
            <div className={`sub-menu ${isOpen ? 'open' : ''}`}>
              {/* Inner wrapper is required for the grid-template-rows animation technique */}
              <ul className="sub-menu-inner">
                {category.children.map((child) => (
                  <li key={child.id}>
                    {/* Next.js Link for optimized client-side routing */}
                    <Link href={child.href} className="sub-item-link">
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        );
      })}
    </nav>
  );
};

export default ProductMenu;
