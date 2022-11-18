import "./ProductCard.scss";
import Button from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cartAction";
import { selectCartItems } from "../../store/cart/cartSelector";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType="inverted"
        onClick={() => dispatch(addItemToCart(cartItems, product))}
      >
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
