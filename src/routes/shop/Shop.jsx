import { useContext } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { ProductsContext } from "../../contexts/productContext";
import "./Shop.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="shop-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
