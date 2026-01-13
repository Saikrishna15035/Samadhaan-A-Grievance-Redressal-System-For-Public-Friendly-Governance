import React, { useState, useEffect } from "react";
import "../styles/carousel.css"; // we’ll create this small CSS file next
import golconda from "../images/1golconda.jpg";
import collectrate from "../images/2collectrate.jpg";
import charminar from "../images/5charminar.jpg";
import falaknuma from "../images/3falaknuma.jpg";
import secretariat from "../images/secretariat-transformed.jpeg";
import buddha from "../images/buddha.jpg";
export default function SimpleCarousel() {
  const images = [
    secretariat,
    buddha,
    golconda,
    collectrate,
    charminar,
    falaknuma,
  ];

  const [index, setIndex] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [index]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Slide ${i}`}
            className={`slide ${i === index ? "active" : ""}`}
          />
        ))}
      </div>

      <button className="btn prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="btn next" onClick={nextSlide}>
        ❯
      </button>

      <div className="dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
