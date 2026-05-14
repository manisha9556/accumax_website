'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

const galleryImages = [
  {
    src: '/assets/airshower1.jpg',
    alt: 'Air shower cleanroom entrance system with stainless steel enclosure',
    title: 'Clean Entry Control',
    detail: 'Engineered airflow for dust removal at critical access points.',
  },
  {
    src: '/assets/airshower2.jpg',
    alt: 'Air shower unit interior with nozzles and bright clean finish',
    title: 'Precision Interior Layout',
    detail: 'Nozzle placement designed for uniform high-velocity coverage.',
  },
  {
    src: '/assets/airshower3.jpg',
    alt: 'Industrial air shower installation for contamination-controlled spaces',
    title: 'Industrial Installation',
    detail: 'Built for pharmaceutical, electronics, and research workflows.',
  },
  {
    src: '/assets/airshower4.jpg',
    alt: 'Air shower chamber exterior with robust cleanroom-ready construction',
    title: 'Robust Construction',
    detail: 'Durable fabrication with premium surfaces for demanding facilities.',
  },
  {
    src: '/assets/airshower5.jpg',
    alt: 'Modern air shower system designed for production facility entry',
    title: 'Production Ready',
    detail: 'A polished system presence that integrates with high-spec environments.',
  },
  {
    src: '/assets/airshower6.jpg',
    alt: 'Air shower view highlighting controlled access and internal airflow chamber',
    title: 'Controlled Access',
    detail: 'Supports disciplined personnel entry into contamination-sensitive areas.',
  },
];

export default function AirShowerGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={styles.galleryShell}>
      <div className={styles.grid}>
        {galleryImages.map((image, index) => {
          const isSelected = index === selectedIndex;

          return (
            <article key={image.title} className={styles.card}>
              <button
                type="button"
                className={`${styles.cardButton} ${isSelected ? styles.cardSelected : ''}`}
                onClick={() => setSelectedIndex(index)}
                aria-pressed={isSelected}
              >
                <div className={styles.imageFrame}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 360px"
                    className={styles.image}
                    priority={index === 0}
                  />

                  <div className={styles.overlay}>
                    <div className={styles.overlayIcon}>+</div>

                    <div className={styles.overlayContent}>
                      <h3 className={styles.cardTitle}>{image.title}</h3>
                      <p className={styles.cardText}>{image.detail}</p>
                    </div>
                  </div>
                </div>
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}





// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import airShower1 from '../../../../public/airshower1.jpg';
// import airShower2 from '../../../../public/airshower2.jpg';
// import airShower3 from '../../../../public/airshower3.jpg';
// import airShower4 from '../../../../public/airshower4.jpg';
// import airShower5 from '../../../../public/airshower5.jpg';
// import airShower6 from '../../../../public/airshower6.jpg';
// import styles from './page.module.css';

// const galleryImages = [
//   {
//     src: airShower1,
//     alt: 'Air shower cleanroom entrance system with stainless steel enclosure',
//     title: 'Clean Entry Control',
//     detail: 'Engineered airflow for dust removal at critical access points.',
//   },
//   {
//     src: airShower2,
//     alt: 'Air shower unit interior with nozzles and bright clean finish',
//     title: 'Precision Interior Layout',
//     detail: 'Nozzle placement designed for uniform high-velocity coverage.',
//   },
//   {
//     src: airShower3,
//     alt: 'Industrial air shower installation for contamination-controlled spaces',
//     title: 'Industrial Installation',
//     detail: 'Built for pharmaceutical, electronics, and research workflows.',
//   },
//   {
//     src: airShower4,
//     alt: 'Air shower chamber exterior with robust cleanroom-ready construction',
//     title: 'Robust Construction',
//     detail: 'Durable fabrication with premium surfaces for demanding facilities.',
//   },
//   {
//     src: airShower5,
//     alt: 'Modern air shower system designed for production facility entry',
//     title: 'Production Ready',
//     detail: 'A polished system presence that integrates with high-spec environments.',
//   },
//   {
//     src: airShower6,
//     alt: 'Air shower view highlighting controlled access and internal airflow chamber',
//     title: 'Controlled Access',
//     detail: 'Supports disciplined personnel entry into contamination-sensitive areas.',
//   },
// ];

// export default function AirShowerGallery() {
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   return (
//     <div className={styles.galleryShell}>
//       <div className={styles.grid}>
//         {galleryImages.map((image, index) => {
//           const isSelected = index === selectedIndex;

//           return (
//             <article key={image.title} className={styles.card}>
//               <button
//                 type="button"
//                 className={`${styles.cardButton} ${isSelected ? styles.cardSelected : ''}`}
//                 onClick={() => setSelectedIndex(index)}
//                 aria-pressed={isSelected}
//                 aria-label={`Select ${image.title}`}
//               >
//                 <div className={styles.imageFrame}>
//                   <Image
//                     src={image.src}
//                     alt={image.alt}
//                     placeholder="blur"
//                     fill
//                     sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, (max-width: 1200px) 33vw, 360px"
//                     className={styles.image}
//                   />
//                   <div className={styles.overlay}>
//                     <div className={styles.overlayIcon} aria-hidden="true">
//                       +
//                     </div>
//                     <div className={styles.overlayContent}>
//                       <h3 className={styles.cardTitle}>{image.title}</h3>
//                       <p className={styles.cardText}>{image.detail}</p>
//                     </div>
//                   </div>
//                 </div>
//               </button>
//             </article>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
