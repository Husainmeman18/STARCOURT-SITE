import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Productdetail.css";
import Navbar from "../components/Navbar";
import FooterSection from "../components/Footer"

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    fetch(`http://localhost:4000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.image); 
      })
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Loading...</p>;

  const changeQuantity = (delta) => {
    setQuantity((q) => Math.max(1, q + delta));
  };

  return (
    <>
    <Navbar style={{ backgroundColor: "#ffffff" ,color:"#000"}}/>
    <div className="product-detail-container">
      {/* Left side: images */}
      <div className="product-images-horizontal">
        <div className="thumbnail-images-vertical">
          {[product.image, product.hoverImage].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${product.title} ${i}`}
              className={img === selectedImage ? "active-thumb" : ""}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
        <div className="main-image">
          <img src={selectedImage} alt={product.title} />
        </div>
      </div>
      {/* Right side: product info */}
      <div className="product-detail">
        <h1 className="product-title">{product.title}</h1>
        <div className="product-detail-rating">
          {"⭐".repeat(product.rating ?? 0)}
          <span className="reviews-count">
            ({product.reviews ?? 0} reviews)
          </span>
        </div>
        <div className="product-detail-price">
          {product.discount ? (
            <>
              <span className="discount-price">{product.price}</span>
              <span className="original-price">{product.originalPrice}</span>
            </>
          ) : (
            <span>{product.price}</span>
          )}
        </div>

        {/* Quantity selector */}
        <div className="quantity-selector">
          <button onClick={() => changeQuantity(-1)}>-</button>
          <input type="text" readOnly value={quantity} />
          <button onClick={() => changeQuantity(1)}>+</button>
        </div>

        {/* Add to Cart button */}
        <button className="add-to-cart-btn">Add to Cart</button>

        {/* Tabs for description, shipping, reviews */}
        <div className="tabs">
          <button
            className={activeTab === "description" ? "active-tab" : ""}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={activeTab === "shipping" ? "active-tab" : ""}
            onClick={() => setActiveTab("shipping")}
          >
            Shipping
          </button>
          <button
            className={activeTab === "reviews" ? "active-tab" : ""}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({product.reviews ?? 0})
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "description" && (
            <p>{product.description || "No description available."}</p>
          )}
          {activeTab === "shipping" && (
            <p>
              Free shipping on orders over ₹1000. Delivery within 5-7 business
              days.
            </p>
          )}
          {activeTab === "reviews" && (
            <div>
              {product.reviewsData && product.reviewsData.length > 0 ? (
                product.reviewsData.map((review, idx) => (
                  <div key={idx} className="review">
                    <p>
                      <strong>{review.user}</strong>{" "}
                      {"⭐".repeat(review.rating)}
                    </p>
                    <p>{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Social share (just icons as placeholders) */}
        <div className="social-share">
          <span>Share: </span>
           <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer">
              <i className="fab fa-pinterest-p"></i>
            </a>
        </div>
      </div>
    </div>
    <FooterSection/>
    </>
  );
};

export default ProductDetail;
