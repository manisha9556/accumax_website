'use client';

import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

const slides = [

   {
    image: '/assets/slider1.jpeg',
  },
  // {
  //   image: '/assets/Laminar_airflow_hood_vertical.png', 
  // },
   {
    image: '/assets/slider2.jpeg',
  },
    {
    image: '/assets/slider_4.jpeg',
  },
   {
    image: '/assets/slider5.jpeg',
  },
  
  {
    image: '/assets/slider6.jpeg',
  },
 
  {
    image: '/assets/biosaftey.jpeg',
  },
 
 {
    image: '/assets/slider7.jpeg',
  },
   
  {
    image: '/assets/slider3.jpeg',
  },
 
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  const showPrevious = () => {
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  return (
    <section className={styles.hero} aria-label="Featured product slider">
      <div className={styles.viewport}>
        {slides.map((slide, index) => (
          <article
            key={index} 
            className={`${styles.slide} ${index === activeSlide ? styles.slideActive : ''}`}
            style={{ backgroundImage: `url("${slide.image}")` }}
            aria-hidden={index !== activeSlide}
          >
            <div className={styles.overlay} />
            <div className={styles.content}>
              <div className={styles.eyebrow}>Featured Product</div>
            </div>
          </article>
        ))}

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrowButton}
            onClick={showPrevious}
            aria-label="Show previous slide"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <button
            type="button"
            className={styles.arrowButton}
            onClick={showNext}
            aria-label="Show next slide"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>

        <div className={styles.dots} aria-label="Slider pagination">
          {slides.map((slide, index) => (
            <button
              key={index} 
              type="button"
              className={`${styles.dot} ${index === activeSlide ? styles.dotActive : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-pressed={index === activeSlide}
            />
          ))}
        </div>
      </div>
    </section>
  );
}




