import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/productCard/ProductCard";
import "./Category.scss";
import { selectCategoriesMap } from "../../store/categories/categorySelector";

const Category = () => {
  const { category } = useParams();
  const categories = useSelector(selectCategoriesMap);

  const [products, setProducts] = useState(categories[category]);

  useEffect(() => {
    setProducts(categories[category]);
  }, [category, categories]);

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </>
  );
};

export default Category;
