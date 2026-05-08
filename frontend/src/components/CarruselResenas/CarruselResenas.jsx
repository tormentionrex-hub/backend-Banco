import { useState, useEffect } from 'react';
import { reviews } from '../../services/mockData';
import './CarruselResenas.css';

const CarruselResenas = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="reviews-section">
      <div className="container">
        <h2 className="section-title text-center">Excelente en todas partes</h2>
        <div className="stars text-center">★★★★★</div>
        
        <div className="carousel-container">
          <div className="reviews-track" style={{ transform: `translateX(-${active * 100}%)` }}>
            {reviews.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-flags">{r.from} → {r.to}</div>
                <p className="review-text">"{r.text}"</p>
                <div className="review-author">
                  <strong>{r.name}</strong>
                  <span>{r.country}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-dots">
          {reviews.map((_, i) => (
            <button 
              key={i} 
              className={`dot ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarruselResenas;
