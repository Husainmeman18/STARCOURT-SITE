import { FaShippingFast, FaCreditCard, FaLock, FaCoins } from 'react-icons/fa';
import { useState,useEffect } from 'react';
const slides = [
  {
    icon: <FaShippingFast size={40} />,
    title: 'Free Shipping',
    desc: 'International shipping available  for all orders over ₹1000',
  },
  {
    icon: <FaCreditCard size={40} />,
    title: 'Buy Now. Pay Later',
    desc: '0% Interest financing available. Pay after 30 days.',
  },
  {
    icon: <FaLock size={40} />,
    title: 'Secure Payment',
    desc: 'Guarantee 100% secure payment online on our website',
  },
  {
    icon: <FaCoins size={40} />,
    title: 'Cashback Reward',
    desc: 'Collect & Redeem on every order that you purchased',
  },
];

const FancyBoxCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleSlides = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + visibleSlides >= slides.length ? 0 : prev + 1
      );
    }, 4000); // 4 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="fancy-carousel-wrapper">
      <div className="fancy-carousel-track">
        {slides
          .slice(currentIndex, currentIndex + visibleSlides)
          .map((slide, index) => (
            <div className="fancy-box-item" key={index}>
              <div className="fancy-icon">{slide.icon}</div>
              <div className="fancy-content">
                <h3 className="fancy-title">{slide.title}</h3>
                <p className="fancy-desc">{slide.desc}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FancyBoxCarousel;
