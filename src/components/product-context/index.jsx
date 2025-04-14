import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [categoryProducts, setCategoryProducts] = useState(() => {
    const storedProducts = localStorage.getItem("categoryProducts");
    return storedProducts ? JSON.parse(storedProducts) : {}; 
  });

  useEffect(() => {
    localStorage.setItem("categoryProducts", JSON.stringify(categoryProducts));
  }, [categoryProducts]);

  return (
    <ProductContext.Provider value={{ categoryProducts, setCategoryProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
