import { useState, useEffect,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";

const ProductCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const visibleCount = 4;
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 6)))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + visibleCount < products.length)
      setStartIndex(startIndex + 1);
  };

  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
  };

  const translateX = -(startIndex * (100 / visibleCount));

  return (
    <section className="carousel-wrapper">
      <button
        onClick={handlePrev}
        className="carousel-btn left-btn"
        disabled={startIndex === 0}
      >
        ←
      </button>

      <div className="Title">
        <h1>NEW IN</h1>
      </div>

      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {products.map((item) => (
            <div className="carousel-item" key={item._id || item.id}>
              <div className="product-image-box">
                <img
                  src={item.image}
                  alt={item.title}
                  className="main-img"
                  onClick={() => handleNavigate(item._id)}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={item.hoverImage}
                  alt="hover"
                  className="hover-img"
                  onClick={() => handleNavigate(item._id)}
                  style={{ cursor: "pointer" }}
                />
                <div className="product-overlay" onClick={() => addToCart(item)}>
                  <button className="overlay-btn">ADD TO CART</button>
                  <button
                    className="overlay-btn"
                    onClick={() => handleNavigate(item._id)}
                  >
                    QUICK VIEW
                  </button>
                </div>
                {item.soldOut && (
                  <span className="badge sold-out">SOLD OUT</span>
                )}
                {item.discount && (
                  <span className="badge discount-badge">{item.discount}</span>
                )}
              </div>

              <div className="product-info">
                <p
                  className="product-name"
                  onClick={() => handleNavigate(item._id)}
                  style={{ cursor: "pointer" }}
                >
                  {item.title}
                </p>
                <p className="product-rating">
                  {"⭐".repeat(item.rating)} ({item.reviews} review
                  {item.reviews !== 1 ? "s" : ""})
                </p>
                <p className="product-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="carousel-btn right-btn"
        disabled={startIndex + visibleCount >= products.length}
      >
        →
      </button>
    </section>
  );
};

export default ProductCarousel;
