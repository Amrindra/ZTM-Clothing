import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setCategories } from "../../store/categories/categoryAction";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";
import CategoriesPreview from "../categoriesPreview/CategoriesPreview";
import Category from "../category/Category";
import "./Shop.scss";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      const categoriesArray = await getCategoriesAndDocuments("categories");
      dispatch(setCategories(categoriesArray));
    };

    getCategories();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
