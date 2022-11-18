import { useSelector } from "react-redux";
import CategoryPreview from "../../components/categoryPreview/CategoryPreview";
import { selectCategoriesMap } from "../../store/categories/categorySelector";
import "./CategoriesPreview.scss";

const CategoriesPreview = () => {
  const categories = useSelector(selectCategoriesMap);

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
