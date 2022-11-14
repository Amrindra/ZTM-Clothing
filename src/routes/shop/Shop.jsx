import { useContext } from "react";
import CategoryPreview from "../../components/categoryPreview/CategoryPreview";
import { CategoriesContext } from "../../contexts/categoryContext";
import "./Shop.scss";

const Shop = () => {
  const { categories } = useContext(CategoriesContext);
  // console.log(categories);
  // Object.keys(categories).map((title) => console.log(categories[title]));

  return (
    <div className="shop-container">
      {Object.keys(categories).map((key) => {
        const products = categories[key];
        return <CategoryPreview key={key} title={key} products={products} />;
      })}
    </div>
  );
};

export default Shop;
