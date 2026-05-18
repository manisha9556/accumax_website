'use client';

import styles from './VideoSection.module.css';

const videos = [

  {
    title: "Air Shower Demo",
    link: "https://www.youtube.com/watch?v=Qh8wxGoYs90",
    thumbnail: "/videos/video1.jpeg",
  },

  {
    title: "Cleanroom Equipment",
    link: "https://www.youtube.com/watch?v=BTzcQDZv9ZM",
    thumbnail: "/videos/video2.jpeg",
  },

  {
    title: "Air Shower Shorts",
    link: "https://www.youtube.com/shorts/u6L-yl0B-FQ",
    thumbnail: "/videos/video3.jpeg"
  },

  {
    title: "Product Installation",
    link: "https://www.youtube.com/shorts/GN8d5rZbrx8",
    thumbnail: "/videos/video4.jpeg",
  },

];

export default function VideoSection() {

  return (

    <section className={styles.videoSection}>

      <div className={styles.headingWrapper}>

        <span className={styles.subTitle}>
          OUR VIDEOS
        </span>

        <h2 className={styles.title}>
          Watch Our Product Videos
        </h2>

        <p className={styles.description}>
          Explore our cleanroom equipment,
          air shower systems, pass boxes,
          biosafety cabinets and industrial solutions in action.
        </p>

      </div>

      <div className={styles.slider}>

        {videos.map((video, index) => (

          <a
            key={index}
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >

            <div className={styles.thumbnailWrapper}>

              <img
                src={video.thumbnail}
                alt={video.title}
                className={styles.thumbnail}
              />

              <div className={styles.playButton}>
                ▶
              </div>

            </div>

            <div className={styles.cardBody}>

              <h3>{video.title}</h3>

            </div>

          </a>

        ))}

      </div>

    </section>

  );
}