import { useEffect, useState, useContext } from "react";
import "../styles/main.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMagnifyingGlass,
//   faUser,
//   faCartShopping,
//   faBars,
// } from "@fortawesome/free-solid-svg-icons";
import { FiSearch, FiUser, FiShoppingCart, FiMenu } from "react-icons/fi";
import { AuthContext } from "../pages/AuthContext";
import { CartContext } from "./CartContext";

function Navbar({ style }) {
  const [scrolled, setScrolled] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleUserMenu = () => setShowUserMenu((prev) => !prev);
  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  const handleLogout = () => {
    setUser(null);
    setShowUserMenu(false);
  };

  const handleCloseDropdown = () => {
    setShowCartDropdown(false);
  };

  // Debugging: Log cartItems to inspect the data
  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 760);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`} style={style}>
        <div className="container">
          <div className="header__container">
            <div className="header__logo">
              <span style={style}>STARCOURT</span>
            </div>

            <ul className="header__right">
              <li>
                <button className="js-open-popup-search" style={style}>
                  <FiSearch className="navbar-icon" />
                </button>
              </li>
              <li style={{ position: "relative" }}>
                {user ? (
                  <>
                    <button
                      onClick={toggleUserMenu}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: style?.color,
                      }}
                      aria-label="User menu"
                    >
                      <FiUser className="navbar-icon" />
                    </button>
                    {showUserMenu && (
                      <div
                        style={{
                          position: "absolute",
                          top: "30px",
                          right: 0,
                          backgroundColor: "#fff",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          padding: "10px",
                          zIndex: 1000,
                          width: "150px",
                        }}
                      >
                        <p style={{ margin: "5px 0", cursor: "pointer" }}>
                          Profile
                        </p>
                        <p style={{ margin: "5px 0", cursor: "pointer" }}>
                          Settings
                        </p>
                        <p
                          onClick={handleLogout}
                          style={{
                            margin: "5px 0",
                            cursor: "pointer",
                            color: "red",
                          }}
                        >
                          Logout
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <Link to="/signin">
                    <FiUser className="navbar-icon" />
                  </Link>
                )}
              </li>
              <li className="header__cart" style={{ position: "relative" }}>
                <div onMouseEnter={() => setShowCartDropdown(true)}>
                  <a href="/cart">
                    <FiShoppingCart className="navbar-icon" />
                    <span className="js-cart-counter">
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                    </span>
                  </a>

                  {showCartDropdown && (
                    <div className="cart-dropdown">
                      <span
                        className="close-icon"
                        onClick={handleCloseDropdown}
                        aria-label="Close cart dropdown"
                      >
                        ×
                      </span>
                      {cartItems.length === 0 ? (
                        <p className="empty-cart">Cart is empty</p>
                      ) : (
                        <>
                          <ul className="cart-items">
                            {cartItems.map((item) => (
                              <li key={item._id} className="cart-item">
                                <img src={item.image} alt={item.title} />
                                <div className="item-info">
                                  <h4>{item.title}</h4>
                                  <p>
                                    {item.size || "S"} / {item.color || "Grey"}
                                  </p>
                                  <span>
                                    {item.quantity} × ₹{item.price.toFixed(2)}
                                  </span>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item._id)}
                                  style={{
                                    marginLeft: "10px",
                                    background: "#8b5d3e",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: "2px 6px",
                                  }}
                                  aria-label={`Remove one ${item.title} from cart`}
                                >
                                  −
                                </button>
                              </li>
                            ))}
                          </ul>
                          <div className="cart-subtotal">
                            <span>Subtotal</span>
                            <strong>
                              ₹
                              {cartItems
                                .reduce(
                                  (acc, item) =>
                                    acc +
                                    (item.price && !isNaN(item.price)
                                      ? Number(item.price) * item.quantity
                                      : 0),
                                  0
                                )
                                .toFixed(2)}
                            </strong>
                          </div>
                          <Link to="/checkout"className="checkout-btn">CHECKOUT</Link>
                          <Link to="/cart" className="view-cart-btn">
                            VIEW CART
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </li>

              <li className="header__canvas-menu">
                <button className="js-open-sidebar-menu" onClick={toggleSidebar}>
                  <FiMenu className="navbar-icon" />
                </button>
              </li>
              <div className="header__open-mobile-menu">
                <button className="js-open-mobile-menu">
                  <i className="lnil lnil-menu"></i>
                  <i className="lnil lnil-close"></i>
                </button>
              </div>
            </ul>
          </div>
        </div>
      </header>
    {/* Sidebar Component */}
      {showSidebar && (
        <div className="sidebar">
          <div className="close-button" onClick={toggleSidebar}>
            <span className="close-icon">✕</span>
            <span>CLOSE</span>
          </div>

          <div className="dropdowns">
            <select className="dropdown">
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
            </select>
            <select className="dropdown">
              <option value="ENG">ENG</option>
              <option value="FR">FR</option>
              <option value="ES">ES</option>
            </select>
          </div>

          <ul className="nav-links">
            <li>
              <Link to="/" onClick={toggleSidebar}>Home</Link>
            </li>
            <li>
              <Link to="/shop" onClick={toggleSidebar}>Shop</Link>
            </li>
            <li>
              <Link to="/product" onClick={toggleSidebar}>Product</Link>
            </li>
            <li>
              <Link to="/blog" onClick={toggleSidebar}>Blog</Link>
            </li>
            <li>
              <Link to="/pages" onClick={toggleSidebar}>Pages</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
export default Navbar;
