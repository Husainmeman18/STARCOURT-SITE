import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import "../styles/Cart.css";
import  PAYMENT_ICONS  from "../assets/payment-icons.png"

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleQuantityChange = (itemId, delta) => {
    const item = cartItems.find((i) => i._id === itemId);
    const newQuantity = (item.quantity || 1) + delta;
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const subtotal = cartItems
    .reduce((acc, item) => {
      const quantity = item.quantity && !isNaN(item.quantity) ? Number(item.quantity) : 1;
      const price = item.price && !isNaN(item.price) ? Number(item.price) : 0;
      return acc + price * quantity;
    }, 0)
    .toFixed(2);

  return (
    <div className="cart-view">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="no-items">Your cart is empty</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-headers">
              <span>PRODUCT</span>
              <span>PRICE</span>
              <span>QTY</span>
              <span>SUBTOTAL</span>
            </div>
            <ul className="cart-list">
              {cartItems.map((item) => {
                const quantity = item.quantity && !isNaN(item.quantity) ? Number(item.quantity) : 1;
                const price = item.price && !isNaN(item.price) ? Number(item.price) : 0;
                const itemSubtotal = (price * quantity).toFixed(2);

                return (
                  <li key={item._id} className="cart-entry">
                    <div className="product-details">
                      <img src={item.image} alt={item.title} />
                      <div className="entry-details">
                        <h4>{item.title}</h4>
                        <p>{item.size || "S"}</p>
                      </div>
                    </div>
                    <span className="price">₹{price.toFixed(2)}</span>
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item._id, -1)}>-</button>
                      <span>{quantity}</span>
                      <button onClick={() => handleQuantityChange(item._id, 1)}>+</button>
                    </div>
                    <span className="subtotal">₹{itemSubtotal}</span>
                    <span
                      className="delete-btn"
                      onClick={() => removeFromCart(item._id)}
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      ×
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="summary-section">
            <h3>Order Summary</h3>
            <div className="total-summary">
              <span>SUBTOTAL</span>
              <strong>₹{subtotal}</strong>
            </div>
            <Link to="/checkout" className="proceed-btn">
              PROCEED TO CHECKOUT
            </Link>
            <div className="payment-methods">
              <p>Accept Payment Methods</p>
              <div className="payment-icons">
                <img src={PAYMENT_ICONS} alt="PAYMENTS METHODS" />
              </div>
            </div>
            <Link to="/products" className="continue-shopping">
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;