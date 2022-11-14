import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase";
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.js";
// import productData from "../utils/shopData.js";

export const CategoriesContext = createContext({
  categoriesMap: [],
});

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategoriesMap] = useState([]);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments("categories");
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  // Adding productData from frontend side to the database when the component mounted.
  // When we want to add data from the local to the database just simple call this useEffect and after it added to the database you have to delete it or comment it out
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", productData);
  // }, []);

  const value = { categories };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
