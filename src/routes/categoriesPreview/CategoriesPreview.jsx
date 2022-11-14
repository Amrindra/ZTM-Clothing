import { useContext } from "react";
import CategoryPreview from "../../components/categoryPreview/CategoryPreview";
import { CategoriesContext } from "../../contexts/categoryContext";
import "./CategoriesPreview.scss";

const CategoriesPreview = () => {
  const { categories } = useContext(CategoriesContext);

  return (
    <>
      {Object.keys(categories).map((key) => {
        const products = categories[key];
        return <CategoryPreview key={key} title={key} products={products} />;
      })}
    </>
  );
};

export default CategoriesPreview;
