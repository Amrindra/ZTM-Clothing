import "./Shop.scss";
import shopData from "../../utils/shopData.json";

const Shop = () => {
  return (
    <div>
      {shopData.map((item) => (
        <div>
          <h2>{item.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Shop;
