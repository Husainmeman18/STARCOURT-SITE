import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext"; // Import CartContext

const NewProduct = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const visibleCount = 4;
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); // Get addToCart

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(6, 12)))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + visibleCount < products.length)
      setStartIndex(startIndex + 1);
  };

  const translateX = -(startIndex * (100 / visibleCount));

  const goToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <section className="element-wrapper">
      <button
        onClick={handlePrev}
        className="carousel-btn left-btn-1"
        disabled={startIndex === 0}
      >
        ←
      </button>
      <div className="Title">
        <h1>BEST SELLER</h1>
      </div>
      <div className="element-container">
        <div
          className="element-track"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {products.map((item) => (
            <div className="element-item" key={item._id || item.id}>
              <div className="element-image-box">
                <img
                  src={item.image}
                  alt={item.title}
                  className="main-img"
                  onClick={() => goToProduct(item._id)}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={item.hoverImage}
                  alt="hover"
                  className="hover-img"
                  onClick={() => goToProduct(item._id)}
                  style={{ cursor: "pointer" }}
                />

                <div className="product-overlay">
                  {/* Add to cart button */}
                  <button
                    className="overlay-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click bubbling (so it doesn't trigger image click)
                      addToCart(item);
                    }}
                  >
                    ADD TO CART
                  </button>

                  {/* Quick view button */}
                  <button
                    className="overlay-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToProduct(item._id);
                    }}
                  >
                    QUICK VIEW
                  </button>
                </div>

                {item.soldOut && <span className="badge sold-out">SOLD OUT</span>}
                {item.discount && (
                  <span className="badge discount-badge">{item.discount}</span>
                )}
              </div>

              <div className="product-info">
                <p
                  className="product-name"
                  onClick={() => goToProduct(item._id)}
                  style={{ cursor: "pointer" }}
                >
                  {item.title}
                </p>
                <p className="product-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="carousel-btn right-btn-1"
        disabled={startIndex + visibleCount >= products.length}
      >
        →
      </button>
    </section>
  );
};

export default NewProduct;
