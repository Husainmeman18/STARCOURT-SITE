import Navbar from "../components/Navbar";
import VIDEO1 from "../assets/VIDEO1.mp4";
import VIDEO2 from "../assets/VIDEO2.mp4";
import { useState, useEffect } from "react";
import FancyBoxCarousel from "../components/FancyBoxCarousel";
import Category from "../components/Category";
import BrightlySection from "../components/BrightlySec";
import ProductCarousel from "../components/ProductCaro";
import PhilosophySection from "../components/PhilosophySec.Jsx";
import NewProduct from "../components/NewProduct";
import FooterSection from "../components/Footer";

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
   const [isFading, setIsFading] = useState(false);
  
  const slides = [
    {
      title:"STARTCOURT SUMMER 2025",
      description:"STARCOURT'S HAMPTONS",
      type: "video",
      src: VIDEO1,
    },
    {
      title:"STARCOURT'S PRESENTS 2025",
       description:"OLD MONEY COLLECTION",
      type: "video",
      src: VIDEO2,
    },
  ];

  const nextSlide = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsFading(false);
    }, 500);
  };

  const prevSlide = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsFading(false);
    }, 500);
  };
  const current = slides[currentSlide];
  return (
    <>
      <Navbar />
      
      <div className="main_div">
        <div className="carousel">
          
            <div
              className={`carousel-slide ${isFading ? "fade-out" : "fade-in"}`}>
              <video
               key={currentSlide}
                src={current.src}
                autoPlay
                muted
                playsInline
                className="carousel-media"
                onEnded={nextSlide}
              controls={false}
              />
              <div className="overlay-text">
                <h2>{current.title}</h2>
                <p>{current.description}</p>
              </div>
            </div>

          <button className="carousel-button prev" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="carousel-button next" onClick={nextSlide}>
            &#10095;
          </button>
        </div>
      </div>
      <FancyBoxCarousel/>
      <Category/>
      <BrightlySection/>
      <ProductCarousel/>
      <PhilosophySection/>
      <NewProduct/>
      <FooterSection/>
    </>
  );
}

export default HomePage;
